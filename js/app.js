// 🎨 Thème clair / sombre
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

themeToggle?.addEventListener('click', () => {
  const current = html.dataset.theme;
  const next = current === 'dark' ? 'light' : 'dark';
  html.dataset.theme = next;
  themeToggle.innerHTML = next === 'dark' 
    ? '<i class="fas fa-moon"></i>' 
    : '<i class="fas fa-sun"></i>';
});

// ✨ Animation au scroll (fade-in léger)
const elements = document.querySelectorAll('section, .project-card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'none';
    }
  });
}, {
  threshold: 0.1
});

elements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
  observer.observe(el);
});
