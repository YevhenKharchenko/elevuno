const faqBtns = document.querySelectorAll('.faq-top-text-btn');
faqBtns.forEach(btn => btn.addEventListener('click', onBtnClick));

function onBtnClick(e) {
  const faqTop = e.currentTarget;
  const faqContainer = faqTop.closest('.faq-list-item');

  document.querySelectorAll('.faq-list-item').forEach(item => {
    if (item !== faqContainer) {
      item.classList.remove('faq-open');
      item.querySelector('.faq-bottom-text').classList.remove('is-visible');
    }
  });

  const bottomText = faqContainer.querySelector('.faq-bottom-text');
  bottomText.classList.toggle('is-visible');

  if (bottomText.classList.contains('is-visible')) {
    faqContainer.classList.add('faq-open');
  } else {
    faqContainer.classList.remove('faq-open');
  }
}
