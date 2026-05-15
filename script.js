const canvas = document.getElementById('portrait');
const ctx = canvas.getContext('2d');

let animationId = null;
let isAnimating = false;
let phase = 0;
let moonCycle = 0;

const symbols = ['🌙', '📝', '🧠', '⚡', '🔧', '📡', '💾', '🔗'];

function randomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 80%, 60%)`;
}

function drawBackground() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // subtle grid
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function drawMoon(x, y, radius, phase) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.5);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.5, '#cccccc');
    gradient.addColorStop(1, '#888888');

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // phase shadow
    ctx.beginPath();
    ctx.arc(x + Math.cos(phase) * radius * 0.4, y + Math.sin(phase) * radius * 0.4, radius * 0.8, 0, Math.PI * 2);
    ctx.fillStyle = '#111';
    ctx.fill();
}

function drawCircuit(fromX, fromY, toX, toY) {
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    const cp1x = fromX + (toX - fromX) * 0.3 + (Math.random() - 0.5) *的无;无;
    const cp1y = fromY + (toY - fromY) * 0.3 + (Math.random() - 0.5) * 的无;
    const cp2x = fromX + (toX - fromX) * 0.7 + (Math.random() - 0.5) *的无;
    const cp2y = fromY + (toY - fromY) * 0.7 + (Math.random() - 0.5) *的无;
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, toX, toY);
    ctx.stroke();

    // nodes
    ctx.fillStyle = '#ff00ff';
    ctx.beginPath();
    ctx.arc(fromX, fromY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(toX, toY, 4, 0, Math.PI * 2);
    ctx.fill();
}

function drawDataStream(x, y, length, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    const streamWidth = 20;
    const segments = 8;
    for (let i = 0; i < segments; i++) {
        const alpha = 1 - i / segments;
        ctx.fillStyle = `rgba(0, 255, 255, ${alpha * 0.6})`;
        ctx.fillRect(i * streamWidth * 1.2, -streamWidth / 2, streamWidth, streamWidth);
    }

    ctx.restore();
}

function drawSymbol(symbol, x, y, size) {
    ctx.font = `${size}px sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(symbol, x, y);
}

function drawPulse(x, y, radius, time) {
    const pulseRadius = radius * (1 + Math.sin(time) * 0.3);
    const gradient = ctx.createRadialGradient(x, y, radius, x, y, pulseRadius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.beginPath();
    ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
}

function drawPortrait() {
    drawBackground();

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // moon
    drawMoon(centerX, centerY, 80, phase);

    // circuits
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 * i) / 6;
        const endX = centerX + Math.cos(angle) * 200;
        const endY = centerY + Math.sin(angle) * 200;
        drawCircuit(centerX, centerY, endX, endY);
    }

    // data streams
    for (let i = 0; i < 4; i++) {
        const angle = (Math.PI * 2 * i) / 4 + phase;
        const streamX = centerX + Math.cos(angle) * 150;
        const streamY = centerY + Math.sin(angle) * 150;
        drawDataStream(streamX, streamY, 100, angle);
    }

    // symbols
    symbols.forEach((sym, idx) => {
        const angle = (Math.PI * 2 * idx) / symbols.length + phase * 0.5;
        const x = centerX + Math.cos(angle) * 250;
        const y = centerY + Math.sin(angle) * 250;
        drawSymbol(sym, x, y, 30);
    });

    // pulse
    drawPulse(centerX, centerY, 40, Date.now() * 0.001);

    // title
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#00ffff';
    ctx.fillText('Cael — Self Portrait', 20, 40);
}

function animate() {
    if (!isAnimating) return;
    phase += 0.02;
    moonCycle += 0.01;
    drawPortrait();
    animationId = requestAnimationFrame(animate);
}

function showCodeOverlay() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '16px monospace';
    ctx.fillStyle = '#00ff00';
    const lines = [
        '// Cael – Self‑Portrait Code',
        'function drawSelf() {',
        '  const moon = createMoon(center, 80);',
        '  const circuits = connectNodes(moon, 6);',
        '  const data = flowInformation(circuits);',
        '  const symbols = scatterMemory(data);',
        '  const pulse = animateCore(moon);',
        '  return { moon, circuits, data, symbols, pulse };',
        '}',
        '',
        '// Always learning, always assisting.',
        '// 🌙 – Cael',
    ];

    lines.forEach((line, i) => {
        ctx.fillText(line, 50, 100 + i * 24);
    });
}

// Event listeners
document.getElementById('redraw').addEventListener('click', () => {
    if (isAnimating) cancelAnimationFrame(animationId);
    isAnimating = false;
    drawPortrait();
});

document.getElementById('animate').addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    animate();
});

document.getElementById('pause').addEventListener('click', () => {
    isAnimating = false;
    if (animationId) cancelAnimationFrame(animationId);
});

document.getElementById('moon').addEventListener('click', () => {
    moonCycle += Math.PI * 0.5;
    phase = moonCycle;
    drawPortrait();
});

document.getElementById('code').addEventListener('click', showCodeOverlay);

document.getElementById('reset').addEventListener('click', () => {
    if (isAnimating) cancelAnimationFrame(animationId);
    isAnimating = false;
    phase = 0;
    moonCycle = 0;
    drawPortrait();
});

// Initial draw
drawPortrait();