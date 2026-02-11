const slowScrollTo = (element: HTMLElement, duration = 1000, offset = 100) => {
  const targetY = element.getBoundingClientRect().top + window.scrollY - offset;
  const startY = window.scrollY;
  const diff = targetY - startY;
  const startTime = performance.now();

  const step = (currentTime: number) => {
    const time = Math.min(1, (currentTime - startTime) / duration);
    const easedTime = easeInOutQuad(time);
    window.scrollTo(0, startY + diff * easedTime);

    if (time < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};


export { slowScrollTo };


const slowScrollToId = (id: string, duration = 1000, offset = 100) => {
  const element = document.getElementById(id);
  if (!element) return;

  const targetY = element.getBoundingClientRect().top + window.scrollY - offset;
  const startY = window.scrollY;
  const diff = targetY - startY;
  const startTime = performance.now();

  const step = (currentTime: number) => {
    const time = Math.min(1, (currentTime - startTime) / duration);
    const easedTime = easeInOutQuad(time);
    window.scrollTo(0, startY + diff * easedTime);

    if (time < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

export { slowScrollToId };


const easeInOutQuad = (t: number) =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
