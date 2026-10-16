import React, { useEffect, useRef } from 'react';

/**
 * Architectural 3D Wireframe Cube & Neural Vortex Canvas for #philosophy
 * Replicates santalarch.com/#philosophy's #cubes-target sticky 3D geometry
 * Morphs across 3 stages:
 *  - Stage 0 (01 | 03 — Bold / Strategy): Monolithic Isometric Tesseract
 *  - Stage 1 (02 | 03 — Confident / Connected Systems): 5-Node Growth Matrix
 *  - Stage 2 (03 | 03 — Quiet / Practical AI): Harmonious Nested Autonomous Lattice
 */
export function PhilosophyCubesCanvas({ activeStage = 0, theme = 'light' }) {
  const canvasRef = useRef(null);
  const stageRef = useRef(activeStage);

  useEffect(() => {
    stageRef.current = activeStage;
  }, [activeStage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;
    let smoothStage = stageRef.current;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Base cube vertices [-1, 1]^3
    const baseVerts = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1]
    ];

    const edges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7]
    ];

    const rotate3D = (pt, rx, ry, rz) => {
      let [x, y, z] = pt;
      // Rotate X
      let y1 = y * Math.cos(rx) - z * Math.sin(rx);
      let z1 = y * Math.sin(rx) + z * Math.cos(rx);
      // Rotate Y
      let x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
      let z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
      // Rotate Z
      let x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz);
      let y3 = x2 * Math.sin(rz) + y1 * Math.cos(rz);
      return [x3, y3, z2];
    };

    const project = (pt, cx, cy, scale, fov = 520) => {
      const [x, y, z] = pt;
      const dist = fov / (fov + z * scale * 0.45);
      return [cx + x * scale * dist, cy + y * scale * dist, z];
    };

    const drawCube = (
      cx,
      cy,
      scale,
      rx,
      ry,
      rz,
      strokeColor,
      alpha,
      dash = [],
      drawNodes = false
    ) => {
      const projected = baseVerts.map((v) =>
        project(rotate3D(v, rx, ry, rz), cx, cy, scale)
      );

      ctx.save();
      ctx.strokeStyle = strokeColor;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = 1;
      ctx.setLineDash(dash);

      ctx.beginPath();
      edges.forEach(([i, j]) => {
        ctx.moveTo(projected[i][0], projected[i][1]);
        ctx.lineTo(projected[j][0], projected[j][1]);
      });
      ctx.stroke();

      if (drawNodes) {
        ctx.fillStyle = strokeColor;
        projected.forEach(([px, py]) => {
          ctx.fillRect(px - 2, py - 2, 4, 4);
        });
      }
      ctx.restore();
      return projected;
    };

    const render = () => {
      time += 0.0065;
      smoothStage += (stageRef.current - smoothStage) * 0.06;

      const width = canvas.width / Math.min(window.devicePixelRatio || 1, 2);
      const height = canvas.height / Math.min(window.devicePixelRatio || 1, 2);

      ctx.clearRect(0, 0, width, height);

      // Inside .philosophy-section, background is --c-dark-primary and text is --c-light-primary
      const isDarkSiteTheme =
        document.documentElement.getAttribute('data-theme') === 'dark';
      const wireColor = isDarkSiteTheme ? '#0f0f0f' : '#f0f0f0';

      const cx = width * (width > 1023 ? 0.34 : 0.5);
      const cy = height * 0.5;
      const baseRadius = Math.min(width, height) * 0.21;

      // Architectural crosshairs around center
      ctx.save();
      ctx.strokeStyle = wireColor;
      ctx.globalAlpha = 0.1;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 1.48, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.setLineDash([3, 6]);
      ctx.arc(cx, cy, baseRadius * 1.82, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Outer primary architectural cube
      const outerScale = baseRadius * (1 - smoothStage * 0.08);
      const outerVerts = drawCube(
        cx,
        cy,
        outerScale,
        0.48 + time * 0.55 + smoothStage * 0.4,
        0.62 + time * 0.75 + smoothStage * 0.6,
        0.15 + smoothStage * 0.25,
        wireColor,
        0.55,
        [],
        true
      );

      // Inner tesseract core (morphs scale & rotation based on smoothStage)
      const innerScale =
        baseRadius * (0.48 + Math.sin(time * 1.5) * 0.04 + smoothStage * 0.12);
      const innerVerts = drawCube(
        cx,
        cy,
        innerScale,
        -0.48 - time * 0.65 + smoothStage * 0.8,
        0.62 + time * 0.9 - smoothStage * 0.5,
        -0.25 + time * 0.3,
        wireColor,
        0.38,
        smoothStage > 1.3 ? [4, 4] : [],
        true
      );

      // Connect outer to inner vertices (tesseract struts)
      ctx.save();
      ctx.strokeStyle = wireColor;
      ctx.globalAlpha = 0.22;
      ctx.lineWidth = 0.85;
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        ctx.moveTo(outerVerts[i][0], outerVerts[i][1]);
        ctx.lineTo(innerVerts[i][0], innerVerts[i][1]);
      }
      ctx.stroke();
      ctx.restore();

      // Stage 1 & 2 Satellite Modular Cubes (representing connected systems & AI agents)
      const satelliteInfluence = Math.max(0, Math.min(1, smoothStage));
      if (satelliteInfluence > 0.02) {
        const satCount = 5;
        const labels = ['ATTRACT', 'ENGAGE', 'CONVERT', 'AUTOMATE', 'OPTIMIZE'];
        for (let s = 0; s < satCount; s++) {
          const angle = (s / satCount) * Math.PI * 2 + time * 0.45;
          const orbitRadius = baseRadius * (1.28 + (smoothStage - 1) * 0.18);
          const sx = cx + Math.cos(angle) * orbitRadius * satelliteInfluence;
          const sy =
            cy + Math.sin(angle) * orbitRadius * 0.62 * satelliteInfluence;

          drawCube(
            sx,
            sy,
            baseRadius * 0.18 * satelliteInfluence,
            time + s,
            -time * 1.2 + s,
            0.2,
            wireColor,
            0.42 * satelliteInfluence,
            [],
            false
          );

          // Connecting vector line to core
          ctx.save();
          ctx.strokeStyle = wireColor;
          ctx.globalAlpha = 0.16 * satelliteInfluence;
          ctx.setLineDash([2, 4]);
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(sx, sy);
          ctx.stroke();

          // Technical label
          ctx.fillStyle = wireColor;
          ctx.globalAlpha = 0.55 * satelliteInfluence;
          ctx.font = '500 9px "JetBrains Mono", monospace';
          ctx.fillText(`0${s + 1} ${labels[s]}`, sx + 14, sy + 3);
          ctx.restore();
        }
      }

      // Technical HUD readout in bottom-left of canvas
      ctx.save();
      ctx.fillStyle = wireColor;
      ctx.globalAlpha = 0.4;
      ctx.font = '400 10px "JetBrains Mono", monospace';
      const stageNames = [
        'SYS.01 // BOLD STRATEGY ARCHITECTURE',
        'SYS.02 // CONFIDENT CONNECTED SYSTEMS',
        'SYS.03 // QUIET AUTONOMOUS EXECUTION'
      ];
      ctx.fillText(
        stageNames[stageRef.current] || stageNames[0],
        cx - baseRadius * 1.35,
        cy + baseRadius * 1.68
      );
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  return (
    <div className="philosophy-canvas-wrap">
      <canvas ref={canvasRef} />
    </div>
  );
}
