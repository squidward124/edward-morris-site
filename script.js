(() => {
    const canvas = document.getElementById('dotgrid');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const GAP = 32;
    const BASE_R = 1;
    const MAX_R = 2.2;
    const BASE_ALPHA = 0.12;
    const MAX_ALPHA = 0.5;
    const RADIUS = 120;

    let mouse = { x: -9999, y: -9999 };
    let cols, rows;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        cols = Math.ceil(canvas.width / GAP) + 1;
        rows = Math.ceil(canvas.height / GAP) + 1;
    }

    window.addEventListener('resize', resize);
    resize();

    document.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const x = i * GAP;
                const y = j * GAP;

                const dx = mouse.x - x;
                const dy = mouse.y - y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                const t = Math.max(0, 1 - dist / RADIUS);
                const r = BASE_R + (MAX_R - BASE_R) * t;
                const alpha = BASE_ALPHA + (MAX_ALPHA - BASE_ALPHA) * t;

                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(160, 190, 230, ${alpha})`;
                ctx.fill();
            }
        }

        requestAnimationFrame(draw);
    }

    draw();
})();
