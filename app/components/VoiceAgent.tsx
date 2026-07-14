"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const INTRO_TEXT = `Hey there! I'm Atharv C. Joshi — an AI and Machine Learning Engineer currently pursuing my B.Tech in Artificial Intelligence and Machine Learning at D.Y. Patil Agriculture and Technical University, Kolhapur, graduating in May 2027.

I build end-to-end intelligent systems that actually ship. My work spans healthcare AI, legal technology, autonomous robotics, and generative AI.

Some of my key projects include SvasthaAI — a full-stack health operating system with RAG-powered medical analysis and multi-organ clinical inference. Then there's ALIS — an AI Legal Intelligence System using transformer-based NLP and OCR workflows. I've also built an autonomous surveillance rover on ROS2 that competed at IIT Madras and COEP Pune.

My core tech stack includes Python, PyTorch, ROS2, FastAPI, LangChain, Docker, and AWS. I care deeply about production-grade, deployable AI — not just research demos.

I'm a national-level competitor and was recognized as Cyber Suraksha Warrior of the Year 2025. I'm currently open to internships, research opportunities, and project collaborations.

Feel free to reach out — let's build something extraordinary together!`;

// Preferred male voice names ranked by quality
const PREFERRED_VOICES = [
  "Google UK English Male",
  "Microsoft David",
  "Microsoft Mark",
  "Google US English",
  "Daniel",
  "David",
  "Mark",
  "James",
  "Alex",
  "english-us",
  "en-US",
  "en-GB",
];

function getPreferredVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  // Try to find a male voice by matching preferred names
  for (const pref of PREFERRED_VOICES) {
    const match = voices.find(
      (v) =>
        v.name.toLowerCase().includes(pref.toLowerCase()) &&
        !v.name.toLowerCase().includes("female") &&
        !v.name.toLowerCase().includes("zira") &&
        !v.name.toLowerCase().includes("hazel") &&
        !v.name.toLowerCase().includes("susan")
    );
    if (match) return match;
  }

  // Fallback: any English male voice
  const englishVoices = voices.filter(
    (v) =>
      v.lang.startsWith("en") &&
      !v.name.toLowerCase().includes("female") &&
      !v.name.toLowerCase().includes("zira") &&
      !v.name.toLowerCase().includes("hazel") &&
      !v.name.toLowerCase().includes("susan") &&
      !v.name.toLowerCase().includes("jenny")
  );
  if (englishVoices.length > 0) return englishVoices[0];

  // Ultimate fallback: any English voice
  const anyEnglish = voices.find((v) => v.lang.startsWith("en"));
  return anyEnglish || voices[0] || null;
}

