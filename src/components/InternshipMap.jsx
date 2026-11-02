import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { experiences } from '../data/experiences';
import states from '../data/usStates.json';
import { mapCities } from '../data/mapCities';
import './InternshipMap.css';

const roles = experiences.filter(({ role, excludeFromMap }) => role.includes('Intern') && !excludeFromMap);
const locations = [...new Set(roles.flatMap(({ location }) => location?.state ? [location.state] : []))];
const companyLogos = {
  Apple: { src: '/images/companies/apple.svg', className: 'apple' },
  Stripe: { src: '/images/companies/stripe.svg', className: 'stripe' },
  'LPL Financial': { src: '/images/companies/lpl.jpeg', className: 'lpl' },
};
const markers = mapCities.flatMap((city) => {
  const companies = [...new Set(roles.filter(({ location }) => location?.city === city.city && location?.state === city.state).map(({ company }) => company))];
  return companies.map((company) => ({ ...city, company, logo: companyLogos[company] }));
});

export default function InternshipMap() {
  const [preview, setPreview] = useState(null);
  const surfaceRef = useRef(null);
  const popoverRef = useRef(null);
  const closeTimer = useRef(null);
  const keepPreviewOpen = () => clearTimeout(closeTimer.current);
  const dismiss = (restoreFocus = false) => {
    keepPreviewOpen();
    if (restoreFocus) preview?.trigger.focus({ preventScroll: true });
    setPreview(null);
  };
  const closePreview = () => {
    keepPreviewOpen();
    closeTimer.current = setTimeout(() => setPreview((current) => current?.pinned ? current : null), 150);
  };
  const showPreview = (name, target, pinned = false, company, city) => {
    keepPreviewOpen();
    const surface = surfaceRef.current.getBoundingClientRect();
    // Use the state's geometry for placement regardless of which control opened it.
    // Keep the actual trigger separately for click toggling and focus restoration.
    const positionAnchor = [...surfaceRef.current.querySelectorAll('path[data-map-location]')]
      .find((element) => element.dataset.mapLocation === name) || target;
    const anchor = positionAnchor.getBoundingClientRect();
    const width = Math.min(304, surface.width - 16);
    setPreview({
      name, company, city, pinned, trigger: target, positionAnchor,
      left: Math.max(8, Math.min(anchor.left + anchor.width / 2 - surface.left - width / 2, surface.width - width - 8)),
      top: anchor.bottom - surface.top + 8,
    });
  };
  useLayoutEffect(() => {
    if (!preview || !popoverRef.current || window.matchMedia('(max-width: 679px)').matches) return;
    const surface = surfaceRef.current.getBoundingClientRect();
    const { width, height } = popoverRef.current.getBoundingClientRect();
    const relativeRect = (element) => {
      const rect = element.getBoundingClientRect();
      return { left: rect.left - surface.left, right: rect.right - surface.left,
        top: rect.top - surface.top, bottom: rect.bottom - surface.top };
    };
    const anchor = relativeRect(preview.positionAnchor);
    // Keep every state and city marker available while a preview is open.
    const targets = [...surfaceRef.current.querySelectorAll('[data-map-location]')].map(relativeRect);
    const centerX = (anchor.left + anchor.right - width) / 2;
    const centerY = (anchor.top + anchor.bottom - height) / 2;
    const candidates = [
      { left: anchor.right + 12, top: centerY },
      { left: anchor.left - width - 12, top: centerY },
      { left: centerX, top: anchor.top - height - 12 },
      { left: centerX, top: anchor.bottom + 12 },
      { left: (surface.width - width) / 2, top: 8 },
      { left: 8, top: 8 },
      { left: surface.width - width - 8, top: 8 },
    ];
    const position = candidates.find(({ left, top }) => left >= 8 && top >= 8
      && left + width <= surface.width - 8 && top + height <= surface.height - 8
      && targets.every((target) => left + width + 8 <= target.left || left - 8 >= target.right
        || top + height + 8 <= target.top || top - 8 >= target.bottom))
      // A temporary overflow below the locations is safer than covering a control.
      || { left: Math.max(8, Math.min(centerX, surface.width - width - 8)),
        top: Math.max(...targets.map(({ bottom }) => bottom)) + 12 };
    if (position.top !== preview.top || position.left !== preview.left) {
      setPreview((current) => ({ ...current, ...position }));
    }
  }, [preview]);
  useEffect(() => () => clearTimeout(closeTimer.current), []);
  useEffect(() => {
    if (!preview) return;
    const close = () => { clearTimeout(closeTimer.current); setPreview(null); };
    const onKeyDown = (event) => { if (event.key === 'Escape') {
      if (popoverRef.current?.contains(document.activeElement)) preview.trigger.focus({ preventScroll: true });
      close();
    } };
    const onPointerDown = (event) => {
      if (!event.target.closest('[data-map-location], .internship-map-tooltip')) close();
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('resize', close);
    };
  }, [preview]);
  const locationEvents = (name, company, city) => ({
    onPointerEnter: (event) => {
      if (event.pointerType !== 'touch' && !preview?.pinned) showPreview(name, event.currentTarget, false, company, city);
    },
    onPointerLeave: closePreview,
    onFocus: (event) => {
      if (event.currentTarget.matches(':focus-visible') && !preview?.pinned) showPreview(name, event.currentTarget, false, company, city);
    },
    onBlur: closePreview,
    onClick: (event) => {
      if (preview?.pinned && preview.trigger === event.currentTarget) dismiss();
      else showPreview(name, event.currentTarget, true, company, city);
    },
  });
  const previewRoles = preview ? roles.filter(({ location, company }) => location?.state === preview.name
    && (!preview.company || company === preview.company)
    && (!preview.city || location.city === preview.city)) : [];

  return <div className="internship-map">
    <p className="internship-map-instructions">Hover or tap a company logo or highlighted state to explore my work.</p>
    <figure className="internship-map-figure">
      <div className="internship-map-surface" ref={surfaceRef}>
        <svg className="internship-map-svg" viewBox="-15 -15 1005 640" role="group" aria-labelledby="map-title map-description">
          <title id="map-title">Work experience across the United States</title>
          <desc id="map-description">Highlighted states show where I’ve worked. Hover, focus, or select a state or company logo for role details. Press Escape to dismiss details.</desc>
          {states.map(({ name, d }) => {
            const available = locations.includes(name);
            const active = preview?.name === name;
            const count = roles.filter(({ location }) => location?.state === name).length;
            return <path key={name} d={d} className={`internship-map-state${available ? ' has-internship' : ''}${active ? ' is-selected' : ''}`}
              role={available ? 'button' : undefined} tabIndex={available ? 0 : undefined}
              data-map-location={available ? name : undefined}
              aria-label={available ? `${name}: ${count} ${count === 1 ? 'role' : 'roles'}` : undefined}
              aria-expanded={available ? active : undefined}
              aria-pressed={available ? Boolean(active && preview?.pinned) : undefined}
              aria-controls={active ? 'internship-map-details' : undefined}
              aria-describedby={active && !preview.pinned ? 'internship-map-details' : undefined}
              {...(available ? locationEvents(name) : {})}
              onKeyDown={available ? (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  locationEvents(name).onClick(event);
                }
              } : undefined}>
              {!available && <title>{name}</title>}
            </path>;
          })}
        </svg>
        {markers.map(({ city, state, x, y, company, logo }) => <button key={`${city}-${company}`}
          type="button" className={`internship-map-logo internship-map-logo--${logo?.className || 'fallback'}`}
          style={{ '--marker-x': `${(x + 15) / 1005 * 100}%`, top: `${(y + 15) / 640 * 100}%` }}
          data-map-location={state} aria-label={`${company} in ${city}, ${state}`}
          aria-expanded={preview?.name === state}
          aria-pressed={Boolean(preview?.name === state && preview?.pinned)}
          aria-controls={preview?.name === state ? 'internship-map-details' : undefined}
          aria-describedby={preview?.name === state && !preview.pinned ? 'internship-map-details' : undefined}
          {...locationEvents(state, company, city)}>
          <span className="internship-map-logo-badge">
            {logo ? <img src={logo.src} alt="" draggable="false" /> : company}
          </span>
        </button>)}
        {preview && <div key={preview.name} id="internship-map-details" ref={popoverRef}
          className="internship-map-tooltip" role={preview.pinned ? 'dialog' : 'tooltip'} aria-label={`${preview.name} work details`}
          style={{ left: preview.left, top: preview.top }} onPointerEnter={keepPreviewOpen} onPointerLeave={closePreview}>
          {preview.pinned && <button className="internship-map-close" type="button" aria-label="Close work details" onClick={() => dismiss(true)}>×</button>}
          <p className="internship-map-tooltip-state">{preview.name}</p>
          {previewRoles.map(({ company, dates, role, summary, location }) => <div className="internship-map-tooltip-entry" key={`${company}-${dates}`}>
            <p className="internship-map-tooltip-company">{company} <span>· {location.city}</span></p>
            <p className="internship-map-tooltip-meta">{role}<br />{dates}</p>
            <p className="internship-map-tooltip-summary">{summary}</p>
          </div>)}
        </div>}
      </div>
    </figure>
  </div>;
}
