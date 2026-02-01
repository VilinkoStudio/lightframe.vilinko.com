import {
  component$,
  useSignal,
  useVisibleTask$,
  useStyles$,
  type Signal,
} from "@qwik.dev/core";
import styles from "./dashboard.css?inline";
import modalStyles from "./modal.css?inline";
import { trackDownload } from "~/services/api";
import { DOWNLOAD, LINKS } from "~/constants";

const MeetCard = () => (
  <div class="dashboard-card meet-card">
    <div class="meet-line"></div>
    <div class="meet-text">
      Meet.
      <br />
      Inspire.
      <br />
      Create.
    </div>
  </div>
);

const ClockCard = ({ time }: { time: Signal<string> }) => (
  <div class="dashboard-card clock-card">
    <div class="clock-text">{time.value}</div>
  </div>
);

const StarCard = ({
  starCardRef,
}: {
  starCardRef: Signal<HTMLDivElement | undefined>;
}) => <div ref={starCardRef} class="dashboard-card star-card"></div>;

const DownloadModal = ({
  isVisible,
  agreedToTerms,
}: {
  isVisible: Signal<boolean>;
  agreedToTerms: Signal<boolean>;
}) => {
  // eslint-disable-next-line qwik/use-method-usage
  useStyles$(modalStyles);

  return (
    <div
      class="modal-overlay"
      onClick$={(e, el) => e.target === el && (isVisible.value = false)}
    >
      <div class="modal-content">
        <div class="modal-header">
          <h2>下载 LightFrame</h2>
          <button class="close-btn" onClick$={() => (isVisible.value = false)}>
            ×
          </button>
        </div>
        <div class="modal-body">
          <a
            href={DOWNLOAD.X64}
            class={`download-link ${!agreedToTerms.value ? "disabled" : ""}`}
            onClick$={() => agreedToTerms.value && trackDownload()}
          >
            Windows x64 (推荐)
          </a>
          <a
            href={DOWNLOAD.X86}
            class={`download-link ${!agreedToTerms.value ? "disabled" : ""}`}
            onClick$={() => agreedToTerms.value && trackDownload()}
          >
            Windows x86
          </a>
          <div class="terms-container">
            <label class="terms-label">
              <input
                type="checkbox"
                checked={agreedToTerms.value}
                onChange$={() => (agreedToTerms.value = !agreedToTerms.value)}
              />
              在使用前您需要阅读并同意我们的
              <a
                href={LINKS.TOS}
                target="_blank"
                rel="noopener noreferrer"
                class="terms-link"
              >
                《服务条款》
              </a>
              和
              <a
                href={LINKS.PRIVACY}
                target="_blank"
                rel="noopener noreferrer"
                class="terms-link"
              >
                《隐私政策》
              </a>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionCard = ({
  month,
  dateStr,
  showModal,
}: {
  month: Signal<string>;
  dateStr: Signal<string>;
  showModal: Signal<boolean>;
}) => (
  <div class="dashboard-card action-card">
    <button class="click-btn" onClick$={() => (showModal.value = true)}>
      <span class="mc-text">下载</span>
    </button>
    <div class="date-row">
      <div class="date-box month-box">
        <span>{month.value}</span>
      </div>
      <div class="date-box day-box">
        <span>{dateStr.value}</span>
      </div>
    </div>
  </div>
);

export default component$(() => {
  useStyles$(styles);

  const time = useSignal("00:00");
  const month = useSignal("...");
  const dateStr = useSignal("...");
  const showModal = useSignal(false);
  const agreedToTerms = useSignal(false);

  const canvasRef = useSignal<HTMLCanvasElement>();
  const starCardRef = useSignal<HTMLDivElement>();
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
    const updateTime = () => {
      const now = new Date();
      time.value = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      const monthFormatter = new Intl.DateTimeFormat("en-US", {
        month: "short",
      });
      const dayFormatter = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
      });
      month.value = monthFormatter.format(now) + ".";
      dateStr.value = `${now.getDate()} ${dayFormatter.format(now)}.`;
    };

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
        const isDarkTheme = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
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

    const getMousePos = (e: MouseEvent) => {
      const canvas = canvasRef.value;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseDown = (e: MouseEvent) => {
      const pos = getMousePos(e);
      const r = rectRef.value;
      const handles = [
        { x: r.l, y: r.t, id: "rect-tl" },
        { x: r.l, y: r.b, id: "rect-bl" },
        { x: r.r, y: r.b, id: "rect-br" },
      ];
      for (const h of handles) {
        if (Math.sqrt((pos.x - h.x) ** 2 + (pos.y - h.y) ** 2) < 15) {
          dragRef.value = h.id;
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }
      const pts = pointsRef.value;
      for (let i = 0; i < pts.length; i++) {
        if (Math.sqrt((pos.x - pts[i].x) ** 2 + (pos.y - pts[i].y) ** 2) < 15) {
          dragRef.value = i;
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
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
          (h) => Math.sqrt((pos.x - h.x) ** 2 + (pos.y - h.y) ** 2) < 15,
        )
      )
        isOver = true;
      if (
        pts.some((p) => Math.sqrt((pos.x - p.x) ** 2 + (pos.y - p.y) ** 2) < 15)
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

    const handleMouseUp = () => {
      if (dragRef.value !== null) {
        dragRef.value = null;
        document.documentElement.style.cursor = "";
        draw();
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = () => draw();
    themeMediaQuery.addEventListener("change", handleThemeChange);

    window.addEventListener("mousedown", handleMouseDown, true);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", resize);
    resize();

    cleanup(() => {
      clearInterval(interval);
      themeMediaQuery.removeEventListener("change", handleThemeChange);
      window.removeEventListener("mousedown", handleMouseDown, true);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", resize);
      document.documentElement.style.cursor = "";
    });
  });

  return (
    <div class="dashboard-container">
      <canvas ref={canvasRef} class="star-canvas" />
      <MeetCard />
      <ClockCard time={time} />
      <StarCard starCardRef={starCardRef} />
      <ActionCard month={month} dateStr={dateStr} showModal={showModal} />
      {showModal.value && (
        <DownloadModal isVisible={showModal} agreedToTerms={agreedToTerms} />
      )}
    </div>
  );
});
