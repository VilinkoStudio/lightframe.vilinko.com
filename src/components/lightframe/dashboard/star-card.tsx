import { component$, useSignal, useVisibleTask$ } from "@qwik.dev/core";

export default component$(() => {
  const canvasRef = useSignal<HTMLCanvasElement>();

  useVisibleTask$(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        // Use canvas's own bounding rect to support the larger size set by CSS
        const rect = canvas.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        // Do not set style width/height here, let CSS handle it

        ctx.scale(dpr, dpr);
        // Calculate offset of the card relative to the canvas
        // Canvas is shifted top-left by 50px relative to card
        const paddingX = parentRect.left - rect.left;
        const paddingY = parentRect.top - rect.top;

        // Pass card dimensions and padding to draw
        draw(
          ctx,
          rect.width,
          rect.height,
          paddingX,
          paddingY,
          parentRect.width,
          parentRect.height,
        );
      }
    };

    const draw = (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      padX: number,
      padY: number,
      cardW: number,
      cardH: number,
    ) => {
      ctx.clearRect(0, 0, w, h);

      const cx = padX + cardW * 0.85;
      const cy = padY + cardH * 0.22;

      const baseSize = Math.min(cardW, cardH);

      const outerRadiusBase = baseSize * 0.34;
      const innerRadiusBase = baseSize * 0.24;
      const numPoints = 8;

      const angleStep = (Math.PI * 2) / (numPoints * 2);

      ctx.beginPath();

      const points: { x: number; y: number }[] = [];

      for (let i = 0; i < numPoints * 2; i++) {
        const isOuter = i % 2 === 0;

        const randomScale = isOuter
          ? 0.85 + Math.random() * 0.3
          : 0.75 + Math.random() * 0.3;

        const r = (isOuter ? outerRadiusBase : innerRadiusBase) * randomScale;

        const angleJitter = (Math.random() - 0.5) * angleStep * 0.15;

        const angle = i * angleStep - Math.PI / 2 + angleJitter;

        const x = cx + Math.cos(angle) * r;

        const y = cy + Math.sin(angle) * r;

        points.push({ x, y });

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.closePath();

      const gradient = ctx.createRadialGradient(
        cx,
        cy,
        innerRadiusBase * 0.5,
        cx,
        cy,
        outerRadiusBase,
      );
      gradient.addColorStop(0, "#2a2a2a");
      gradient.addColorStop(1, "#1a1a1a");

      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.save();
      ctx.clip();
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      for (let k = 0; k < 150; k++) {
        ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
      }
      ctx.restore();

      ctx.strokeStyle = "#9ca3af";
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.stroke();

      ctx.fillStyle = "#818cf8";
      points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowColor = "rgba(129, 140, 248, 0.5)";
        ctx.shadowBlur = 4;
      });
      ctx.shadowBlur = 0;
    };

    resize();

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  });

  return (
    <div class="dashboard-card star-card">
      <canvas ref={canvasRef} class="star-canvas" />
    </div>
  );
});
