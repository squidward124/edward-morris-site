// Subtle parallax on the grid background
document.addEventListener('mousemove', (e) => {
    const grid = document.querySelector('.bg-grid');
    if (!grid) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    grid.style.transform = `translate(${x}px, ${y}px)`;
});