export default function VoiceAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [voiceReady, setVoiceReady] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) setVoiceReady(true);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Animate waveform bars
  useEffect(() => {
    if (!barsRef.current) return;
    const bars = barsRef.current.children;
    if (isPlaying && !isPaused) {
      for (let i = 0; i < bars.length; i++) {
        const bar = bars[i] as HTMLElement;
        bar.style.animationPlayState = "running";
      }
    } else {
      for (let i = 0; i < bars.length; i++) {
        const bar = bars[i] as HTMLElement;
        bar.style.animationPlayState = "paused";
      }
    }
  }, [isPlaying, isPaused]);

  const startSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    if (intervalRef.current) clearInterval(intervalRef.current);

    const utterance = new SpeechSynthesisUtterance(INTRO_TEXT);
    const voices = window.speechSynthesis.getVoices();
    const voice = getPreferredVoice(voices);
    if (voice) utterance.voice = voice;

    // Human-like settings
    utterance.rate = 0.92;
    utterance.pitch = 0.95;
    utterance.volume = 1;

    utterance.onboundary = (event) => {
      if (event.name === "word") {
        const word = INTRO_TEXT.substring(
          event.charIndex,
          event.charIndex + event.charLength
        );
        setCurrentWord(word);
        const pct = (event.charIndex / INTRO_TEXT.length) * 100;
        setProgress(Math.min(pct, 100));
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      setCurrentWord("");
      if (intervalRef.current) clearInterval(intervalRef.current);
      // Reset progress after a brief delay
      setTimeout(() => setProgress(0), 1500);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentWord("");
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
    setProgress(0);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (!isPlaying) {
      startSpeaking();
    } else if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isPlaying, isPaused, startSpeaking]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    setCurrentWord("");
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const togglePanel = useCallback(() => {
    if (isOpen) {
      stopSpeaking();
    }
    setIsOpen((prev) => !prev);
  }, [isOpen, stopSpeaking]);

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={togglePanel}
        aria-label="Voice introduction"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 9000,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          border: isOpen
            ? "1px solid rgba(0,245,255,0.6)"
            : "1px solid rgba(0,245,255,0.3)",
          background: isOpen
            ? "rgba(0,245,255,0.15)"
            : "linear-gradient(135deg, rgba(0,245,255,0.1), rgba(139,92,246,0.1))",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isOpen
            ? "0 0 40px rgba(0,245,255,0.25), inset 0 0 20px rgba(0,245,255,0.08)"
            : "0 0 24px rgba(0,245,255,0.15)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          animation: !isOpen ? "voicePulse 3s ease-in-out infinite" : "none",
        }}
      >
        {isOpen ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--cyan)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--cyan)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "6rem",
            right: "2rem",
            zIndex: 8999,
            width: "340px",
            borderRadius: "16px",
            overflow: "hidden",
            animation: "voicePanelIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both",
            border: "1px solid rgba(0,245,255,0.15)",
            background: "rgba(10,10,24,0.92)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,245,255,0.06)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "1.1rem 1.25rem 0.8rem",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              background:
                "linear-gradient(135deg, rgba(0,245,255,0.04), rgba(139,92,246,0.03))",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "rgba(0,245,255,0.08)",
                  border: "1px solid rgba(0,245,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  flexShrink: 0,
                }}
              >
                🎙️
              </div>
              <div>
                <p
                  style={{
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    margin: 0,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Voice Introduction
                </p>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.68rem",
                    margin: 0,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.04em",
                  }}
                >
                  AI-powered · Atharv C. Joshi
                </p>
              </div>
            </div>
          </div>

          {/* Waveform visualizer */}
          <div
            style={{
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {/* Waveform bars */}
            <div
              ref={barsRef}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "3px",
                height: "48px",
                width: "100%",
              }}
            >
              {Array.from({ length: 32 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: "4px",
                    borderRadius: "2px",
                    background:
                      isPlaying && !isPaused
                        ? `linear-gradient(to top, var(--cyan), var(--purple))`
                        : "rgba(0,245,255,0.12)",
                    height: isPlaying && !isPaused ? undefined : "4px",
                    animation:
                      isPlaying && !isPaused
                        ? `waveBar 0.${3 + (i % 7)}s ease-in-out infinite alternate`
                        : "none",
                    animationDelay: `${i * 0.04}s`,
                    transition: "height 0.3s ease, background 0.3s ease",
                  }}
                />
              ))}
            </div>

            {/* Current word display */}
            <div
              style={{
                height: "1.6rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {isPlaying && currentWord && (
                <span
                  style={{
                    color: "var(--cyan)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                    opacity: 0.7,
                    letterSpacing: "0.05em",
                    animation: "wordFade 0.15s ease both",
                  }}
                >
                  {currentWord}
                </span>
              )}
              {!isPlaying && (
                <span
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  {voiceReady
                    ? "Press play to hear my intro"
                    : "Loading voice engine..."}
                </span>
              )}
            </div>

            {/* Progress bar */}
            <div
              style={{
                width: "100%",
                height: "3px",
                background: "rgba(255,255,255,0.04)",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, var(--cyan), var(--purple))",
                  borderRadius: "999px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>

            {/* Controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginTop: "0.25rem",
              }}
            >
              {/* Stop button */}
              <button
                onClick={stopSpeaking}
                disabled={!isPlaying}
                aria-label="Stop"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.03)",
                  cursor: isPlaying ? "pointer" : "default",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: isPlaying ? 1 : 0.3,
                  transition: "all 0.2s",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="var(--text-secondary)"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                </svg>
              </button>

              {/* Play / Pause button */}
              <button
                onClick={togglePlayPause}
                disabled={!voiceReady}
                aria-label={isPlaying && !isPaused ? "Pause" : "Play"}
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  border: "1px solid rgba(0,245,255,0.4)",
                  background:
                    "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(139,92,246,0.1))",
                  cursor: voiceReady ? "pointer" : "default",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 20px rgba(0,245,255,0.12)",
                  transition: "all 0.3s",
                  opacity: voiceReady ? 1 : 0.5,
                }}
                onMouseEnter={(e) => {
                  if (voiceReady) {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 32px rgba(0,245,255,0.25)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(0,245,255,0.7)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 20px rgba(0,245,255,0.12)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(0,245,255,0.4)";
                }}
              >
                {isPlaying && !isPaused ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="var(--cyan)"
                  >
                    <rect x="5" y="3" width="5" height="18" rx="1" />
                    <rect x="14" y="3" width="5" height="18" rx="1" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="var(--cyan)"
                    style={{ marginLeft: "2px" }}
                  >
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                )}
              </button>

              {/* Restart button */}
              <button
                onClick={startSpeaking}
                disabled={!voiceReady}
                aria-label="Restart"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.03)",
                  cursor: voiceReady ? "pointer" : "default",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: voiceReady ? 1 : 0.3,
                  transition: "all 0.2s",
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--text-secondary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
              </button>
            </div>
          </div>

          {/* Footer info */}
          <div
            style={{
              padding: "0.6rem 1.25rem",
              borderTop: "1px solid rgba(255,255,255,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                color: "var(--text-muted)",
                fontSize: "0.62rem",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Web Speech API
            </span>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: voiceReady ? "var(--green)" : "var(--orange)",
                  display: "inline-block",
                  animation: voiceReady ? "none" : "blink 1s step-end infinite",
                }}
              />
              <span
                style={{
                  color: voiceReady ? "var(--green)" : "var(--orange)",
                  fontSize: "0.62rem",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.04em",
                }}
              >
                {voiceReady ? "Ready" : "Loading"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
