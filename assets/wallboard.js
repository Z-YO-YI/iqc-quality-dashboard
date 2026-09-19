// A single compositor animation per visible table; no layout reads in the frame loop.
function createTableScroller(wrap, { speed = 24, onEnd } = {}) {
  const table = wrap?.querySelector('table');
  const body = table?.querySelector('tbody');
  if (!body) return { stop() {} };
  let frame = null, offset = 0, max = 0, last = 0, pauseUntil = 0, hovering = false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const schedule = () => {
    if (frame === null && !hovering && !document.hidden && !reducedMotion.matches && (max > 0 || onEnd)) {
      frame = requestAnimationFrame(step);
    }
  };
  const measure = () => {
    max = Math.max(0, table.offsetHeight - wrap.clientHeight);
    offset = Math.min(offset, max);
    body.style.transform = `translate3d(0, ${-offset}px, 0)`;
  };
  const step = now => {
    frame = null;
    const dt = last ? Math.min(now - last, 50) / 1000 : 0;
    last = now;
    if (!hovering && now >= pauseUntil) {
      if (max > 0 && offset < max) {
        offset = Math.min(max, offset + speed * dt);
        body.style.transform = `translate3d(0, ${-offset}px, 0)`;
        if (offset === max) pauseUntil = now + 1800;
      } else if (onEnd) {
        onEnd(); // The renderer replaces this scroller, so do not schedule another frame.
        return;
      } else if (max > 0) {
        offset = 0; body.style.transform = ''; pauseUntil = now + 1800;
      }
    }
    schedule();
  };
  const resume = () => {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null; last = 0; pauseUntil = performance.now() + 2500;
    schedule();
  };
  const enter = () => {
    hovering = true;
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
  };
  const leave = () => { hovering = false; last = 0; schedule(); };
  const observer = new ResizeObserver(() => { measure(); resume(); });
  observer.observe(wrap); observer.observe(table);
  wrap.scrollTop = 0;
  wrap.addEventListener('pointerenter', enter); wrap.addEventListener('pointerleave', leave);
  document.addEventListener('visibilitychange', resume);
  reducedMotion.addEventListener('change', resume);
  body.style.willChange = 'transform';
  measure(); resume();
  return { stop() {
    if (frame !== null) cancelAnimationFrame(frame);
    observer.disconnect();
    wrap.removeEventListener('pointerenter', enter); wrap.removeEventListener('pointerleave', leave);
    document.removeEventListener('visibilitychange', resume);
    reducedMotion.removeEventListener('change', resume);
    body.style.transform = ''; body.style.willChange = '';
  } };
}

let chartResizeFrame = null;
function scheduleChartResize() {
  if (chartResizeFrame !== null) return;
  chartResizeFrame = requestAnimationFrame(() => {
    chartResizeFrame = null;
    Object.values(sbCharts).forEach(chart => {
      const element = chart.getDom();
      if (!chart.isDisposed() && element.clientWidth && element.clientHeight) chart.resize({ animation: { duration: 0 } });
    });
  });
}
