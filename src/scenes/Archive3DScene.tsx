import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Release } from '../data/releases';
import { ExternalLink, Play, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, X, Disc3, Sparkles } from 'lucide-react';

interface Archive3DSceneProps {
  releases: Release[];
  selectedRelease: Release | null;
  onSelectRelease: (release: Release) => void;
  activeFilter: string;
}

export default function Archive3DScene({
  releases,
  selectedRelease,
  onSelectRelease,
  activeFilter,
}: Archive3DSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRelease, setActiveRelease] = useState<Release | null>(selectedRelease);
  const [hoveredRelease, setHoveredRelease] = useState<Release | null>(null);

  const propsRef = useRef({ releases, onSelectRelease, activeFilter });
  useEffect(() => {
    propsRef.current = { releases, onSelectRelease, activeFilter };
  }, [releases, onSelectRelease, activeFilter]);

  // Sync external selectedRelease
  useEffect(() => {
    setActiveRelease(selectedRelease);
  }, [selectedRelease]);

  // Controls accessible from UI buttons
  const controlsRef = useRef<{
    next: () => void;
    prev: () => void;
    zoomIn: () => void;
    zoomOut: () => void;
    reset: () => void;
    focusHit: () => void;
    focusLatest: () => void;
  }>({
    next: () => {},
    prev: () => {},
    zoomIn: () => {},
    zoomOut: () => {},
    reset: () => {},
    focusHit: () => {},
    focusLatest: () => {},
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Three.js Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020206, 0.007);

    const isMobile = container.clientWidth < 768;
    const baseFov = isMobile ? 55 : 44;
    const initialZoom = isMobile ? 38 : 31;

    const camera = new THREE.PerspectiveCamera(
      baseFov,
      container.clientWidth / container.clientHeight,
      0.1,
      300
    );
    camera.position.set(0, 0, initialZoom);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // --- Dynamic Cosmic Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const magentaLight = new THREE.PointLight(0xd946ef, 5.0, 120);
    magentaLight.position.set(25, 20, 30);
    scene.add(magentaLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 4.5, 120);
    cyanLight.position.set(-25, -15, 30);
    scene.add(cyanLight);

    const spotlight = new THREE.SpotLight(0xffffff, 4.0, 80, Math.PI / 6, 0.4);
    spotlight.position.set(0, 15, 35);
    scene.add(spotlight);

    // --- Starry Nebula Ambient Particles ---
    const starCount = 650;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const c1 = new THREE.Color(0x38bdf8);
    const c2 = new THREE.Color(0xd946ef);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 160;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 120;
      const c = Math.random() > 0.5 ? c1 : c2;
      starColors[i * 3] = c.r;
      starColors[i * 3 + 1] = c.g;
      starColors[i * 3 + 2] = c.b;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // --- Card Meshes Group ---
    const helixGroup = new THREE.Group();
    scene.add(helixGroup);

    const textureLoader = new THREE.TextureLoader();
    const loadedTextures: THREE.Texture[] = [];

    // Helper: generate procedural fallback texture if image load fails
    const createFallbackTexture = (rel: Release): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      const [g1, g2, g3] = rel.coverGradient || ['#060814', '#160b2e', '#3b0764'];
      const grad = ctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0, g1);
      grad.addColorStop(0.5, g2);
      grad.addColorStop(1, g3);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(rel.title, 256, 256);
      ctx.font = '20px monospace';
      ctx.fillStyle = '#c084fc';
      ctx.fillText(rel.artist, 256, 300);

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    interface HelixCard {
      mesh: THREE.Mesh;
      release: Release;
      targetPos: THREE.Vector3;
      targetRot: THREE.Euler;
      angle: number;
      index: number;
    }

    const cardMeshes: HelixCard[] = [];
    const cardList = propsRef.current.releases;
    const total = cardList.length;

    // Card dimensions
    const cardWidth = 4.2;
    const cardHeight = 4.2;
    const cardDepth = 0.12;
    const boxGeometry = new THREE.BoxGeometry(cardWidth, cardHeight, cardDepth);

    // Chrono-Helix positioning:
    // Spiral advancing in 3D: radius, vertical elevation, and rotation
    const baseRadius = isMobile ? 14 : 17;
    const heightSpan = 14;

    cardList.forEach((rel, index) => {
      // Determine texture
      let texture: THREE.Texture;
      if (rel.coverImage) {
        texture = textureLoader.load(
          rel.coverImage,
          (t) => {
            t.colorSpace = THREE.SRGBColorSpace;
          },
          undefined,
          () => {
            // Fallback on error
            const fb = createFallbackTexture(rel);
            materials[4].map = fb;
            materials[4].needsUpdate = true;
          }
        );
      } else {
        texture = createFallbackTexture(rel);
      }
      loadedTextures.push(texture);

      // Card Materials: front has cover, sides dark glass
      const edgeMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x060814,
        roughness: 0.2,
        metalness: 0.9,
      });

      const frontMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.25,
        metalness: 0.1,
      });

      const backMaterial = new THREE.MeshStandardMaterial({
        color: 0x0a0c18,
        roughness: 0.4,
      });

      const materials = [
        edgeMaterial, // right
        edgeMaterial, // left
        edgeMaterial, // top
        edgeMaterial, // bottom
        frontMaterial, // front
        backMaterial, // back
      ];

      const mesh = new THREE.Mesh(boxGeometry, materials);

      // Outer Neon Glass Glow Wireframe
      const outlineGeo = new THREE.EdgesGeometry(boxGeometry);
      const isPopular = rel.popular || rel.id === 'memory-reboot';
      const isLatest = rel.latest || rel.id === 'genesis';
      const outlineColor = isPopular ? 0xf59e0b : isLatest ? 0xd946ef : 0x38bdf8;

      const outlineMat = new THREE.LineBasicMaterial({
        color: outlineColor,
        transparent: true,
        opacity: 0.65,
        linewidth: 1.5,
      });
      const outlineMesh = new THREE.LineSegments(outlineGeo, outlineMat);
      mesh.add(outlineMesh);

      // Helix coordinates calculation:
      // Index 0 (Genesis 2026) -> Front
      // Last Index (2020) -> Back
      const normalizedIdx = (index - total / 2) / total;
      const angle = normalizedIdx * Math.PI * 2.8;
      const radius = baseRadius + Math.sin(index * 0.4) * 0.8;
      const x = Math.sin(angle) * radius;
      const z = -Math.cos(angle) * radius + (baseRadius * 0.55);
      const y = -normalizedIdx * heightSpan;

      const targetPos = new THREE.Vector3(x, y, z);
      const targetRot = new THREE.Euler(0, -angle, 0);

      // Initial collapsed position for scroll-reveal
      mesh.position.set(0, 0, -40);
      mesh.scale.set(0.01, 0.01, 0.01);
      mesh.rotation.copy(targetRot);

      (mesh as any).userData = { release: rel, index };
      helixGroup.add(mesh);

      cardMeshes.push({
        mesh,
        release: rel,
        targetPos,
        targetRot,
        angle,
        index,
      });
    });

    // --- Interactive Orbit & Drag Physics ---
    let isDragging = false;
    let prevPointer = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };
    const currentRotation = { x: 0, y: 0 };
    let targetZoom = initialZoom;
    let currentZoom = initialZoom;

    // Reveal animation progression (0 -> 1)
    let revealProgress = 0;
    let isRevealed = false;

    // Check if container is in viewport to trigger reveal
    const checkVisibility = () => {
      const rect = container.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
        isRevealed = true;
      }
    };
    window.addEventListener('scroll', checkVisibility, { passive: true });
    checkVisibility();

    // Register UI Controls
    controlsRef.current = {
      next: () => {
        targetRotation.y -= (Math.PI * 2.8) / total;
      },
      prev: () => {
        targetRotation.y += (Math.PI * 2.8) / total;
      },
      zoomIn: () => {
        targetZoom = Math.max(16, targetZoom - 4);
      },
      zoomOut: () => {
        targetZoom = Math.min(48, targetZoom + 4);
      },
      reset: () => {
        targetRotation.x = 0;
        targetRotation.y = 0;
        targetZoom = initialZoom;
      },
      focusHit: () => {
        const hit = cardMeshes.find((c) => c.release.id === 'memory-reboot' || c.release.popular);
        if (hit) {
          targetRotation.y = hit.angle;
          targetRotation.x = 0;
          targetZoom = isMobile ? 26 : 22;
          setActiveRelease(hit.release);
          propsRef.current.onSelectRelease(hit.release);
        }
      },
      focusLatest: () => {
        const latest = cardMeshes.find((c) => c.release.id === 'genesis' || c.release.latest);
        if (latest) {
          targetRotation.y = latest.angle;
          targetRotation.x = 0;
          targetZoom = isMobile ? 26 : 22;
          setActiveRelease(latest.release);
          propsRef.current.onSelectRelease(latest.release);
        }
      },
    };

    const raycaster = new THREE.Raycaster();

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevPointer = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - prevPointer.x;
        const deltaY = clientY - prevPointer.y;

        targetRotation.y += deltaX * 0.005;
        targetRotation.x += deltaY * 0.0025;
        targetRotation.x = Math.max(-0.35, Math.min(0.35, targetRotation.x));

        prevPointer = { x: clientX, y: clientY };
      }

      // Raycast Hover (Mouse only)
      if (!('touches' in e)) {
        const rect = container.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const my = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(new THREE.Vector2(mx, my), camera);
        const intersects = raycaster.intersectObjects(cardMeshes.map((c) => c.mesh));

        if (intersects.length > 0) {
          const hit = intersects[0].object as THREE.Mesh;
          const rel = (hit as any).userData?.release as Release;
          if (rel) {
            setHoveredRelease(rel);
            container.style.cursor = 'pointer';
          }
        } else {
          setHoveredRelease(null);
          container.style.cursor = isDragging ? 'grabbing' : 'grab';
        }
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      container.style.cursor = 'grab';
    };

    const onWheel = (e: WheelEvent) => {
      // Zoom or rotate spiral
      e.preventDefault();
      targetRotation.y -= e.deltaY * 0.0025;
    };

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const my = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(new THREE.Vector2(mx, my), camera);
      const intersects = raycaster.intersectObjects(cardMeshes.map((c) => c.mesh));

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const clicked = (hit as any).userData?.release as Release;
        if (clicked) {
          setActiveRelease(clicked);
          propsRef.current.onSelectRelease(clicked);

          // Smoothly align camera to clicked release
          const cardData = cardMeshes.find((c) => c.release.id === clicked.id);
          if (cardData) {
            targetRotation.y = cardData.angle;
            targetZoom = isMobile ? 26 : 22;
          }
        }
      }
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('click', onClick);
    container.addEventListener('wheel', onWheel, { passive: false });

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const mob = w < 768;
      camera.fov = mob ? 55 : 44;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // --- 60 FPS Animation Loop ---
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth Reveal Animation
      if (isRevealed && revealProgress < 1) {
        revealProgress = Math.min(1, revealProgress + 0.025);
      }

      // Smooth inertia
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.07;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.07;
      currentZoom += (targetZoom - currentZoom) * 0.07;
      camera.position.z = currentZoom;

      // Group rotation
      helixGroup.rotation.y = currentRotation.y;
      helixGroup.rotation.x = currentRotation.x;

      // Gentle ambient floating wave & reveal lerp
      cardMeshes.forEach((card, i) => {
        const floatOffset = Math.sin(elapsed * 1.5 + i * 0.4) * 0.15;

        // Position interpolation from singularity to spiral
        card.mesh.position.x = card.targetPos.x * revealProgress;
        card.mesh.position.y = (card.targetPos.y + floatOffset) * revealProgress;
        card.mesh.position.z = -40 * (1 - revealProgress) + card.targetPos.z * revealProgress;

        const isAct = activeRelease?.id === card.release.id;
        const isHov = hoveredRelease?.id === card.release.id;

        const targetScale = isAct ? 1.25 : isHov ? 1.12 : 1.0;
        card.mesh.scale.setScalar(targetScale * revealProgress);

        // Highlight spotlight position if active
        if (isAct) {
          const worldPos = new THREE.Vector3();
          card.mesh.getWorldPosition(worldPos);
          spotlight.target.position.copy(worldPos);
          spotlight.target.updateMatrixWorld();
        }
      });

      // Starfield slow orbit
      starPoints.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', checkVisibility);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('click', onClick);
      container.removeEventListener('wheel', onWheel);

      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', onResize);

      boxGeometry.dispose();
      starGeo.dispose();
      starMat.dispose();
      loadedTextures.forEach((t) => t.dispose());
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '600px',
        borderRadius: '24px',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 50%, #060714 0%, #020206 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8), inset 0 0 100px rgba(0,0,0,0.8)',
      }}
    >
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          position: 'relative',
        }}
      />

      {/* Top Bar: Telemetry & Status Indicator */}
      <div
        style={{
          position: 'absolute',
          top: '1.25rem',
          left: '1.25rem',
          right: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.5rem 1rem',
            borderRadius: '100px',
            background: 'rgba(5, 7, 16, 0.75)',
            border: '1px solid rgba(217, 70, 239, 0.3)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#d946ef',
              boxShadow: '0 0 10px #d946ef',
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.72rem',
              color: '#ffffff',
              letterSpacing: '0.1em',
              fontWeight: 600,
            }}
          >
            ХРОНО-СПИРАЛЬ ДИСКОГРАФИИ // 31 РЕЛИЗ
          </span>
        </div>

        {/* Quick Jump Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            pointerEvents: 'auto',
          }}
        >
          <button
            onClick={() => controlsRef.current.focusLatest()}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              background: 'rgba(217, 70, 239, 0.2)',
              border: '1px solid rgba(217, 70, 239, 0.4)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.72rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <Sparkles size={11} color="var(--neon-magenta)" />
            <span>2026 GENESIS</span>
          </button>

          <button
            onClick={() => controlsRef.current.focusHit()}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              color: '#f59e0b',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.72rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            MEMORY REBOOT
          </button>
        </div>
      </div>

      {/* Floating 3D Navigation Controls Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 0.85rem',
          borderRadius: '100px',
          background: 'rgba(7, 9, 20, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.7)',
          zIndex: 10,
        }}
      >
        <button
          onClick={() => controlsRef.current.prev()}
          aria-label="Предыдущий релиз"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            padding: '0.4rem',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
          }}
        >
          <ChevronLeft size={18} />
        </button>

        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            color: 'var(--text-dim)',
            padding: '0 0.5rem',
          }}
        >
          ВРАЩЕНИЕ
        </span>

        <button
          onClick={() => controlsRef.current.next()}
          aria-label="Следующий релиз"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            padding: '0.4rem',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
          }}
        >
          <ChevronRight size={18} />
        </button>

        <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.15)', margin: '0 0.25rem' }} />

        <button
          onClick={() => controlsRef.current.zoomIn()}
          aria-label="Приблизить"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--electric-blue)',
            padding: '0.4rem',
            cursor: 'pointer',
            display: 'flex',
          }}
        >
          <ZoomIn size={16} />
        </button>

        <button
          onClick={() => controlsRef.current.zoomOut()}
          aria-label="Отдалить"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--electric-blue)',
            padding: '0.4rem',
            cursor: 'pointer',
            display: 'flex',
          }}
        >
          <ZoomOut size={16} />
        </button>

        <button
          onClick={() => controlsRef.current.reset()}
          aria-label="Сброс положения"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            padding: '0.4rem',
            cursor: 'pointer',
            display: 'flex',
          }}
        >
          <RotateCcw size={15} />
        </button>
      </div>

      {/* Spotlight Inspection Card (When a release is active) */}
      {activeRelease && (
        <div
          style={{
            position: 'absolute',
            bottom: '4.8rem',
            left: 'clamp(1rem, 3vw, 2rem)',
            maxWidth: '380px',
            width: 'calc(100% - 2rem)',
            padding: '1.25rem',
            borderRadius: '18px',
            background: 'rgba(8, 10, 22, 0.92)',
            border: '1px solid rgba(217, 70, 239, 0.45)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 15px 40px rgba(0,0,0,0.8), 0 0 35px rgba(217, 70, 239, 0.2)',
            zIndex: 15,
            animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
                }}
              >
                <img
                  src={activeRelease.coverImage || `/covers/${activeRelease.id}.jpg`}
                  alt={activeRelease.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.68rem',
                    color: 'var(--neon-magenta)',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {activeRelease.type} // {activeRelease.year}
                </span>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.2,
                  }}
                >
                  {activeRelease.title}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  {activeRelease.artist}
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveRelease(null)}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                borderRadius: '50%',
                color: '#ffffff',
                padding: '0.35rem',
                cursor: 'pointer',
                display: 'flex',
              }}
            >
              <X size={14} />
            </button>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', gap: '0.65rem', marginTop: '1rem' }}>
            {activeRelease.links.spotify && (
              <a
                href={activeRelease.links.spotify}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem',
                  borderRadius: '8px',
                  background: 'rgba(29, 185, 84, 0.18)',
                  border: '1px solid rgba(29, 185, 84, 0.4)',
                  color: '#1ed760',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <span>SPOTIFY</span>
                <ExternalLink size={12} />
              </a>
            )}

            <button
              onClick={() => propsRef.current.onSelectRelease(activeRelease)}
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                padding: '0.55rem',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(217, 70, 239, 0.4) 100%)',
                border: '1px solid rgba(217, 70, 239, 0.4)',
                color: '#ffffff',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Play size={12} />
              <span>ДЕТАЛИ РЕЛИЗА</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
