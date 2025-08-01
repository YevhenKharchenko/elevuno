const contextMenu = document.querySelector('.context-menu');
const menuBtn = document.querySelector('.nav-btn');
const closeContextBtn = document.querySelector('.close-btn');

menuBtn.addEventListener('click', onMenuButtonClick);

let contextMenuIsOpen = false;

function onMenuButtonClick() {
  if (contextMenuIsOpen) return;

  contextMenuIsOpen = true;
  contextMenu.classList.add('is-open');
  menuBtn.classList.add('closed');
  closeContextBtn.classList.add('is-open');

  contextMenu.addEventListener('click', onContextMenuLinkClick);
  closeContextBtn.addEventListener('click', onCloseContextButtonClick);
  document.addEventListener('click', onOutsideMenuClick);
}

function onCloseContextButtonClick() {
  contextMenuIsOpen = false;
  contextMenu.classList.remove('is-open');
  closeContextBtn.classList.remove('is-open');
  menuBtn.classList.remove('closed');

  contextMenu.removeEventListener('click', onContextMenuLinkClick);
  closeContextBtn.removeEventListener('click', onCloseContextButtonClick);
  document.removeEventListener('click', onOutsideMenuClick);
}

function onContextMenuLinkClick(e) {
  if (e.target.nodeName === 'A') {
    onCloseContextButtonClick();
  }
}

function onOutsideMenuClick(e) {
  const isClickInsideMenu = contextMenu.contains(e.target);
  const isClickOnMenuBtn = menuBtn.contains(e.target);
  const isClickOnCloseBtn = closeContextBtn.contains(e.target);

  if (!isClickInsideMenu && !isClickOnMenuBtn && !isClickOnCloseBtn) {
    onCloseContextButtonClick();
  }
}

const navLinks = document.querySelectorAll('.nav-list-link');
const sectionIds = Array.from(navLinks).map(link =>
  link.getAttribute('href').replace('./index.html#', '')
);

const sections = sectionIds
  .map(id => document.getElementById(id))
  .filter(Boolean);

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const navLink = document.querySelector(
      `.nav-list-link[href="./index.html#${id}"]`
    );

    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLink?.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));
