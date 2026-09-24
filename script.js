// Reveal each terminal "block" once it scrolls into view
const blocks = document.querySelectorAll('.block');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  blocks.forEach(block => io.observe(block));
} else {
  blocks.forEach(block => block.classList.add('in-view'));
}

// Background music toggle
const audio = document.getElementById('bg-audio');
const musicBtn = document.getElementById('music-toggle');
const musicState = document.getElementById('music-state');

musicBtn.addEventListener('click', () => {
  const isOn = musicBtn.getAttribute('aria-pressed') === 'true';
  if (isOn) {
    audio.pause();
    musicBtn.setAttribute('aria-pressed', 'false');
    musicState.textContent = 'off';
  } else {
    audio.play().catch(() => { /* file missing or blocked — ignore */ });
    musicBtn.setAttribute('aria-pressed', 'true');
    musicState.textContent = 'on';
  }
});

// Fake "Ln, Col" status readout — ticks based on scroll position
const statusPos = document.getElementById('status-pos');
const termBody = document.getElementById('term-body');

function updateStatus() {
  const scrollRatio = termBody.scrollTop / (termBody.scrollHeight - termBody.clientHeight || 1);
  const line = Math.max(1, Math.round(scrollRatio * 240));
  statusPos.textContent = `Ln ${line}, Col 1`;
}

termBody.addEventListener('scroll', updateStatus, { passive: true });
updateStatus();
