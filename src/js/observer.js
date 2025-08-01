export function observeSwiperAutoplay(
  swiperInstance,
  swiperElement,
  threshold = 0.25
) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          swiperInstance.autoplay.start();
        } else {
          swiperInstance.autoplay.stop();
        }
      });
    },
    { threshold }
  );

  observer.observe(swiperElement);
}
