// Landing page JS with tsParticles using inline SVG data URIs
document.addEventListener('DOMContentLoaded', () => {
  const stroke = '%23e6faff';
  const wrench = `data:image/svg+xml;utf8,
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
    <g fill='none' stroke='${stroke}' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'>
      <path d='M23 15 52 44a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7 0L15 23'/>
      <path d='M12 26 7 31m10-22 7 7'/>
    </g>
  </svg>`;
  const screwdriver = `data:image/svg+xml;utf8,
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
    <g fill='none' stroke='${stroke}' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'>
      <path d='M26 47 52 21l6 6-26 26'/>
      <path d='M48 17l7-7 6 6-7 7z'/>
    </g>
  </svg>`;
  const tire = `data:image/svg+xml;utf8,
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
    <g fill='none' stroke='${stroke}' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'>
      <circle cx='32' cy='32' r='18'/>
      <circle cx='32' cy='32' r='8'/>
      <path d='M32 14v6M32 44v6M14 32h6M44 32h6M20 20l4 4M40 40l4 4M44 20l-4 4M24 40l-4 4'/>
    </g>
  </svg>`;
  const oilcan = `data:image/svg+xml;utf8,
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
    <g fill='none' stroke='${stroke}' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'>
      <path d='M8 28h30a8 8 0 0 1 8 8v10H8zM46 36l10-8M56 28l2-6M22 22v6'/>
    </g>
  </svg>`;
  const jack = `data:image/svg+xml;utf8,
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
    <g fill='none' stroke='${stroke}' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'>
      <path d='M10 50h44'/>
      <path d='M12 46l14-14 12 12 14-14'/>
      <rect x='22' y='18' width='8' height='8'/>
    </g>
  </svg>`;

  const isMobile = window.matchMedia('(max-width: 900px)').matches;

  tsParticles.load({
    id: "tsparticles",
    options: {
      background: { color: { value: "#0f2027" } },
      detectRetina: true,
      fpsLimit: 60,
      interactivity: {
        events: { onHover: { enable: true, mode: ["attract","bubble"] }, resize: true },
        modes: { attract: { distance: 120, duration: 0.2, factor: 1.2, speed: 1 },
                 bubble:  { distance: 100, duration: 0.3, opacity: 1, size: 28 } }
      },
      particles: {
        number: { value: isMobile ? 16 : 30, density: { enable: true, area: 900 } },
        move: { enable: true, speed: 0.6, outModes: { default: "bounce" }, drift: 0.25 },
        opacity: { value: 0.95 },
        size: { value: { min: isMobile ? 14 : 18, max: isMobile ? 26 : 36 } },
        rotate: { value: { min: 0, max: 360 }, direction: "random", animation: { enable: true, speed: 10 } },
        links: { enable: false },
        shape: { type: "image", image: [
          { src: wrench, width: 64, height: 64 },
          { src: screwdriver, width: 64, height: 64 },
          { src: tire, width: 64, height: 64 },
          { src: jack, width: 64, height: 64 },
          { src: oilcan, width: 64, height: 64 }
        ]}
      }
    }
  });
});
