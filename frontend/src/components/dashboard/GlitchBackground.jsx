import React, { useRef, useEffect, useState, startTransition } from "react";

export default function GlitchBackground(props) {
  const {
    customCharacters = "",
    glitchColors = ["#3D5E37", "#3ADEC0", "#39DB3C"],
    glitchSpeed = 50,
    centerVignette = false,
    outerVignette = true,
    smooth = true,
    oneOff = false,
    animationEasing = "linear",
    density = 0.05,
    randomizeColor = false,
    style
  } = props;

  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const letters = useRef([]);
  const grid = useRef({ columns: 0, rows: 0 });
  const context = useRef(null);
  const lastGlitchTime = useRef(Date.now());
  const [hasAnimated, setHasAnimated] = useState(false);
  const isStatic = false; // Mock framer's useIsStaticRenderer

  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;

  const defaultLettersAndSymbols = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")",
    "_", "+", "|", "\\", "-", "=", "{", "}", "[", "]",
    ":", ";", "'", '"', "<", ">", "?", ",", ".", "/",
    "~", "`"
  ];

  const lettersAndSymbols = customCharacters.trim()
    ? [...new Set(customCharacters.split("").filter(char => char.trim() !== ""))]
    : defaultLettersAndSymbols;

  const getRandomChar = () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
  const getRandomColor = () => glitchColors[Math.floor(Math.random() * glitchColors.length)];

  const hexToRgb = hex => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const interpolateColor = (start, end, factor) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor)
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
  };

  const calculateGrid = (width, height) => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
  };

  const initializeLetters = (columns, rows) => {
    grid.current = { columns, rows };
    const totalLetters = columns * rows;
    letters.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1
    }));
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = 0, height = 0;
    if (typeof window !== "undefined") {
      if (props.style && props.style.width && props.style.height) {
        if (typeof props.style.width === "number") width = props.style.width;
        else if (typeof props.style.width === "string" && props.style.width.endsWith("px")) width = parseFloat(props.style.width);
        else width = canvas.parentElement ? canvas.parentElement.offsetWidth : 0;

        if (typeof props.style.height === "number") height = props.style.height;
        else if (typeof props.style.height === "string" && props.style.height.endsWith("px")) height = parseFloat(props.style.height);
        else height = canvas.parentElement ? canvas.parentElement.offsetHeight : 0;
      } else if (canvas.parentElement) {
        width = canvas.parentElement.offsetWidth;
        height = canvas.parentElement.offsetHeight;
      }
    }

    if (width === 0 || height === 0) {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
    }

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const { columns, rows } = calculateGrid(width, height);
    initializeLetters(columns, rows);
    drawLetters();
  };

  const drawLetters = () => {
    if (!context.current || letters.current.length === 0) return;
    const ctx = context.current;
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;

    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = "top";

    letters.current.forEach((letter, index) => {
      const x = (index % grid.current.columns) * charWidth;
      const y = Math.floor(index / grid.current.columns) * charHeight;
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, x, y);
    });
  };

  const updateLetters = () => {
    if (!letters.current || letters.current.length === 0) return;
    const updateCount = Math.max(1, Math.floor(letters.current.length * density));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      if (!letters.current[index]) continue;

      letters.current[index].char = getRandomChar();
      letters.current[index].targetColor = getRandomColor();

      if (!smooth) {
        letters.current[index].color = letters.current[index].targetColor;
        letters.current[index].colorProgress = 1;
      } else {
        letters.current[index].colorProgress = 0;
      }
    }
  };

  const handleSmoothTransitions = () => {
    let needsRedraw = false;
    letters.current.forEach(letter => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05;
        if (letter.colorProgress > 1) letter.colorProgress = 1;
        const startRgb = hexToRgb(letter.color);
        const endRgb = hexToRgb(letter.targetColor);
        if (startRgb && endRgb) {
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);
          needsRedraw = true;
        }
      }
    });

    if (needsRedraw) {
      drawLetters();
    }
  };

  const animate = () => {
    if (isStatic) return;
    if (oneOff && hasAnimated) return;

    const now = Date.now();
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTime.current = now;
      if (oneOff) startTransition(() => setHasAnimated(true));
    }

    if (smooth) {
      handleSmoothTransitions();
    }

    if (!oneOff || !hasAnimated) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (isStatic) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      context.current = canvas.getContext("2d");
      resizeCanvas();
      return;
    }

    setHasAnimated(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    context.current = canvas.getContext("2d");
    resizeCanvas();
    animate();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        cancelAnimationFrame(animationRef.current);
        resizeCanvas();
        animate();
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [glitchSpeed, smooth, oneOff, isStatic, customCharacters]);

  useEffect(() => {
    if (randomizeColor) {
      const randomHex = () => {
        const hex = Math.floor(Math.random() * 16777215).toString(16);
        return `#${"000000".substring(0, 6 - hex.length) + hex}`;
      };
      if (glitchColors.length > 0) {
        const idx = Math.floor(Math.random() * glitchColors.length);
        const newColors = [...glitchColors];
        newColors[idx] = randomHex();
      }
    }
  }, [randomizeColor]);

  useEffect(() => {
    if (!letters.current || letters.current.length === 0) return;
    for (let i = 0; i < letters.current.length; i++) {
      if (!glitchColors.includes(letters.current[i].color)) {
        letters.current[i].color = getRandomColor();
      }
      letters.current[i].targetColor = getRandomColor();
    }
    drawLetters();
  }, [glitchColors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    context.current = canvas.getContext("2d");
    resizeCanvas();
  }, [glitchColors, style?.width, style?.height]);

  const containerStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
    overflow: "hidden",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "stretch",
    zIndex: -1,
    opacity: 0.2, // Toned down to act as a background
    pointerEvents: "none",
    ...style
  };

  const canvasStyle = {
    display: "block",
    width: "100%",
    height: "100%"
  };

  const outerVignetteStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    background: "radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)"
  };

  const centerVignetteStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    background: "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)"
  };

  return (
    <div style={containerStyle}>
      <canvas ref={canvasRef} style={canvasStyle} />
      {outerVignette && <div style={outerVignetteStyle} />}
      {centerVignette && <div style={centerVignetteStyle} />}
    </div>
  );
}
