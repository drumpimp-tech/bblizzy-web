"use client";

import { useRef, useState, useCallback, useEffect } from "react";

// ── Theme ──────────────────────────────────────────────────────────────────
const T = {
  bg:          "#0a0812",
  bgTop:       "#1a0d24",
  panel:       "rgba(20,16,33,0.95)",
  panelBorder: "#401a59",
  neonGreen:   "#2eff70",
  neonYellow:  "#ffed1a",
  accent:      "#a626ff",
  hot:         "#ff3873",
};

// ── Types ──────────────────────────────────────────────────────────────────
interface AnalysisResult {
  bblizzy_score:       number;
  confidence:          number;
  profile:             string;
  notes:               string;
  waist_hip_ratio?:    number;
  glute_hip_ratio?:    number;
  thigh_knee_ratio?:   number;
  thigh_hip_ratio?:    number;
  shoulder_hip_ratio?: number;
}

const PHRASES = [
  "CHECKING GENES AND JEANS",
  "LEG / THIGH CHECK",
  "WOBBLE METER CHECK",
  "FIRM-O-METER TEST",
  "READING THE GENES...",
  "GLUTE SCAN IN PROGRESS",
  "WAIST RATIO ANALYSIS",
  "THIGH REPORT LOADING",
];

// ── Tap To Enter ───────────────────────────────────────────────────────────
function TapToEnter({ onTap }: { onTap: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
      style={{ background: "#050208" }}
      onClick={onTap}
    >
      <div className="absolute top-3 left-0 right-0 flex justify-center gap-12">
        {[0,1,2,3].map(i => (
          <div key={i} className="led w-2 h-2 rounded-full bg-white" style={{ boxShadow:"0 0 10px #9333ea" }}/>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 led" style={{
        background:"linear-gradient(to right, #701ac8, #9333ea, #cc33ff, #9333ea, #701ac8)",
      }}/>
      <div className="flex flex-col items-center gap-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bblizzy-logo.png" alt="BBLIZZY" className="rounded-3xl icon-glow"
          style={{ width:160, height:160, objectFit:"cover" }}/>
        <div className="text-center">
          <div className="text-5xl tracking-[10px]" style={{
            background:"linear-gradient(to right, #c466ff, #701ac8)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            filter:"drop-shadow(0 0 18px rgba(147,51,234,0.8))", fontFamily:"Impact",
          }}>BBLIZZY</div>
          <div className="text-xs tracking-[6px] mt-2" style={{ color:"#7a5890", fontFamily:"Impact" }}>
            WHAT&apos;S IN THEM GENES
          </div>
        </div>
        <div className="text-xs tracking-[4px] led" style={{ color:"#9333ea", fontFamily:"Impact" }}>
          TAP TO ENTER
        </div>
      </div>
    </div>
  );
}

// ── Splash ─────────────────────────────────────────────────────────────────
function Splash({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    // Audio plays here because it's triggered by user gesture (tap)
    const audio = new Audio("/blizzy-audio.mp3");
    audio.volume = 1.0;
    audio.play().catch(() => {});

    const hide = setTimeout(() => setPhase("out"), 4400);
    const done = setTimeout(onDone, 5000);
    return () => { clearTimeout(hide); clearTimeout(done); audio.pause(); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "#050208",
        opacity: phase === "out" ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: phase === "out" ? "none" : "auto",
      }}
    >
      <div className="absolute top-3 left-0 right-0 flex justify-center gap-12">
        {[0,1,2,3].map(i => (
          <div key={i} className="led w-2 h-2 rounded-full bg-white" style={{ boxShadow:"0 0 10px #9333ea" }}/>
        ))}
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="beam1 absolute" style={{
          top:0, left:"50%", width:0, height:0,
          borderLeft:"110px solid transparent", borderRight:"110px solid transparent",
          borderTop:"100vh solid rgba(147,51,234,0.12)", transformOrigin:"0 0",
        }}/>
        <div className="beam2 absolute" style={{
          top:0, left:"50%", width:0, height:0,
          borderLeft:"110px solid transparent", borderRight:"110px solid transparent",
          borderTop:"100vh solid rgba(147,51,234,0.10)", transformOrigin:"0 0",
        }}/>
        <div className="beam3 absolute" style={{
          top:0, left:"50%", width:0, height:0,
          borderLeft:"90px solid transparent", borderRight:"90px solid transparent",
          borderTop:"100vh solid rgba(112,26,200,0.08)", transformOrigin:"0 0",
        }}/>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none" style={{
        background:"radial-gradient(ellipse 60% 100% at 50% 100%, rgba(112,26,200,0.35), transparent)",
      }}/>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 led" style={{
        background:"linear-gradient(to right, #701ac8, #9333ea, #cc33ff, #9333ea, #701ac8)",
      }}/>
      <div className="relative flex flex-col items-center gap-9">
        <div className="relative icon-glow">
          <div className="absolute inset-0 rounded-3xl blur-2xl" style={{ background:"rgba(147,51,234,0.3)", margin:"-16px" }}/>
          <div className="absolute inset-0 rounded-3xl border-2" style={{ borderColor:"#9333ea", boxShadow:"0 0 20px #9333ea", margin:"-2px" }}/>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/bblizzy-logo.png" alt="BBLIZZY" className="relative rounded-3xl"
            style={{ width:200, height:200, objectFit:"cover" }}/>
        </div>
        <div className="text-center">
          <div className="text-5xl tracking-[10px]" style={{
            background:"linear-gradient(to right, #c466ff, #701ac8)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            filter:"drop-shadow(0 0 18px rgba(147,51,234,0.8))", fontFamily:"Impact",
          }}>BBLIZZY</div>
          <div className="text-xs tracking-[6px] mt-2" style={{ color:"#7a5890", fontFamily:"Impact" }}>
            WHAT&apos;S IN THEM GENES
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Camera Modal ────────────────────────────────────────────────────────────
function CameraModal({ onCapture, onClose }: { onCapture: (file: File) => void; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false })
      .then(stream => {
        streamRef.current = stream;
        if (videoRef.current) { videoRef.current.srcObject = stream; setReady(true); }
      })
      .catch(() => setError("Camera access denied or not available."));
    return () => { streamRef.current?.getTracks().forEach(t => t.stop()); };
  }, []);

  const capture = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")!.drawImage(video, 0, 0);
    canvas.toBlob(blob => {
      if (!blob) return;
      onCapture(new File([blob], "capture.jpg", { type: "image/jpeg" }));
    }, "image/jpeg", 0.9);
  }, [onCapture]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background:"rgba(0,0,0,0.95)" }}>
      <div className="relative w-full max-w-lg">
        <button onClick={onClose} className="absolute top-3 right-3 z-10 text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full"
          style={{ background:"rgba(255,56,115,0.3)", border:"1px solid #ff3873" }}>✕</button>

        {error ? (
          <div className="flex flex-col items-center gap-4 p-8">
            <div className="text-lg tracking-widest" style={{ color:T.hot, fontFamily:"Impact" }}>CAMERA ERROR</div>
            <div className="text-sm" style={{ color:"#888" }}>{error}</div>
            <button onClick={onClose} className="px-6 py-2 rounded-xl text-sm tracking-widest"
              style={{ background:T.accent, color:"#fff", fontFamily:"Impact" }}>CLOSE</button>
          </div>
        ) : (
          <>
            <video ref={videoRef} autoPlay playsInline muted
              className="w-full rounded-2xl"
              style={{ border:`1.5px solid ${T.panelBorder}`, background:"#000", minHeight:300 }}/>
            {ready && (
              <button onClick={capture}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                style={{ background:T.neonGreen, boxShadow:`0 0 20px ${T.neonGreen}88` }}>
                📸
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────
function scoreColor(s: number) {
  return s < 30 ? T.neonGreen : s < 60 ? T.accent : T.hot;
}
function fmt(v: number) { return v.toFixed(2); }

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs tracking-widest shrink-0" style={{ color:"#666", fontFamily:"Impact" }}>{label}</span>
      <span className="text-sm font-bold text-right" style={{ color:"#fff", maxWidth:220 }}>{value}</span>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function Page() {
  const [entered, setEntered]       = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const [image, setImage]           = useState<string | null>(null);
  const [imageFile, setImageFile]   = useState<File | null>(null);
  const [refFrame, setRefFrame]     = useState<"Female"|"General">("Female");
  const [analyzing, setAnalyzing]   = useState(false);
  const [result, setResult]         = useState<AnalysisResult | null>(null);
  const [error, setError]           = useState<string | null>(null);
  const [phrase, setPhrase]         = useState(PHRASES[0]);
  const [phraseKey, setPhraseKey]   = useState(0);
  const [dragging, setDragging]     = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const fileInputRef  = useRef<HTMLInputElement>(null);
  const analysisAudio = useRef<HTMLAudioElement | null>(null);
  const phraseTimer   = useRef<ReturnType<typeof setInterval> | null>(null);
  const phraseIdx     = useRef(0);

  const stopPhraseCycle = useCallback(() => {
    if (phraseTimer.current) { clearInterval(phraseTimer.current); phraseTimer.current = null; }
  }, []);

  const startPhraseCycle = useCallback(() => {
    phraseIdx.current = 0;
    setPhrase(PHRASES[0]); setPhraseKey(k => k+1);
    phraseTimer.current = setInterval(() => {
      phraseIdx.current = (phraseIdx.current + 1) % PHRASES.length;
      setPhrase(PHRASES[phraseIdx.current]);
      setPhraseKey(k => k+1);
    }, 2200);
  }, []);

  const stopAnalysisAudio = useCallback(() => {
    analysisAudio.current?.pause();
    analysisAudio.current = null;
  }, []);

  const startAnalysisAudio = useCallback(() => {
    const a = new Audio("/blizzy-booty-boom.mp3");
    a.loop = true; a.volume = 0.85;
    a.play().catch(() => {});
    analysisAudio.current = a;
  }, []);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setImageFile(file); setResult(null); setError(null);
    setImage(URL.createObjectURL(file));
  }, []);

  const clearImage = useCallback(() => {
    setImage(null); setImageFile(null); setResult(null); setError(null);
  }, []);

  const runAnalysis = useCallback(async () => {
    if (!imageFile) return;
    setAnalyzing(true); setResult(null); setError(null);
    startPhraseCycle(); startAnalysisAudio();
    try {
      const b64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload  = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });
      const resp = await fetch("https://bblizzy-api-production.up.railway.app/analyze", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ image_b64:b64, reference_frame:refFrame }),
      });
      if (!resp.ok) throw new Error(`Server error ${resp.status}: ${await resp.text()}`);
      setResult(await resp.json());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setAnalyzing(false); stopPhraseCycle(); stopAnalysisAudio();
    }
  }, [imageFile, refFrame, startPhraseCycle, startAnalysisAudio, stopPhraseCycle, stopAnalysisAudio]);

  useEffect(() => () => { stopAnalysisAudio(); stopPhraseCycle(); }, [stopAnalysisAudio, stopPhraseCycle]);

  const onDragOver  = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);
  const onDrop      = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0]; if (f) handleFile(f);
  };

  const P = { background:T.panel, border:`1px solid ${T.panelBorder}`, borderRadius:12 };

  // ── Screens ────────────────────────────────────────────────────────────────
  if (!entered) return <TapToEnter onTap={() => setEntered(true)} />;
  if (!splashDone) return <Splash onDone={() => setSplashDone(true)} />;

  return (
    <div className="h-dvh w-full flex flex-col overflow-hidden" style={{
      background:`linear-gradient(135deg, ${T.bg} 0%, ${T.bgTop} 100%)`,
      color:"#fff", fontFamily:"Impact, 'Arial Narrow', Arial, sans-serif",
    }}>
      {/* Camera modal */}
      {showCamera && (
        <CameraModal
          onCapture={f => { handleFile(f); setShowCamera(false); }}
          onClose={() => setShowCamera(false)}
        />
      )}

      {/* Header */}
      <div className="sticky top-0 z-10 w-full flex items-center justify-center px-4 py-3" style={{
        background:"rgba(10,8,18,0.85)", backdropFilter:"blur(12px)",
        borderBottom:`1px solid ${T.panelBorder}`,
      }}>
        <span className="text-2xl tracking-[4px]" style={{
          background:`linear-gradient(to right, ${T.neonGreen}, ${T.accent})`,
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
        }}>BBLIZZY</span>
      </div>

      {/* Content — centered column, max 512px, scrollable */}
      <div className="flex-1 overflow-y-auto w-full flex flex-col items-center">
      <div className="w-full max-w-lg px-4 pb-8 pt-4 flex flex-col gap-5">

        {/* Photo Stage */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs tracking-widest" style={{ color:T.neonGreen }}>
            ✦ WHAT&apos;S IN THEM GENES
          </div>

          {/* Drop zone */}
          <div
            className="relative rounded-2xl overflow-hidden transition-all"
            style={{
              background:"#000",
              border:`1.5px solid ${dragging ? T.neonGreen : T.panelBorder}`,
              minHeight: image ? 380 : 280,
              boxShadow: dragging ? `0 0 20px ${T.neonGreen}44` : "none",
              cursor: image ? "default" : "pointer",
            }}
            onClick={() => !image && fileInputRef.current?.click()}
            onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
          >
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="Selected" className="w-full h-full object-contain" style={{ maxHeight:520 }}/>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-5 py-12">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/bblizzy-logo.png" alt="BBLIZZY" className="rounded-2xl icon-glow"
                  style={{ width:100, height:100, objectFit:"cover" }}/>
                <div className="text-center">
                  <div className="text-3xl tracking-[3px]">DROP THE SHOT</div>
                  <div className="text-xs tracking-[6px] mt-1" style={{ color:T.neonGreen }}>BLIZZY</div>
                  <div className="text-xs mt-3" style={{ color:"#555", fontFamily:"sans-serif" }}>drag &amp; drop or click to upload</div>
                </div>
              </div>
            )}
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value=""; }}/>

          {/* Gallery / Camera / Clear buttons */}
          <div className="flex gap-2">
            <button
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm tracking-widest hover:opacity-80 transition-opacity"
              style={{ background:`${T.accent}1e`, border:`1px solid ${T.accent}66`, color:T.accent }}
              onClick={() => fileInputRef.current?.click()}
            >📷 GALLERY</button>

            <button
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm tracking-widest hover:opacity-80 transition-opacity"
              style={{ background:`${T.accent}1e`, border:`1px solid ${T.accent}66`, color:T.accent }}
              onClick={() => setShowCamera(true)}
            >📸 CAMERA</button>

            {image && (
              <button
                className="flex items-center justify-center w-12 rounded-xl hover:opacity-80 transition-opacity text-lg"
                style={{ background:`${T.hot}1e`, border:`1px solid ${T.hot}66`, color:T.hot }}
                onClick={clearImage}
              >✕</button>
            )}
          </div>

          {/* Analyze */}
          {image && !analyzing && (
            <button
              className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl text-black text-xl tracking-[4px] pulse-analyze"
              style={{ background:`linear-gradient(to right, ${T.neonGreen}, #1ae55a)`, fontFamily:"Impact" }}
              onClick={runAnalysis}
            >🔥 ANALYZE 🔥</button>
          )}
        </div>

        {/* Reference Frame */}
        <div className="flex items-center gap-3 px-4 py-3" style={P}>
          <span className="text-xs tracking-widest" style={{ color:"#666" }}>REFERENCE</span>
          <div className="flex flex-1 gap-2">
            {(["Female","General"] as const).map(f => (
              <button key={f}
                className="flex-1 py-1.5 rounded-lg text-xs tracking-widest transition-all"
                style={{
                  background: refFrame===f ? T.accent : "transparent",
                  border:`1px solid ${refFrame===f ? T.accent : "#333"}`,
                  color: refFrame===f ? "#fff" : "#666",
                  fontFamily:"Impact",
                }}
                onClick={() => setRefFrame(f)}
              >{f.toUpperCase()}</button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {analyzing && (
          <div className="flex flex-col items-center gap-6 p-8 fade-in" style={P}>
            <div className="relative w-20 h-20">
              <svg className="absolute inset-0 w-full h-full spinner" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="36" fill="none" stroke={`${T.accent}33`} strokeWidth="4"/>
                <circle cx="40" cy="40" r="36" fill="none" stroke="url(#sg)" strokeWidth="4"
                  strokeLinecap="round" strokeDasharray="160 90"/>
                <defs>
                  <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={T.accent}/>
                    <stop offset="100%" stopColor={T.hot}/>
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-2xl">🔥</div>
            </div>
            <div className="text-center">
              <div key={phraseKey} className="text-lg tracking-widest phrase-in" style={{
                background:`linear-gradient(to right, ${T.neonGreen}, ${T.accent})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              }}>{phrase}</div>
              <div className="text-xs mt-1" style={{ color:"#555", fontFamily:"sans-serif" }}>AI analyzing your proportions</div>
            </div>
            <div className="flex items-end gap-1" style={{ height:36 }}>
              {["eq1","eq2","eq3","eq4","eq5","eq6","eq7"].map((cls,i) => (
                <div key={i} className={`${cls} w-1 rounded-sm`}
                  style={{ background:`linear-gradient(to top, ${T.accent}, ${T.hot})`, minHeight:8 }}/>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="flex flex-col gap-4 fade-in" style={P}>
            <div className="flex items-center gap-2 px-4 pt-4">
              <span style={{ color:T.accent }}>▮</span>
              <span className="text-sm tracking-[3px]" style={{ color:T.accent }}>RESULTS</span>
            </div>
            <div className="px-4 pb-4 flex flex-col gap-4">
              {/* Score */}
              <div className="rounded-xl p-4" style={{ background:`${T.accent}12`, border:`1px solid ${T.accent}44` }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex flex-col gap-1 text-xs">
                    <span style={{ color:T.neonGreen }}>🌿 0 = NATURAL</span>
                    <span style={{ color:T.hot }}>🔥 100 = BBLIZZY</span>
                  </div>
                  <div className="text-right">
                    <div className="text-6xl leading-none score-pop"
                      style={{ color:scoreColor(result.bblizzy_score), textShadow:`0 0 20px ${scoreColor(result.bblizzy_score)}99` }}>
                      {result.bblizzy_score}
                    </div>
                    <div className="text-xs tracking-widest mt-0.5" style={{ color:"#666" }}>BBLIZZY SCORE</div>
                  </div>
                </div>
                <div className="relative h-3.5 rounded-full overflow-hidden"
                  style={{ background:`linear-gradient(to right, ${T.neonGreen}33, ${T.accent}33, ${T.hot}33)` }}>
                  <div className="absolute left-0 top-0 h-full rounded-full"
                    style={{ width:`${result.bblizzy_score}%`, background:`linear-gradient(to right, ${T.neonGreen}, ${T.accent}, ${T.hot})`, minWidth:14 }}/>
                </div>
                <div className="flex justify-between text-xs mt-1 tracking-widest">
                  <span style={{ color:T.neonGreen }}>NATURAL</span>
                  <span style={{ color:T.hot }}>BBLIZZY</span>
                </div>
              </div>
              {/* Confidence */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs tracking-widest" style={{ color:"#666" }}>AI CONFIDENCE</span>
                  <span className="text-xl" style={{
                    color: result.confidence>70 ? T.neonGreen : result.confidence>40 ? T.neonYellow : T.hot,
                  }}>{result.confidence}%</span>
                </div>
                <div className="relative h-1.5 rounded-full" style={{ background:"rgba(255,255,255,0.08)" }}>
                  <div className="absolute left-0 top-0 h-full rounded-full" style={{
                    width:`${result.confidence}%`,
                    background: result.confidence>70 ? T.neonGreen : result.confidence>40 ? T.neonYellow : T.hot,
                  }}/>
                </div>
              </div>
              <div className="h-px" style={{ background:T.panelBorder }}/>
              <MetricRow label="PROFILE" value={result.profile}/>
              <MetricRow label="ANALYSIS NOTE" value={result.notes}/>
              <div className="h-px" style={{ background:T.panelBorder }}/>
              <div className="text-xs tracking-[3px]" style={{ color:`${T.accent}99` }}>ESTIMATED RATIOS</div>
              {result.shoulder_hip_ratio != null && <MetricRow label="SHOULDER / HIP" value={fmt(result.shoulder_hip_ratio!)}/>}
              {result.waist_hip_ratio    != null && <MetricRow label="WAIST / HIP"    value={fmt(result.waist_hip_ratio!)}/>}
              {result.glute_hip_ratio    != null && <MetricRow label="GLUTE / HIP"    value={fmt(result.glute_hip_ratio!)}/>}
              {result.thigh_knee_ratio   != null && <MetricRow label="THIGH / KNEE"   value={fmt(result.thigh_knee_ratio!)}/>}
              {result.thigh_hip_ratio    != null && <MetricRow label="THIGH / HIP"    value={fmt(result.thigh_hip_ratio!)}/>}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 p-4 rounded-xl fade-in"
            style={{ background:`${T.hot}1a`, border:`1px solid ${T.hot}55` }}>
            <span style={{ color:T.hot, fontSize:18 }}>✕</span>
            <div>
              <div className="text-sm tracking-widest" style={{ color:T.hot }}>ANALYSIS FAILED</div>
              <div className="text-xs mt-1" style={{ color:"#888", fontFamily:"sans-serif" }}>{error}</div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
