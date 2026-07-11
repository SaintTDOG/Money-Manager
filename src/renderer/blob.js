// Pip's blob: idle click-to-expand, drag-to-move, occasional wander,
// emotion setter used by the app when Pip is thinking / celebrating.
(() => {
  const wrap = document.getElementById('blob-wrap');
  const blob = document.getElementById('blob');
  const bubble = document.getElementById('thought-bubble');
  let dragging = false;
  let dragStart = null;
  let winStart = null;
  let didDrag = false;

  wrap.addEventListener('mousedown', (e) => {
    dragging = true;
    didDrag = false;
    dragStart = { x: e.screenX, y: e.screenY };
    winStart = { x: window.screenX, y: window.screenY };
  });
  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const dx = e.screenX - dragStart.x;
    const dy = e.screenY - dragStart.y;
    if (Math.abs(dx) + Math.abs(dy) > 3) didDrag = true;
    if (didDrag) window.pip.move({ x: winStart.x + dx, y: winStart.y + dy });
  });
  window.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    if (!didDrag) window.PipUI.expand();
  });

  bubble.addEventListener('click', () => window.PipUI.expand());

  window.PipBlob = {
    setEmotion(kind) {
      if (!['idle', 'thinking', 'happy', 'pointing'].includes(kind)) return;
      blob.dataset.emotion = kind;
    },
    showBubble(text, timeoutMs = 6000) {
      bubble.textContent = text;
      bubble.hidden = false;
      clearTimeout(bubble._t);
      bubble._t = setTimeout(() => (bubble.hidden = true), timeoutMs);
    },
    hideBubble() {
      bubble.hidden = true;
    },
  };

  // Gentle wander every 25s when the panel is collapsed.
  setInterval(() => {
    if (document.getElementById('stage').dataset.mode !== 'idle') return;
    const dx = Math.round((Math.random() - 0.5) * 220);
    const dy = Math.round((Math.random() - 0.5) * 120);
    window.pip.move({ x: window.screenX + dx, y: window.screenY + dy });
  }, 25000);
})();
