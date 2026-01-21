import { PATHS } from "@/constants/path";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "zmp-ui";

type SymbolId = "🍒" | "🍋" | "🔔" | "⭐" | "🧧";
const SYMBOLS: SymbolId[] = ["🍒", "🍋", "🔔", "⭐", "🧧"];

const REPEAT = 12;

function makeStrip() {
  const out: SymbolId[] = [];
  for (let i = 0; i < REPEAT; i++) out.push(...SYMBOLS);
  return out;
}

function ReelLoop({
  strip,
  spinning,
  stopAtIndex,
  stopSignal,
  hasSpun,
  durationMs,
  delayMs,
  onDone,
}: {
  strip: SymbolId[];
  spinning: boolean;
  stopAtIndex: number;
  stopSignal: number;
  hasSpun: boolean;
  durationMs: number;
  delayMs: number;
  onDone?: () => void;
}) {
  const stripRef = React.useRef<HTMLDivElement | null>(null);

  const ITEM_H = 72;
  const SPEED = 1400;
  const stripHeight = strip.length * ITEM_H;

  const yRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  const lastTsRef = React.useRef<number | null>(null);
  const spinningRef = React.useRef(false);

  const setTransform = (y: number) => {
    const el = stripRef.current;
    if (!el) return;
    el.style.transform = `translateY(-${y}px)`;
  };

  const setTransition = (value: string) => {
    const el = stripRef.current;
    if (!el) return;
    el.style.transition = value;
  };

  React.useEffect(() => {
    spinningRef.current = spinning;

    if (!spinning) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
      return;
    }

    setTransition("none");

    const tick = (ts: number) => {
      if (!spinningRef.current) return;

      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      yRef.current = (yRef.current + SPEED * dt) % stripHeight;
      setTransform(yRef.current);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [spinning, stripHeight]);

  React.useEffect(() => {
    if (!hasSpun) return;
    if (spinning) return;

    const t = window.setTimeout(() => {
      const total = SYMBOLS.length;
      const baseOffset = strip.length - total;
      const targetIndex = baseOffset + stopAtIndex;
      const targetY = (targetIndex * ITEM_H) % stripHeight;

      const current = yRef.current % stripHeight;

      let nextTarget = targetY;
      if (nextTarget < current) nextTarget += stripHeight;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      spinningRef.current = false;

      setTransition(
        `transform ${durationMs}ms cubic-bezier(0.12, 0.8, 0.2, 1)`
      );
      setTransform(nextTarget);

      const end = window.setTimeout(() => {
        setTransition("none");
        yRef.current = targetY;
        setTransform(yRef.current);
        onDone?.();
      }, durationMs + 30);

      return () => window.clearTimeout(end);
    }, delayMs);

    return () => window.clearTimeout(t);
  }, [
    hasSpun,
    stopSignal,
    spinning,
    stopAtIndex,
    delayMs,
    durationMs,
    strip.length,
    stripHeight,
  ]);

  return (
    <div
      className="relative overflow-hidden rounded-2xl flex justify-center pt-1"
      style={{ width: 44, height: ITEM_H + 2 }}
    >
      <div ref={stripRef}>
        {strip.map((s, i) => (
          <div
            key={i}
            className="grid place-items-center"
            style={{ height: ITEM_H }}
          >
            <span className="text-4xl leading-none">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SlotMachine() {
  const strip = useMemo(() => makeStrip(), []);
  const [spinning, setSpinning] = useState(false);
  const [stopSignal, setStopSignal] = useState(0);
  const [result, setResult] = useState<[number, number, number]>([0, 0, 0]);

  const [doneCount, setDoneCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const navigate = useNavigate();

  const spin = () => {
    if (isAnimating || isClaiming) return;

    setDoneCount(0);
    setIsAnimating(true);
    setIsClaiming(false);
    setHasSpun(true);
    setSpinning(true);

    // TODO:
    // Thực hiện thay thế kết quả Vòng quay may mắn tại đây thông qua việc gọi API
    // Hiện đang giả lập ngẫu nhiên, và bắt đầu quay sau 1500ms
    const r: [number, number, number] = [
      Math.floor(Math.random() * SYMBOLS.length),
      Math.floor(Math.random() * SYMBOLS.length),
      Math.floor(Math.random() * SYMBOLS.length),
    ];
    setResult(r);

    window.setTimeout(() => {
      setSpinning(false);
      setStopSignal((x) => x + 1);
    }, 2000);
  };

  const onDone = () => {
    setDoneCount((count) => count + 1);
  };

  useEffect(() => {
    if (doneCount === 3) {
      setIsAnimating(false);
      setIsClaiming(true);
    }
  }, [doneCount]);

  useEffect(() => {
    if (!isClaiming) return;
    const t = window.setTimeout(() => {
      navigate(PATHS.VOUCHER);
    }, 700);

    return () => window.clearTimeout(t);
  }, [isClaiming, navigate]);

  return (
    <div className="grid justify-items-center gap-4 p-4">
      <div className="flex">
        <ReelLoop
          strip={strip}
          spinning={spinning}
          stopAtIndex={result[0]}
          stopSignal={stopSignal}
          hasSpun={hasSpun}
          delayMs={0}
          durationMs={1000}
          onDone={onDone}
        />
        <ReelLoop
          strip={strip}
          spinning={spinning}
          stopAtIndex={result[1]}
          stopSignal={stopSignal}
          hasSpun={hasSpun}
          delayMs={0}
          durationMs={2000}
          onDone={onDone}
        />
        <ReelLoop
          strip={strip}
          spinning={spinning}
          stopAtIndex={result[2]}
          delayMs={0}
          stopSignal={stopSignal}
          hasSpun={hasSpun}
          durationMs={3000}
          onDone={onDone}
        />
      </div>

      <button onClick={spin} disabled={isAnimating || isClaiming}>
        <div className="font-black text-xl text-white text-center mt-19 py-2 px-8">
          {isClaiming
            ? "Nhận thưởng.."
            : isAnimating
            ? "Đang quay.."
            : "Bấm ngay"}
        </div>
      </button>
    </div>
  );
}
