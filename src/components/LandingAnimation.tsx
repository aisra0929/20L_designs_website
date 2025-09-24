import { useState, useEffect } from "react";

interface LandingAnimationProps {
  onComplete: () => void;
  darkMode?: boolean; // pass true for dark mode
}

const LandingAnimation = ({ onComplete, darkMode = false }: LandingAnimationProps) => {
  const [slideIn, setSlideIn] = useState(false);
  const [stage, setStage] = useState<"pause" | "fade" | "complete">("pause");

  useEffect(() => {
    setSlideIn(true);
    const isSmall = typeof window !== 'undefined' && window.innerWidth < 640;
    const pauseDuration = isSmall ? 5000 : 8000;

    const fadeTimer = setTimeout(() => setStage("fade"), pauseDuration);
    const completeTimer = setTimeout(() => {
      setStage("complete");
      onComplete();
    }, pauseDuration + 1000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (stage === "complete") return null;

  const israelLetters = ["I", "S", "R", "A", "E", "L"];
  const designsLetters = ["D", "E", "S", "I", "G", "N", "S"];

  const wordStyle = (isLeft: boolean) => ({
    transform: slideIn ? "translateX(0)" : isLeft ? "translateX(-120vw)" : "translateX(120vw)",
    transition: "transform 4000ms ease-in-out",
    opacity: stage === "fade" ? 0 : 1,
  });

  // Generate stars (fewer on small screens)
  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 640;
  const stars = Array.from({ length: isSmallScreen ? 30 : 50 }).map(() => ({
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
    size: Math.random() * 2 + 1 + "px",
    delay: Math.random() * 2000 + "ms",
    duration: 10 + Math.random() * 10 + "s",
  }));

  // Star color based on darkMode
  const starColor = darkMode ? "rgba(0,0,0,0.6)" : "#fff";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50 overflow-hidden px-4">
      {/* Stars */}
      {stars.map((star, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            backgroundColor: starColor,
            borderRadius: "50%",
            opacity: 0.6,
            animation: `blink ${star.duration} infinite alternate, drift ${star.duration} linear infinite`,
            animationDelay: star.delay,
          }}
        />
      ))}

      {/* Letters */}
      <div className="relative w-full flex justify-center items-center">
        <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-4 sm:gap-6">
          {/* ISRAEL */}
          <div
            className="flex space-x-1 sm:space-x-2 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
            style={wordStyle(true)}
          >
            {israelLetters.map((ch, idx) => (
              <span
                key={idx}
                style={{
                  transitionDelay: `${(israelLetters.length - idx - 1) * 150}ms`,
                  textShadow: "0 0 8px rgba(255,255,255,0.6), 0 0 16px rgba(255,255,255,0.3)",
                  animation: "pulse 2000ms ease-in-out infinite alternate",
                  animationDelay: `${idx * 150}ms`,
                }}
              >
                {ch}
              </span>
            ))}
          </div>

          {/* DESIGNS */}
          <div
            className="flex space-x-1 sm:space-x-2 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
            style={wordStyle(false)}
          >
            {designsLetters.map((ch, idx) => (
              <span
                key={idx}
                style={{
                  transitionDelay: `${idx * 150}ms`,
                  textShadow: "0 0 8px rgba(255,255,255,0.6), 0 0 16px rgba(255,255,255,0.3)",
                  animation: "pulse 2000ms ease-in-out infinite alternate",
                  animationDelay: `${idx * 150}ms`,
                }}
              >
                {ch}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes drift {
          0% { transform: translateY(0); }
          50% { transform: translateY(5px); }
          100% { transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default LandingAnimation;
