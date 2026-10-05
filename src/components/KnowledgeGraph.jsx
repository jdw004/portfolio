import { useEffect, useRef, useState } from 'react';
import ForceGraph from 'force-graph';
import { Maximize2, Minimize2, Minus, Plus, RotateCcw } from 'lucide-react';
import './KnowledgeGraph.css';
import { getGraphViewport } from './graphViewport';

export default function KnowledgeGraph() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const graphRef = useRef(null);
  const fitRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/graph-data.json', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Graph data unavailable');
        return response.json();
      })
      .then((data) => {
        const ids = new Set(data.nodes.map((node) => node.id));
        if (data.links.some((link) => !ids.has(link.source) || !ids.has(link.target))) {
          throw new Error('Invalid graph connection');
        }
        setGraphData(data);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setLoadError(true);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!graphData) return;
    const host = canvasRef.current;
    let hovered = null;
    const data = {
      nodes: graphData.nodes.map((node) => ({ ...node })),
      links: graphData.links.map((link) => ({ ...link })),
    };
    const endpoint = (value) => typeof value === 'object' ? value.id : value;
    const isConnected = (link, id) => endpoint(link.source) === id || endpoint(link.target) === id;
    const graph = new ForceGraph(host)
      .graphData(data)
      .backgroundColor('#1a1a1a')
      .nodeLabel(() => '')
      .nodeVal(2)
      .linkColor((link) => isConnected(link, hovered?.id) ? '#8a5cec' : '#383838')
      .linkWidth((link) => isConnected(link, hovered?.id) ? 1.2 : .5)
      .nodeCanvasObject((node, ctx, scale) => {
        const active = hovered?.id;
        const neighbor = data.links.some((link) => isConnected(link, active) && isConnected(link, node.id));
        const highlighted = node.id === active || neighbor;
        const radius = node.id === active ? 3 : 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = highlighted ? '#8a5cec' : '#bbbbbb';
        ctx.fill();
        if (scale > .8 || highlighted || node.hub) {
          ctx.font = `${11 / scale}px system-ui, sans-serif`;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = active && !highlighted ? '#666666' : '#bbbbbb';
          ctx.fillText(node.title, node.x + radius + 7 / scale, node.y);
        }
      })
      .onNodeHover((node) => {
        hovered = node;
        host.style.cursor = 'grab';
      })
      .onNodeDragEnd((node) => { node.fx = node.x; node.fy = node.y; })
      .cooldownTicks(120);
    graph.d3Force('charge').strength(-220);
    graph.d3Force('link').distance(95);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const labelContext = document.createElement('canvas').getContext('2d');
    labelContext.font = '11px system-ui, sans-serif';
    const fit = (duration = 0) => {
      const viewport = getGraphViewport(data.nodes, host.clientWidth, host.clientHeight,
        (title) => labelContext.measureText(title).width);
      if (!viewport) return;
      const animationTime = reducedMotion ? 0 : duration;
      graph.zoom(viewport.zoom, animationTime);
      graph.centerAt(viewport.x, viewport.y, animationTime);
    };
    fitRef.current = fit;
    let fitted = false;
    graph.onEngineStop(() => {
      if (!fitted) { fit(400); fitted = true; }
    });
    const resize = new ResizeObserver(() => {
      graph.width(host.clientWidth).height(host.clientHeight);
      if (fitted) fit();
    });
    resize.observe(host);
    graph.width(host.clientWidth).height(host.clientHeight);
    graphRef.current = graph;
    return () => {
      resize.disconnect();
      graph._destructor();
      graphRef.current = null;
      fitRef.current = null;
    };
  }, [graphData]);

  useEffect(() => {
    const onFullscreen = () => setExpanded(document.fullscreenElement === containerRef.current);
    document.addEventListener('fullscreenchange', onFullscreen);
    return () => document.removeEventListener('fullscreenchange', onFullscreen);
  }, []);

  useEffect(() => {
    if (!graphData) return;
    const touch = window.matchMedia('(pointer: coarse)');
    const updateInteraction = () => {
      const interactive = expanded || !touch.matches;
      graphRef.current?.enablePanInteraction(interactive);
      graphRef.current?.enableZoomInteraction(interactive);
      graphRef.current?.enableNodeDrag(interactive);
    };
    updateInteraction();
    touch.addEventListener('change', updateInteraction);
    return () => touch.removeEventListener('change', updateInteraction);
  }, [expanded, graphData]);

  useEffect(() => {
    if (!expanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && !document.fullscreenElement) setExpanded(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [expanded]);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (expanded) setExpanded(false);
      else if (containerRef.current.requestFullscreen) await containerRef.current.requestFullscreen();
      else setExpanded((value) => !value);
    } catch { setExpanded((value) => !value); }
  };

  return <div ref={containerRef} className={`knowledge-network ${expanded ? 'is-expanded' : ''}`}>
    <div className="network-toolbar">
      <span>My network</span>
      <div className="network-actions" role="group" aria-label="Graph controls">
        <button type="button" aria-label="Zoom out" onClick={() => graphRef.current?.zoom(graphRef.current.zoom() / 1.3, 200)}><Minus size={16} /></button>
        <button type="button" aria-label="Zoom in" onClick={() => graphRef.current?.zoom(graphRef.current.zoom() * 1.3, 200)}><Plus size={16} /></button>
        <button type="button" aria-label="Fit graph to view" onClick={() => fitRef.current?.(300)}><RotateCcw size={16} /></button>
        <button type="button" aria-label={expanded ? 'Exit expanded graph' : 'Expand graph'} aria-pressed={expanded} onClick={toggleFullscreen}>{expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}</button>
      </div>
    </div>
    <div ref={canvasRef} className="network-canvas" aria-label="Interactive graph of notes on AI, systems, infrastructure, and agents" />
    {!graphData && <p className="network-status" role="status">{loadError ? 'Could not load the graph. Please refresh to try again.' : 'Loading graph…'}</p>}
  </div>;
}
