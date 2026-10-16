import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SantalSplitWords, SantalCommonNav } from './SantalSplitText';

gsap.registerPlugin(ScrollTrigger);

/**
 * Exact Santalarch `PageMainCubesScene` (#philosophy) 5-part scroll choreography:
 * - Top/bottom `.bg-line` shutter curtains (`scaleY: 0 -> 1`) closing at the end of `#hero`
 * - Part 1: Stepped 3D Cube Pyramid escalator + semicircle camera arc orbit (0,0,8 -> 0,25,-2.5) + damped pointer tilt
 * - Part 2: Outer pyramid layers dissolve & collapse Z into central reference cube
 * - Part 3: Camera descends into central cube top face (`fov -> 30`, `y -> 0`); `#cubes-video` dynamically resizes
 *           to exact projected 2D screen bounds of the cube's top face; Content 01/03 reveals via SantalSplitWords
 * - Part 4: Camera ascends (`y -> 150`) over 3D architectural perspective grid; `.cubes-bg` toggles `.white`
 *           (alabaster inversion); Content 02/03 & 03/03 swap in with SantalCommonNav (`01 | 03` -> `03 | 03`)
 * - Part 5: Grid dissolves into `#main-lines` and hands off seamlessly to `#approach`
 */
const FRONT_WORDS = [
  'STRATEGY',
  'DEFINES',
  'INTELLIGENCE',
  'REFINES',
  'ARCHITECTURE',
  'SCALES'
];
const SIDE_WORDS = ['WE', 'BUILD', 'WE', 'MARKET', 'WE', 'GROW'];

function createCubeFaceTexture(frontWord, sideWord, theme = 'light') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const isDark = theme === 'dark';
  // Plane fill + subtle architectural border + crisp word typography
  ctx.fillStyle = isDark ? 'rgba(240, 240, 240, 0.08)' : 'rgba(17, 17, 17, 0.78)';
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = isDark ? 'rgba(240, 240, 240, 0.32)' : 'rgba(242, 242, 240, 0.28)';
  ctx.lineWidth = 3;
  ctx.strokeRect(1.5, 1.5, 509, 509);

  // Diagonal architectural hairline
  ctx.strokeStyle = isDark ? 'rgba(240, 240, 240, 0.09)' : 'rgba(242, 242, 240, 0.09)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, 512);
  ctx.lineTo(512, 0);
  ctx.stroke();

  // Centered monumental word (matches Troika 3D text on Santalarch cube faces)
  ctx.fillStyle = isDark ? '#0f0f0f' : '#f0f0f0';
  ctx.font = '600 48px "Inter", -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(frontWord, 256, 256);

  // Top-left & bottom-right technical coordinates
  ctx.font = '500 17px "JetBrains Mono", monospace';
  ctx.fillStyle = isDark ? 'rgba(15, 15, 15, 0.55)' : 'rgba(240, 240, 240, 0.5)';
  ctx.textAlign = 'left';
  ctx.fillText(sideWord, 26, 36);
  ctx.textAlign = 'right';
  ctx.fillText('AXON // SYS', 486, 482);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 4;
  return tex;
}

