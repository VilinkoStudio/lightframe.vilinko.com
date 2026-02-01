import {
  component$,
  type Signal,
  useSignal,
  useVisibleTask$,
} from "@qwik.dev/core";

export interface StarCardProps {
  starCardRef: Signal<HTMLDivElement | undefined>;
}

export const StarCard = component$<StarCardProps>(({ starCardRef }) => {
  const canvasRef = useSignal<HTMLCanvasElement>();
  const pointsRef = useSignal<{ x: number; y: number }[]>([]);
  const rectRef = useSignal<{ l: number; t: number; r: number; b: number }>({
    l: 0,
    t: 0,
    r: 0,
    b: 0,
  });
  const dragRef = useSignal<number | string | null>(null);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const draw = () => {
      const canvas = canvasRef.value;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = canvas.width / devicePixelRatio;
      const h = canvas.height / devicePixelRatio;
      ctx.clearRect(0, 0, w, h);
      const r = rectRef.value;

      const isDarkTheme = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      ctx.save();
      ctx.shadowColor = isDarkTheme
        ? "rgba(0, 0, 0, 0.3)"
        : "rgba(0, 0, 0, 0.1)";
      ctx.shadowBlur = 30;
      ctx.shadowOffsetY = 10;
      ctx.beginPath();
      ctx.rect(r.l, r.t, r.r - r.l, r.b - r.t);
      ctx.fillStyle = isDarkTheme ? "#262626" : "#ffffff";
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = isDarkTheme
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(0, 0, 0, 0.05)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = "#6366f1";
      [
        { x: r.l, y: r.t, id: "rect-tl" },
        { x: r.l, y: r.b, id: "rect-bl" },
        { x: r.r, y: r.b, id: "rect-br" },
      ].forEach((h) => {
        ctx.beginPath();
        ctx.arc(h.x, h.y, dragRef.value === h.id ? 7 : 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.stroke();
      });

      const pts = pointsRef.value;
      if (pts.length > 0) {
        ctx.beginPath();
        pts.forEach((p, i) =>
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y),
        );
        ctx.closePath();
        ctx.fillStyle = isDarkTheme
          ? "rgba(42, 42, 42, 0.6)"
          : "rgba(220, 220, 220, 0.4)";
        ctx.fill();
        ctx.strokeStyle = isDarkTheme ? "#9ca3af" : "#6b7280";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = "#818cf8";
        pts.forEach((p, i) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, dragRef.value === i ? 8 : 5, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    };

    const generateRandomPoints = (
      cx: number,
      cy: number,
      rO: number,
      rI: number,
    ) => {
      const pts = [];
      const numPoints = 8;
      const angleStep = (Math.PI * 2) / (numPoints * 2);
      for (let i = 0; i < numPoints * 2; i++) {
        const isOuter = i % 2 === 0;
        const scale = isOuter
          ? 0.85 + Math.random() * 0.3
          : 0.75 + Math.random() * 0.3;
        const r = (isOuter ? rO : rI) * scale;
        const angle =
          i * angleStep -
          Math.PI / 2 +
          (Math.random() - 0.5) * angleStep * 0.15;
        pts.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
      }
      return pts;
    };

    const resize = () => {
      const canvas = canvasRef.value;
      if (!canvas) return;
      const targetCard = starCardRef.value;
      if (!targetCard) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const cardRect = targetCard.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      const px = cardRect.left - rect.left;
      const py = cardRect.top - rect.top;

      if (rectRef.value.l === 0) {
        rectRef.value = {
          l: px,
          t: py,
          r: px + cardRect.width,
          b: py + cardRect.height,
        };
      }
      if (pointsRef.value.length === 0) {
        pointsRef.value = generateRandomPoints(
          px + cardRect.width * 0.85,
          py + cardRect.height * 0.22,
          Math.min(cardRect.width, cardRect.height) * 0.34,
          Math.min(cardRect.width, cardRect.height) * 0.24,
        );
      }
      draw();
    };

    const getMousePos = (e: MouseEvent | PointerEvent) => {
      const canvas = canvasRef.value;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handlePointerDown = (e: PointerEvent) => {
      const pos = getMousePos(e);
      const r = rectRef.value;
      const handles = [
        { x: r.l, y: r.t, id: "rect-tl" },
        { x: r.l, y: r.b, id: "rect-bl" },
        { x: r.r, y: r.b, id: "rect-br" },
      ];
      for (const h of handles) {
        if (Math.sqrt((pos.x - h.x) ** 2 + (pos.y - h.y) ** 2) < 25) {
          dragRef.value = h.id;
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }
      const pts = pointsRef.value;
      for (let i = 0; i < pts.length; i++) {
        if (Math.sqrt((pos.x - pts[i].x) ** 2 + (pos.y - pts[i].y) ** 2) < 25) {
          dragRef.value = i;
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const pos = getMousePos(e);
      const r = { ...rectRef.value };
      const pts = pointsRef.value;

      let isOver = false;
      const handles = [
        { x: r.l, y: r.t },
        { x: r.l, y: r.b },
        { x: r.r, y: r.b },
      ];
      if (
        handles.some(
          (h) => Math.sqrt((pos.x - h.x) ** 2 + (pos.y - h.y) ** 2) < 25,
        )
      )
        isOver = true;
      if (
        pts.some((p) => Math.sqrt((pos.x - p.x) ** 2 + (pos.y - p.y) ** 2) < 25)
      )
        isOver = true;
      document.documentElement.style.cursor =
        dragRef.value !== null ? "grabbing" : isOver ? "grab" : "";

      if (dragRef.value === null) return;
      if (typeof dragRef.value === "string") {
        if (dragRef.value === "rect-tl") r.l = pos.x;
        else if (dragRef.value === "rect-bl") {
          r.l = pos.x;
          r.b = pos.y;
        } else if (dragRef.value === "rect-br") r.b = pos.y;
        rectRef.value = r;
      } else {
        pts[dragRef.value] = { x: pos.x, y: pos.y };
      }
      draw();
    };

    const handlePointerUp = () => {
      if (dragRef.value !== null) {
        dragRef.value = null;
        document.documentElement.style.cursor = "";
        draw();
      }
    };

    const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = () => draw();
    themeMediaQuery.addEventListener("change", handleThemeChange);

    window.addEventListener("pointerdown", handlePointerDown, true);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("resize", resize);
    resize();

    cleanup(() => {
      themeMediaQuery.removeEventListener("change", handleThemeChange);
      window.removeEventListener("pointerdown", handlePointerDown, true);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("resize", resize);
      document.documentElement.style.cursor = "";
    });
  });

  return (
    <>
      <canvas ref={canvasRef} class="star-canvas" />
      <div ref={starCardRef} class="dashboard-card star-card"></div>
    </>
  );
});
