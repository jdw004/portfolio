// Labels are drawn at a constant screen size, so include them when framing nodes.
export function getGraphViewport(nodes, width, height, measureText) {
  const points = nodes.filter((node) => Number.isFinite(node.x) && Number.isFinite(node.y));
  if (!points.length || width <= 0 || height <= 0) return null;
  const padding = 24;
  const availableWidth = Math.max(1, width - padding * 2);
  const availableHeight = Math.max(1, height - padding * 2);
  const xs = points.map((node) => node.x);
  const ys = points.map((node) => node.y);
  let zoom = Math.min(2,
    availableWidth / Math.max(1, Math.max(...xs) - Math.min(...xs)),
    availableHeight / Math.max(1, Math.max(...ys) - Math.min(...ys)));
  const getBounds = () => ({
    left: Math.min(...points.map((node) => node.x * zoom - 3 * zoom)),
    right: Math.max(...points.map((node) => node.x * zoom + 3 * zoom +
      (node.hub || zoom > .8 ? 7 + measureText(node.title) : 0))),
    top: Math.min(...points.map((node) => node.y * zoom - Math.max(3 * zoom, 7))),
    bottom: Math.max(...points.map((node) => node.y * zoom + Math.max(3 * zoom, 7))),
  });
  for (let iteration = 0; iteration < 12; iteration += 1) {
    const bounds = getBounds();
    const ratio = Math.min(1, availableWidth / (bounds.right - bounds.left),
      availableHeight / (bounds.bottom - bounds.top));
    if (ratio >= .9999) break;
    zoom *= ratio;
  }
  const bounds = getBounds();
  return {
    zoom,
    x: (bounds.left + bounds.right) / (2 * zoom),
    y: (bounds.top + bounds.bottom) / (2 * zoom),
  };
}
