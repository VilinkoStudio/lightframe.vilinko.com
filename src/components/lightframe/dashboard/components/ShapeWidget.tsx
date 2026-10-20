import { component$, useSignal, useVisibleTask$ } from "@qwik.dev/core";

interface Point {
  x: number;
  y: number;
}

const SPIKES = 8;
const HIT_RADIUS = 28;

/**
 * 形状组件：一个可以拖动顶点的星形，用来预览组件形状的自由度
 */
export const ShapeWidget = component$(() => {
  const canvasRef = useSignal<HTMLCanvasElement>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const canvas = canvasRef.value;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /** 顶点用 0-1 的相对坐标保存，画布尺寸变化时形状不会跑偏 */
    let points: Point[] = [];
    let active = -1;
    let hovered = -1;
    let width = 0;
    let height = 0;

    const readColor = (name: string, fallback: string) => {
      const value = getComputedStyle(canvas)
        .getPropertyValue(name)
        .trim();
      return value || fallback;
    };

    const seed = () => {
      points = [];
      const step = (Math.PI * 2) / (SPIKES * 2);
      for (let i = 0; i < SPIKES * 2; i++) {
        const outer = i % 2 === 0;
        const radius = outer ? 0.4 + Math.random() * 0.05 : 0.2 + Math.random() * 0.05;
        const angle = -Math.PI / 2 + i * step + (Math.random() - 0.5) * step * 0.18;
        points.push({
          x: 0.5 + Math.cos(angle) * radius,
          y: 0.5 + Math.sin(angle) * radius,
        });
      }
    };

    // 用短边做正方形投影，组件被拉宽时星形也不会变形
    const projection = () => {
      const scale = Math.min(width, height);
      return {
        scale,
        offsetX: (width - scale) / 2,
        offsetY: (height - scale) / 2,
      };
    };

    const toPixels = (point: Point) => {
      const { scale, offsetX, offsetY } = projection();
      return {
        x: offsetX + point.x * scale,
        y: offsetY + point.y * scale,
      };
    };

    const draw = () => {
      const accent = readColor("--lf-primary-color", "#5b53e8");
      const accentRgb = readColor("--lf-primary-rgb", "91, 83, 232");
      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      points.forEach((point, index) => {
        const { x, y } = toPixels(point);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = `rgba(${accentRgb}, 0.14)`;
      ctx.fill();
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.lineJoin = "round";
      ctx.stroke();

      points.forEach((point, index) => {
        const { x, y } = toPixels(point);
        const radius = index === active ? 6.5 : index === hovered ? 5 : 3.5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = readColor("--lf-surface", "#ffffff");
        ctx.stroke();
      });
    };

    const findPoint = (event: PointerEvent, radius: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      let found = -1;
      let best = radius;
      points.forEach((point, index) => {
        const { x: px, y: py } = toPixels(point);
        const distance = Math.hypot(x - px, y - py);
        if (distance < best) {
          best = distance;
          found = index;
        }
      });
      return found;
    };

    const handlePointerDown = (event: PointerEvent) => {
      const found = findPoint(event, HIT_RADIUS);
      if (found < 0) return;
      active = found;
      hovered = found;
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
      canvas.style.touchAction = "none";
      event.preventDefault();
      draw();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (active >= 0) {
        const rect = canvas.getBoundingClientRect();
        const { scale, offsetX, offsetY } = projection();
        points[active] = {
          x: (event.clientX - rect.left - offsetX) / scale,
          y: (event.clientY - rect.top - offsetY) / scale,
        };
        draw();
        return;
      }
      const found = findPoint(event, HIT_RADIUS);
      if (found !== hovered) {
        hovered = found;
        canvas.style.cursor = found >= 0 ? "grab" : "";
        draw();
      }
    };

    const handlePointerLeave = () => {
      if (active >= 0) return;
      hovered = -1;
      canvas.style.cursor = "";
      draw();
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (active < 0) return;
      active = -1;
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
      canvas.style.cursor = hovered >= 0 ? "grab" : "";
      draw();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!points.length) seed();
      draw();
    };

    const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = () => draw();

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    themeQuery.addEventListener("change", handleThemeChange);
    window.addEventListener("resize", resize);

    resize();

    cleanup(() => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      themeQuery.removeEventListener("change", handleThemeChange);
      window.removeEventListener("resize", resize);
      canvas.style.cursor = "";
    });
  });

  return (
    <div class="widget widget-shape">
      <canvas ref={canvasRef} class="shape-canvas" aria-hidden="true" />
      <span class="widget-hint">拖动顶点</span>
    </div>
  );
});
