import { useEffect, useRef } from 'react';

export default function CircuitOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let nodes = [];
    let pulses = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateCircuit();
    };

    const generateCircuit = () => {
      nodes = [];
      const gridSize = 80;
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          if (Math.random() < 0.15) {
            nodes.push({
              x: x + Math.random() * 40 - 20,
              y: y + Math.random() * 40 - 20,
              connections: [],
              pulse: 0,
            });
          }
        }
      }
      nodes.forEach((node, i) => {
        nodes.forEach((other, j) => {
          if (i !== j) {
            const dist = Math.hypot(node.x - other.x, node.y - other.y);
            if (dist < 160 && Math.random() < 0.3) {
              node.connections.push(j);
            }
          }
        });
      });
    };

    const maybeAddPulse = () => {
      if (Math.random() < 0.03 && nodes.length > 0) {
        const startIdx = Math.floor(Math.random() * nodes.length);
        const node = nodes[startIdx];
        if (node.connections.length > 0) {
          const targetIdx = node.connections[Math.floor(Math.random() * node.connections.length)];
          pulses.push({
            fromIdx: startIdx,
            toIdx: targetIdx,
            progress: 0,
            speed: 0.02 + Math.random() * 0.02,
            color: Math.random() > 0.5 ? [0, 229, 255] : [255, 171, 0],
          });
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node) => {
        node.connections.forEach((connIdx) => {
          const other = nodes[connIdx];
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = 'rgba(0, 229, 255, 0.06)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });
      });

      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.15)';
        ctx.fill();
      });

      maybeAddPulse();

      pulses = pulses.filter((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) return false;

        const from = nodes[pulse.fromIdx];
        const to = nodes[pulse.toIdx];
        const x = from.x + (to.x - from.x) * pulse.progress;
        const y = from.y + (to.y - from.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        const [r, g, b] = pulse.color;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.8)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.2)`;
        ctx.fill();

        return true;
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
