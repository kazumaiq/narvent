import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Release } from '../data/releases';
import { ExternalLink, Play, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, X, Disc3 } from 'lucide-react';

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

  // Sync external selectedRelease with internal activeRelease
  useEffect(() => {
    setActiveRelease(selectedRelease);
  }, [selectedRelease]);

  // Refs for camera controls outside Three loop
  const controlsRef = useRef<{
    next: () => void;
    prev: () => void;
    zoomIn: () => void;
    zoomOut: () => void;
    reset: () => void;
  }>({
    next: () => {},
    prev: () => {},
    zoomIn: () => {},
    zoomOut: () => {},
    reset: () => {},
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020206, 0.008);

    const isMobile = container.clientWidth < 768;
    const baseFov = isMobile ? 55 : 45;
    const initialZoom = isMobile ? 38 : 32;

    const camera = new THREE.PerspectiveCamera(
      baseFov,
      container.clientWidth / container.clientHeight,
      0.1,
      250
    );
    camera.position.set(0, 0, initialZoom);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // --- Dynamic Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const magentaLight = new THREE.PointLight(0xd946ef, 4.0, 100);
    magentaLight.position.set(25, 18, 30);
    scene.add(magentaLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 3.8, 100);
    cyanLight.position.set(-25, -12, 30);
    scene.add(cyanLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1.5);
    frontLight.position.set(0, 10, 35);
    scene.add(frontLight);

    // --- Bespoke Cover Art Generation (Unique to each release, no repeated fake diamonds!) ---
    const createBespokeCoverTexture = (rel: Release): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 640;
      const ctx = canvas.getContext('2d')!;

      const [c1, c2, c3] = rel.coverGradient || ['#060814', '#160b2e', '#3b0764'];

      // Deep atmospheric background
      const grad = ctx.createLinearGradient(0, 0, 640, 640);
      grad.addColorStop(0, c1);
      grad.addColorStop(0.5, c2);
      grad.addColorStop(1, c3);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 640, 640);

      // Unique bespoke thematic art per release
      if (rel.id === 'memory-reboot') {
        // Nocturnal city silhouette with rain & gold neon
        ctx.fillStyle = 'rgba(255, 209, 102, 0.15)';
        ctx.beginPath();
        ctx.arc(320, 260, 130, 0, Math.PI * 2);
        ctx.fill();

        // City skyline silhouettes
        ctx.fillStyle = '#020206';
        ctx.fillRect(100, 240, 60, 180);
        ctx.fillRect(180, 200, 75, 220);
        ctx.fillRect(280, 160, 80, 260);
        ctx.fillRect(380, 210, 70, 210);
        ctx.fillRect(470, 250, 70, 170);

        // Neon horizon line
        ctx.strokeStyle = '#ffd166';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(40, 390);
        ctx.lineTo(600, 390);
        ctx.stroke();

        // RIAA Gold Ribbon Badge
        ctx.fillStyle = '#ffd166';
        ctx.font = '700 18px "JetBrains Mono", monospace';
        ctx.fillText('★ RIAA CERTIFIED GOLD ★', 45, 425);
      } else if (rel.id === 'insomnia') {
        // Crescent moon and darkwave mist
        ctx.fillStyle = '#d946ef';
        ctx.beginPath();
        ctx.arc(320, 240, 100, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = c2;
        ctx.beginPath();
        ctx.arc(350, 220, 95, 0, Math.PI * 2);
        ctx.fill();

        // Horizontal sound waves
        ctx.strokeStyle = 'rgba(217, 70, 239, 0.4)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.arc(320, 240, 120 + i * 20, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else if (rel.id === 'fainted') {
        // High speed drift phonk lines
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 4;
        for (let i = 0; i < 8; i++) {
          ctx.beginPath();
          ctx.moveTo(80 + i * 60, 140);
          ctx.lineTo(160 + i * 60, 380);
          ctx.stroke();
        }
      } else if (rel.id === 'her-eyes') {
        // Ethereal eyes contour & violet neon
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 3.5;
        // Left eye
        ctx.beginPath();
        ctx.ellipse(220, 250, 65, 30, 0, 0, Math.PI * 2);
        ctx.stroke();
        // Right eye
        ctx.beginPath();
        ctx.ellipse(420, 250, 65, 30, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#ec4899';
        ctx.beginPath();
        ctx.arc(220, 250, 15, 0, Math.PI * 2);
        ctx.arc(420, 250, 15, 0, Math.PI * 2);
        ctx.fill();
      } else if (rel.id === 'genesis') {
        // Monumental monolithic frame
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 4;
        ctx.strokeRect(180, 140, 280, 260);
        ctx.strokeRect(210, 170, 220, 200);

        ctx.fillStyle = '#ffffff';
        ctx.font = '700 20px "JetBrains Mono", monospace';
        ctx.fillText('17-TRACK MAGNUM OPUS', 190, 430);
      } else {
        // Geometric abstract wave contours unique to each track
        const seed = rel.year + rel.title.length;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 60; x <= 580; x += 15) {
          const y = 260 + Math.sin(x * 0.03 + seed) * 70;
          if (x === 60) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Accent glowing circle
        ctx.fillStyle = c3;
        ctx.beginPath();
        ctx.arc(320, 260, 50, 0, Math.PI * 2);
        ctx.fill();
      }

      // Card Header
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 24px "Space Grotesk", sans-serif';
      ctx.fillText('NARVENT', 45, 65);

      ctx.fillStyle = 'rgba(148, 163, 184, 0.95)';
      ctx.font = '600 16px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`${rel.type === 'album' ? 'АЛЬБОМ' : rel.type === 'ep' ? 'EP' : 'СИНГЛ'} // ${rel.year}`, 595, 65);

      // Card Title & Artist Footer
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 36px "Space Grotesk", sans-serif';
      let title = rel.title;
      if (title.length > 20) title = title.substring(0, 18) + '...';
      ctx.fillText(title, 45, 520);

      ctx.fillStyle = 'rgba(203, 213, 225, 0.85)';
      ctx.font = '500 22px "Manrope", sans-serif';
      const artistLine = rel.featuring ? `${rel.artist} ft. ${rel.featuring.join(', ')}` : rel.artist;
      let displayArtist = artistLine;
      if (displayArtist.length > 26) displayArtist = displayArtist.substring(0, 24) + '...';
      ctx.fillText(displayArtist, 45, 560);

      // Outer border frame
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, 636, 636);

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      return texture;
    };

    // --- Spatial 3D Architecture ---
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    const cardGeometry = new THREE.BoxGeometry(6.4, 6.4, 0.35);

    const cardMeshes: {
      mesh: THREE.Mesh;
      release: Release;
      basePos: THREE.Vector3;
      baseRot: THREE.Euler;
      texture: THREE.CanvasTexture;
      angle: number;
    }[] = [];

    const total = releases.length;
    const arcRadius = isMobile ? 14 : 20;

    releases.forEach((rel, index) => {
      const texture = createBespokeCoverTexture(rel);

      const edgeMaterial = new THREE.MeshStandardMaterial({
        color: 0x070814,
        metalness: 0.9,
        roughness: 0.15,
      });

      const frontMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.25,
        roughness: 0.35,
        emissive: new THREE.Color(0x0a0b1e),
        emissiveIntensity: 0.35,
      });

      const materials = [
        edgeMaterial,
        edgeMaterial,
        edgeMaterial,
        edgeMaterial,
        frontMaterial,
        edgeMaterial,
      ];

      const mesh = new THREE.Mesh(cardGeometry, materials);

      // Smooth circular arc distribution
      const angle = ((index - total / 2) / total) * Math.PI * 1.8;
      const x = Math.sin(angle) * arcRadius;
      const z = -Math.cos(angle) * arcRadius + (arcRadius * 0.75);
      const y = Math.sin(index * 0.8) * 1.6;

      mesh.position.set(x, y, z);
      mesh.rotation.y = -angle;

      (mesh as any).userData = { release: rel, index };
      cardGroup.add(mesh);

      cardMeshes.push({
        mesh,
        release: rel,
        basePos: mesh.position.clone(),
        baseRot: mesh.rotation.clone(),
        texture,
        angle,
      });
    });

    // --- Interactive Orbit Physics ---
    let isDragging = false;
    let prevPointer = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };
    const currentRotation = { x: 0, y: 0 };
    let targetZoom = initialZoom;
    let currentZoom = initialZoom;

    // Controls registration
    controlsRef.current = {
      next: () => {
        targetRotation.y -= (Math.PI * 1.8) / total;
      },
      prev: () => {
        targetRotation.y += (Math.PI * 1.8) / total;
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
          const rel = (hit as any).userData.release as Release;
          setHoveredRelease(rel);
          container.style.cursor = 'pointer';
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
      e.preventDefault();
      targetRotation.y -= e.deltaY * 0.002;
    };

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const my = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(new THREE.Vector2(mx, my), camera);
      const intersects = raycaster.intersectObjects(cardMeshes.map((c) => c.mesh));

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const clicked = (hit as any).userData.release as Release;
        setActiveRelease(clicked);
        propsRef.current.onSelectRelease(clicked);
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
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // --- Animation Loop ---
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth inertia
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.07;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.07;
      currentZoom += (targetZoom - currentZoom) * 0.07;

      if (!isDragging) {
        targetRotation.y += 0.001;
      }

      cardGroup.rotation.y = currentRotation.y;
      cardGroup.rotation.x = currentRotation.x;
      camera.position.z = currentZoom;

      const currentFilter = propsRef.current.activeFilter;

      cardMeshes.forEach((item, idx) => {
        const { mesh, release, basePos, baseRot } = item;

        let match = true;
        if (currentFilter === 'albums' && release.type !== 'album') match = false;
        if (currentFilter === 'eps' && release.type !== 'ep') match = false;
        if (currentFilter === 'singles' && release.type !== 'single') match = false;
        if (currentFilter === 'collaborations' && (!release.featuring || release.featuring.length === 0)) match = false;

        const isCurrentSelected = activeRelease?.id === release.id;
        const targetScale = isCurrentSelected ? 1.25 : match ? 1.0 : 0.15;
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.09);

        // Floating motion
        const floatY = Math.sin(elapsed * 1.3 + idx * 0.5) * 0.3;
        mesh.position.y = basePos.y + floatY;

        mesh.rotation.z = baseRot.z + Math.sin(elapsed * 0.8 + idx) * 0.03;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('click', onClick);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      cardGeometry.dispose();
      cardMeshes.forEach((c) => c.texture.dispose());
      renderer.dispose();
    };
  }, [releases, activeRelease]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '620px',
          outline: 'none',
          cursor: 'grab',
        }}
      />

      {/* Floating 3D Navigation Controls Bar */}
      <div
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'rgba(6, 7, 18, 0.82)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border-line)',
          padding: '0.35rem 0.65rem',
          borderRadius: '100px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
        }}
      >
        <button
          onClick={() => controlsRef.current.prev()}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          title="Предыдущий релиз"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          onClick={() => controlsRef.current.next()}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          title="Следующий релиз"
        >
          <ChevronRight size={16} />
        </button>

        <div style={{ width: '1px', height: '16px', background: 'var(--border-line)', margin: '0 2px' }} />

        <button
          onClick={() => controlsRef.current.zoomIn()}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          title="Приблизить"
        >
          <ZoomIn size={14} />
        </button>

        <button
          onClick={() => controlsRef.current.zoomOut()}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          title="Отдалить"
        >
          <ZoomOut size={14} />
        </button>

        <button
          onClick={() => controlsRef.current.reset()}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          title="Сбросить ракурс"
        >
          <RotateCcw size={13} />
        </button>
      </div>

      {/* Floating HUD Tooltip when hovering a card */}
      {hoveredRelease && !activeRelease && (
        <div
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(10, 11, 28, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(217, 70, 239, 0.4)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.7), 0 0 25px rgba(217, 70, 239, 0.25)',
            padding: '0.65rem 1.6rem',
            borderRadius: '100px',
            color: '#ffffff',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 600,
            pointerEvents: 'none',
            zIndex: 10,
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--neon-magenta)',
              boxShadow: '0 0 10px var(--neon-magenta)',
            }}
          />
          <span>{hoveredRelease.title}</span>
          <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>//</span>
          <span style={{ color: 'var(--text-muted)' }}>{hoveredRelease.artist}</span>
          <span style={{ color: 'var(--electric-blue)', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>
            [НАЖМИТЕ ДЛЯ ПРОСМОТРА]
          </span>
        </div>
      )}

      {/* Selected Card Spotlight Panel (When a release is clicked) */}
      {activeRelease && (
        <div
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '1.5rem',
            right: '1.5rem',
            maxWidth: '560px',
            margin: '0 auto',
            zIndex: 20,
            background: 'rgba(8, 9, 24, 0.94)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(217, 70, 239, 0.45)',
            borderRadius: '24px',
            padding: '1.25rem 1.5rem',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9), 0 0 35px rgba(217, 70, 239, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.72rem',
                  color: 'var(--neon-magenta)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {activeRelease.type === 'album' ? 'АЛЬБОМ' : activeRelease.type === 'ep' ? 'МИНИ-АЛЬБОМ' : 'СИНГЛ'}
              </span>
              <span style={{ color: 'var(--text-dim)' }}>•</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.72rem',
                  color: 'var(--text-dim)',
                }}
              >
                {activeRelease.releaseDate}
              </span>
            </div>

            <button
              onClick={() => setActiveRelease(null)}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Закрыть"
            >
              <X size={15} />
            </button>
          </div>

          <div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.45rem',
                fontWeight: 800,
                color: '#ffffff',
                margin: '0 0 0.2rem',
              }}
            >
              {activeRelease.title}
            </h3>
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                margin: 0,
              }}
            >
              {activeRelease.artist}
              {activeRelease.featuring && (
                <span style={{ color: 'var(--electric-blue)' }}>
                  {' '}совместно с {activeRelease.featuring.join(', ')}
                </span>
              )}
            </p>
          </div>

          {/* Ссылки на прослушивание и детали */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.65rem',
              alignItems: 'center',
              paddingTop: '0.5rem',
              borderTop: '1px solid var(--border-line)',
            }}
          >
            {activeRelease.links.spotify && (
              <a
                href={activeRelease.links.spotify}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '100px',
                  background: 'rgba(29, 185, 84, 0.15)',
                  border: '1px solid rgba(29, 185, 84, 0.4)',
                  color: '#1db954',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <span>Spotify</span>
                <ExternalLink size={11} />
              </a>
            )}

            {activeRelease.links.appleMusic && (
              <a
                href={activeRelease.links.appleMusic}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '100px',
                  background: 'rgba(252, 60, 68, 0.15)',
                  border: '1px solid rgba(252, 60, 68, 0.4)',
                  color: '#fc3c44',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <span>Apple Music</span>
                <ExternalLink size={11} />
              </a>
            )}

            {activeRelease.links.youtube && (
              <a
                href={activeRelease.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '100px',
                  background: 'rgba(255, 0, 0, 0.15)',
                  border: '1px solid rgba(255, 0, 0, 0.4)',
                  color: '#ff4444',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <span>YouTube</span>
                <ExternalLink size={11} />
              </a>
            )}

            <button
              onClick={() => propsRef.current.onSelectRelease(activeRelease)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 1.05rem',
                borderRadius: '100px',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(217, 70, 239, 0.35))',
                border: '1px solid rgba(217, 70, 239, 0.45)',
                color: '#ffffff',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginLeft: 'auto',
              }}
            >
              <Disc3 size={13} />
              <span>ТРЕКЛИСТ И ДЕТАЛИ</span>
            </button>
          </div>
        </div>
      )}

      {/* Инструкция по управлению внизу */}
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1.25rem',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.65rem',
          color: 'var(--text-dim)',
          letterSpacing: '0.08em',
          pointerEvents: 'none',
        }}
      >
        ПЕРЕТАСКИВАЙТЕ МЫШЬЮ ИЛИ ПАЛЬЦЕМ ДЛЯ ВРАЩЕНИЯ • КЛИКНИТЕ НА ОБЛОЖКУ
      </div>
    </div>
  );
}