export function PhilosophyThreeScene({ theme = 'light', philosophyData }) {
  const wrapRef = useRef(null);
  const bgRef = useRef(null);
  const targetRef = useRef(null);
  const videoWrapRef = useRef(null);
  const videoInnerRef = useRef(null);
  const videoCanvasRef = useRef(null);
  const videoGradientsRef = useRef(null);
  const contentBgRef = useRef(null);
  const gridBgRef = useRef(null);
  const navContainerRef = useRef(null);

  const [activeContentId, setActiveContentId] = useState(0);
  const [isWhiteStage, setIsWhiteStage] = useState(false);

  const contents = philosophyData?.stages || [
    {
      id: '01',
      caption: 'Perception',
      title: 'Why Most Digital Efforts Underperform',
      body: 'Many businesses invest heavily in digital, yet still struggle to generate consistent growth. Traffic comes in, but conversions stay low. Leads are generated, but follow-up is slow. AxonVortex solves this by connecting strategy, execution, automation and optimization into one digital growth ecosystem.'
    },
    {
      id: '02',
      caption: 'Integration',
      title: 'Where Strategy, Creativity, AI & Technology Work Together',
      body: 'Modern growth does not happen in silos. Your brand positioning affects your ad performance. Your website affects your conversion rate. Your CRM and follow-up workflows affect your sales pipeline. Every layer supports the next.'
    },
    {
      id: '03',
      caption: 'Velocity',
      title: 'Compounding Revenue Architecture',
      body: 'From technical SEO and paid acquisition to autonomous AI agents and custom web platforms, every surface is engineered to reduce friction, accelerate response times, and compound measurable ROI.'
    }
  ];

  // Live interactive Neural Growth Engine inside `#cubes-video` (Santalarch's inner-cube video canvas)
  useEffect(() => {
    const canvas = videoCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let progressRef = { value: 0 };
    canvas._setProgress = (p) => {
      progressRef.value = p;
    };

    const renderRoom = (now) => {
      const t = now * 0.0008 + progressRef.value * 4.5;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Architectural dark/light room atmosphere inside the reference cube
      const grad = ctx.createRadialGradient(
        w * 0.5,
        h * 0.5,
        w * 0.05,
        w * 0.5,
        h * 0.5,
        w * 0.65
      );
      grad.addColorStop(0, '#232321');
      grad.addColorStop(0.55, '#141413');
      grad.addColorStop(1, '#0b0b0b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.5;

      // Architectural perspective room lines & sacred concentric rings
      ctx.strokeStyle = 'rgba(242, 242, 240, 0.14)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 7; i++) {
        const r = i * (w * 0.062) * (0.88 + 0.12 * Math.sin(t + i * 0.4));
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();

        // Nested architectural square frames rotating subtly with scroll progress
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * 0.12 * (i % 2 === 0 ? 1 : -1) + i * 0.08);
        ctx.strokeRect(-r * 0.72, -r * 0.72, r * 1.44, r * 1.44);
        ctx.restore();
      }

      // Orbiting data nodes along the architectural rings
      for (let i = 0; i < 18; i++) {
        const angle = (i / 18) * Math.PI * 2 + t * 0.45;
        const radius = w * (0.14 + (i % 4) * 0.08);
        const nx = cx + Math.cos(angle) * radius;
        const ny = cy + Math.sin(angle) * radius;
        ctx.fillStyle = 'rgba(242, 242, 240, 0.68)';
        ctx.beginPath();
        ctx.arc(nx, ny, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(renderRoom);
    };

    raf = requestAnimationFrame(renderRoom);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const wrapEl = wrapRef.current;
    const bgEl = bgRef.current;
    const targetEl = targetRef.current;
    const videoWrapEl = videoWrapRef.current;
    const videoInnerEl = videoInnerRef.current;
    const videoCanvasEl = videoCanvasRef.current;
    const videoGradientsEl = videoGradientsRef.current;
    const contentBgEl = contentBgRef.current;
    const gridBgEl = gridBgRef.current;
    const navContainerEl = navContainerRef.current;

    if (!wrapEl || !targetEl) return;

    const sizes = {
      width: targetEl.clientWidth || window.innerWidth,
      height: targetEl.clientHeight || window.innerHeight
    };

    const scene = new THREE.Scene();

    // Camera setup matching Santalarch `Ra`: cameraRadius = 8, cameraElevation = 25, unzoomTo = 0.6
    const cameraRadius = 8;
    const cameraElevation = 25;
    const unzoomTo = 0.6;
    const camera = new THREE.PerspectiveCamera(
      45,
      sizes.width / sizes.height,
      0.1,
      250
    );
    camera.position.set(0, 0, cameraRadius);
    const cameraTarget = new THREE.Vector3(0, 0, 0);
    camera.lookAt(cameraTarget);
    const viewCamera = camera.clone();

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    targetEl.innerHTML = '';
    targetEl.appendChild(renderer.domElement);

    // 1. Build Stepped 3D Architectural Cube Pyramid (`Hi()` in santal_cubes.js)
    const pyramidGroup = new THREE.Group();
    pyramidGroup.position.set(0, -1.6, 0.25);
    scene.add(pyramidGroup);

    const layerConfigs = [
      { y: -2, cols: 1, depth: 1, baseOpacity: 0.25, shouldHide: true },
      { y: -1, cols: 3, depth: 2, baseOpacity: 0.55, shouldHide: true },
      { y: 0, cols: 5, depth: 3, baseOpacity: 0.9, shouldHide: false },
      { y: 1, cols: 3, depth: 3, baseOpacity: 1.0, shouldHide: false },
      { y: 2, cols: 1, depth: 1, baseOpacity: 1.0, shouldHide: false, isReference: true },
      { y: 3, cols: 3, depth: 2, baseOpacity: 0.75, shouldHide: true },
      { y: 4, cols: 5, depth: 2, baseOpacity: 0.45, shouldHide: true }
    ];

    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    const edgesGeo = new THREE.EdgesGeometry(boxGeo);
    const layers = [];
    const allDisposables = [boxGeo, edgesGeo];
    let referenceCube = null;

    layerConfigs.forEach((cfg, lIdx) => {
      const layerGroup = new THREE.Group();
      const absY = Math.abs(cfg.y);
      const zOffset =
        absY === 0
          ? 0
          : -(
              0.25 * Math.min(absY, 1) +
              0.5 * Math.min(Math.max(absY - 1, 0), 1) +
              1.0 * Math.max(absY - 2, 0)
            );
      layerGroup.position.set(0, cfg.y, zOffset);
      layerGroup.userData = {
        layerIndex: cfg.y,
        basePosition: layerGroup.position.clone(),
        baseOpacity: cfg.baseOpacity,
        shouldHide: cfg.shouldHide,
        materials: [],
        lineMaterials: [],
        columnGroups: []
      };

      const halfCol = Math.floor(cfg.cols / 2);
      for (let c = -halfCol; c <= halfCol; c++) {
        const colGroup = new THREE.Group();
        const absC = Math.abs(c);
        let colZ = 0;
        for (let dStep = 1; dStep <= absC; dStep++) {
          colZ -= 0.25 * Math.min(Math.ceil(dStep / 2), 4);
        }
        colGroup.position.set(c, 0, colZ);
        layerGroup.add(colGroup);
        layerGroup.userData.columnGroups.push(colGroup);

        for (let d = 0; d < cfg.depth; d++) {
          const cubeGroup = new THREE.Group();
          cubeGroup.position.set(0, 0, -d);

          const wordIdx = (lIdx * 3 + Math.abs(c) + d) % FRONT_WORDS.length;
          const tex = createCubeFaceTexture(
            FRONT_WORDS[wordIdx],
            SIDE_WORDS[wordIdx],
            theme
          );
          const faceMat = new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true,
            opacity: 0
          });
          const wireMat = new THREE.LineBasicMaterial({
            color: theme === 'dark' ? 0xf0f0f0 : 0xdadada,
            transparent: true,
            opacity: 0
          });

          const mesh = new THREE.Mesh(boxGeo, faceMat);
          const wire = new THREE.LineSegments(edgesGeo, wireMat);
          cubeGroup.add(mesh);
          cubeGroup.add(wire);
          colGroup.add(cubeGroup);

          layerGroup.userData.materials.push(faceMat);
          layerGroup.userData.lineMaterials.push(wireMat);
          allDisposables.push(tex, faceMat, wireMat);

          if (cfg.isReference && c === 0 && d === 0) {
            referenceCube = cubeGroup;
          }
        }
      }

      pyramidGroup.add(layerGroup);
      layers.push(layerGroup);
    });

    // 2. Build 3D Architectural Grid Floor (`this.grid = Hn()` in santal_cubes.js)
    const gridGroup = new THREE.Group();
    gridGroup.position.set(0, -3.5, -2.5);
    const gridHelper = new THREE.GridHelper(
      95,
      48,
      theme === 'dark' ? 0x3a3a3a : 0xc8c8c4,
      theme === 'dark' ? 0x242424 : 0xdadada
    );
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0;
    gridGroup.add(gridHelper);
    scene.add(gridGroup);

    // 3. Semicircle Camera Arc Math (Exact `getPointOnSemicircle2D` & `applyScrollCameraArcPhase` from santal_cubes.js)
    const arcStartPos = new THREE.Vector3(0, 0, cameraRadius);
    const arcEndPos = new THREE.Vector3(0, cameraElevation, -2.5);
    const arcStartTarget = new THREE.Vector3(0, 0, 0);
    const arcEndTarget = new THREE.Vector3(0, 2, -2.5);
    const arcUpStart = new THREE.Vector3(0, 1, 0);
    const arcEndQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(-Math.PI / 2, 0, Math.PI, 'XYZ')
    );
    const arcUpEnd = new THREE.Vector3(0, 1, 0).applyQuaternion(arcEndQuat);

    const getPointOnSemicircle2D = (x1, z1, x2, z2, t, dir = -1) => {
      const cx = (x1 + x2) * 0.5;
      const cz = (z1 + z2) * 0.5;
      const dx = x1 - cx;
      const dz = z1 - cz;
      const angle = Math.PI * t * dir;
      return {
        x: cx + dx * Math.cos(angle) - dz * Math.sin(angle),
        z: cz + dx * Math.sin(angle) + dz * Math.cos(angle)
      };
    };

    const applyScrollCameraArcPhase = (progress, zoomVal) => {
      const pt = getPointOnSemicircle2D(
        arcStartPos.x,
        arcStartPos.z,
        arcEndPos.x,
        arcEndPos.z,
        progress,
        -1
      );
      camera.position.x = pt.x;
      camera.position.y = THREE.MathUtils.lerp(
        arcStartPos.y,
        arcEndPos.y,
        progress
      );
      camera.position.z = pt.z;
      cameraTarget.lerpVectors(arcStartTarget, arcEndTarget, progress);
      camera.up.lerpVectors(arcUpStart, arcUpEnd, progress).normalize();
      camera.lookAt(cameraTarget);

      const dist = Math.max(
        camera.position.distanceTo(cameraTarget),
        cameraRadius * 0.25
      );
      camera.fov = THREE.MathUtils.radToDeg(
        2 * Math.atan(3.2 / (zoomVal * dist))
      );
      camera.updateProjectionMatrix();
    };

    // 4. Projected 2D Screen Bounds of Reference Cube Top Face (`getCubeTopFaceScreenRect` in santal_cubes.js)
    const topFaceCorners = [
      new THREE.Vector3(-0.5, 0.5, -0.5),
      new THREE.Vector3(0.5, 0.5, -0.5),
      new THREE.Vector3(0.5, 0.5, 0.5),
      new THREE.Vector3(-0.5, 0.5, 0.5)
    ];
    const projScratch = new THREE.Vector3();

    const updateVideoSizeFromCube = (zoomProgress) => {
      if (!videoInnerEl || !referenceCube) return;
      const w = videoWrapEl?.clientWidth || sizes.width;
      const h = videoWrapEl?.clientHeight || sizes.height;
      camera.updateMatrixWorld();
      pyramidGroup.updateMatrixWorld(true);
      referenceCube.updateMatrixWorld(true);

      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      for (const corner of topFaceCorners) {
        projScratch.copy(corner).applyMatrix4(referenceCube.matrixWorld).project(camera);
        const sx = (projScratch.x * 0.5 + 0.5) * w;
        const sy = (-projScratch.y * 0.5 + 0.5) * h;
        minX = Math.min(minX, sx);
        maxX = Math.max(maxX, sx);
        minY = Math.min(minY, sy);
        maxY = Math.max(maxY, sy);
      }

      const rectW = Math.min(Math.max(maxX - minX, w * zoomProgress), w);
      const rectH = Math.min(Math.max(maxY - minY, h * zoomProgress), h);
      videoInnerEl.style.width = `${rectW}px`;
      videoInnerEl.style.height = `${rectH}px`;
      if (videoCanvasEl?._setProgress) {
        videoCanvasEl._setProgress(zoomProgress);
      }
    };

    // 5. Damped Pointer Tilt (`pointerTilt` + `tiltWeight` in santal_cubes.js)
    let targetMouseX = 0;
    let targetMouseY = 0;
    let curMouseX = 0;
    let curMouseY = 0;
    const tiltWeight = { value: 1 };

    const onPointerMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onPointerMove, { passive: true });

    // Render loop
    let rafId;
    const draw = () => {
      curMouseX += (targetMouseX - curMouseX) * 0.06;
      curMouseY += (targetMouseY - curMouseY) * 0.06;

      viewCamera.copy(camera);
      viewCamera.position.x += curMouseX * 0.85 * tiltWeight.value;
      viewCamera.position.y += -curMouseY * 0.55 * tiltWeight.value;
      viewCamera.lookAt(cameraTarget);

      renderer.render(scene, viewCamera);
      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    // 6. Build the 5-Part GSAP ScrollTrigger Master Timeline
    const ctx = gsap.context(() => {
      const bgLines = bgEl?.querySelectorAll('.santal-bg-line');
      const heroEl = document.getElementById('hero');

      // Shutter curtains scaleY(0 -> 1) right as #hero finishes (`createWordRevealScrollTween`)
      if (bgLines?.length && heroEl) {
        gsap.fromTo(
          bgLines,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heroEl,
              start: 'bottom 95%',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapEl,
          start: 'top 5%',
          end: 'bottom bottom',
          scrub: 0.65
        }
      });

      // PART 1 (`0.0 -> 3.5`): Reveal pyramid & step layers upward while camera orbits on semicircle arc
      const allFaceMats = layers.flatMap((l) => l.userData.materials);
      const allLineMats = layers.flatMap((l) => l.userData.lineMaterials);

      masterTl.to(
        allFaceMats,
        { opacity: 0.88, duration: 0.6, ease: 'power2.in' },
        0
      );
      masterTl.to(
        allLineMats,
        { opacity: 0.72, duration: 0.6, ease: 'power2.out' },
        0
      );

      // Stepwise pyramid escalator + camera semicircle orbit
      const arcProxy = { value: 0, zoom: 1 };
      masterTl.to(
        arcProxy,
        {
          value: 1,
          zoom: unzoomTo,
          duration: 3.2,
          ease: 'none',
          onUpdate: () => {
            applyScrollCameraArcPhase(arcProxy.value, arcProxy.zoom);
            tiltWeight.value = Math.max(0, 1 - arcProxy.value);
          }
        },
        0.25
      );

      layers.forEach((layer) => {
        masterTl.to(
          layer.position,
          {
            y: layer.userData.basePosition.y + 1.8,
            duration: 2.6,
            ease: 'none'
          },
          0.25
        );
      });

      // PART 2 (`2.8 -> 4.2`): Hide outer pyramid layers & collapse Z into central reference cube
      const hiddenLayers = layers.filter((l) => l.userData.shouldHide);
      const visibleLayers = layers.filter((l) => !l.userData.shouldHide);

      hiddenLayers.forEach((l) => {
        masterTl.to(
          [...l.userData.materials, ...l.userData.lineMaterials],
          { opacity: 0, duration: 0.9, ease: 'power2.out' },
          2.8
        );
      });

      visibleLayers.forEach((l) => {
        l.userData.columnGroups.forEach((col) => {
          masterTl.to(
            col.position,
            { z: 0, duration: 1.1, ease: 'power2.in' },
            2.8
          );
        });
      });

      // PART 3 (`3.8 -> 7.0`): Descend into reference cube top face, expand `#cubes-video`, reveal Content 01/03
      const zoomCubeProxy = { value: 0 };
      masterTl.to(
        camera.position,
        {
          y: 1.8,
          duration: 2.2,
          ease: 'none',
          onUpdate: () => camera.lookAt(cameraTarget)
        },
        3.8
      );
      masterTl.to(
        camera,
        {
          fov: 28,
          duration: 2.2,
          ease: 'none',
          onUpdate: () => camera.updateProjectionMatrix()
        },
        3.8
      );
      masterTl.to(
        videoWrapEl,
        { opacity: 1, duration: 1.2, ease: 'none' },
        4.1
      );
      masterTl.to(
        zoomCubeProxy,
        {
          value: 1,
          duration: 2.4,
          ease: 'none',
          onUpdate: () => updateVideoSizeFromCube(zoomCubeProxy.value)
        },
        4.1
      );
      if (videoGradientsEl) {
        masterTl.to(
          videoGradientsEl,
          { opacity: 0, duration: 0.5, ease: 'power2.in' },
          5.2
        );
      }

      // Fade out remaining cube faces & reveal Content 01/03 + CommonNav (`01 | 03`)
      visibleLayers.forEach((l) => {
        masterTl.to(
          [...l.userData.materials, ...l.userData.lineMaterials],
          { opacity: 0, duration: 0.6, ease: 'power2.out' },
          5.8
        );
      });
      masterTl.to(
        [contentBgEl, navContainerEl],
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        5.8
      );
      masterTl.call(() => setActiveContentId(0), [], 5.8);

      // PART 4 (`7.4 -> 11.2`): Ascend into 3D Perspective Grid, toggle `.white` backdrop, reveal Content 02/03 & 03/03
      masterTl.to(
        zoomCubeProxy,
        {
          value: 0.35,
          duration: 1.4,
          ease: 'none',
          onUpdate: () => updateVideoSizeFromCube(zoomCubeProxy.value)
        },
        7.4
      );
      masterTl.to(
        videoWrapEl,
        { opacity: 0, duration: 1.1, ease: 'power2.out' },
        7.7
      );
      masterTl.to(
        camera.position,
        {
          y: 28,
          duration: 2.2,
          ease: 'power1.inOut',
          onUpdate: () => camera.lookAt(cameraTarget)
        },
        7.6
      );
      masterTl.to(
        gridHelper.material,
        { opacity: 0.55, duration: 1.0, ease: 'power2.out' },
        7.8
      );
      masterTl.to(
        gridBgEl,
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        8.2
      );
      masterTl.call(
        () => {
          setActiveContentId(1);
          setIsWhiteStage(false);
        },
        [],
        8.3
      );

      // Switch to Stage 03/03 and toggle `.white` background (`this.cubesBgEl.classList.toggle("white")`)
      masterTl.call(
        () => {
          setIsWhiteStage(true);
          setActiveContentId(2);
        },
        [],
        9.8
      );
      masterTl.to(
        gridBgEl,
        { opacity: 0, duration: 0.6, ease: 'power2.out' },
        9.8
      );

      // PART 5 (`11.2 -> 12.2`): Dissolve 3D grid & seamlessly hand off to `#approach`
      masterTl.to(
        gridHelper.material,
        { opacity: 0, duration: 0.9, ease: 'power2.out' },
        11.2
      );
      masterTl.to(
        [contentBgEl, navContainerEl],
        { opacity: 0, duration: 0.6, ease: 'power2.out' },
        11.5
      );
    }, wrapEl);

    const onResize = () => {
      sizes.width = targetEl.clientWidth || window.innerWidth;
      sizes.height = targetEl.clientHeight || window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    };
    window.addEventListener('resize', onResize);

    return () => {
      ctx.revert();
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);
      allDisposables.forEach((d) => d.dispose?.());
      gridHelper.geometry.dispose();
      gridHelper.material.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <section
      ref={wrapRef}
      id="philosophy"
      className="santal-cubes-wrap"
      style={{ '--height': '780lvh' }}
    >
      {/* Sticky Top/Bottom Shutter Curtains (.cubes-bg & .bg-line) */}
      <div className="santal-bg-wrap">
        <div
          ref={bgRef}
          id="cubes-bg"
          className={`santal-cubes-bg ${isWhiteStage ? 'white' : ''}`}
        >
          <div className="santal-bg-line santal-bg-line--top" />
          <div className="santal-bg-line santal-bg-line--bottom" />
        </div>
      </div>

      {/* Three.js Stepped 3D Cube Pyramid + Perspective Grid Target */}
      <div ref={targetRef} id="cubes-target" className="santal-cubes-target" />

      {/* Inner Reference Cube Top-Face Canvas (#cubes-video) */}
      <div ref={videoWrapRef} className="santal-video-wrap">
        <div ref={videoInnerRef} className="santal-video-inner">
          <canvas
            ref={videoCanvasRef}
            id="cubes-video"
            width={1080}
            height={1080}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
          <div ref={videoGradientsRef} className="santal-video-gradients">
            <div className="santal-video-gradient santal-video-gradient--1" />
            <div className="santal-video-gradient santal-video-gradient--2" />
            <div className="santal-video-gradient santal-video-gradient--3" />
            <div className="santal-video-gradient santal-video-gradient--4" />
          </div>
        </div>
      </div>

      {/* Content Overlays (01/03, 02/03, 03/03) with SantalSplitWords */}
      <div id="cubes-content-wrap" className="santal-cubes-content-wrap">
        <div
          ref={contentBgRef}
          id="cubes-content-bg"
          className="santal-cubes-content-bg"
        >
          <div ref={gridBgRef} id="grid-bg" className="santal-grid-bg" />
          <div className="santal-cubes-content-lines">
            <div className="santal-cubes-content-lines__v" />
            <div className="santal-cubes-content-lines__h" />
          </div>
        </div>

        {contents.map((item, idx) => {
          const isActive = activeContentId === idx;
          const isThird = idx === 2;
          return (
            <div
              key={item.id || idx}
              className={`arch-grid santal-cubes-content content-${idx + 1} ${
                isThird && isWhiteStage ? 'is-dark-text' : ''
              }`}
              style={{
                pointerEvents: isActive ? 'auto' : 'none'
              }}
            >
              <h2
                className="t-h2 santal-cubes-content__title"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(14px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease'
                }}
              >
                {item.title}
              </h2>
              <div className="santal-cubes-content__desc">
                <SantalSplitWords
                  text={item.body}
                  active={isActive}
                  className="t-body-lg"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom-Right Difference-Blend CommonNav (`PHILOSOPHY  01 | 03`) */}
      <div
        ref={navContainerRef}
        id="cubes-nav"
        className="arch-grid santal-cubes-nav-container"
      >
        <div className="santal-cubes-nav-pos">
          <SantalCommonNav
            title="PHILOSOPHY"
            data={contents}
            activeId={activeContentId}
          />
        </div>
      </div>
    </section>
  );
}
