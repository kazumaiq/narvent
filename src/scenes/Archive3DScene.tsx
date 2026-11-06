import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Release } from '../data/releases';

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
  const [hoveredRelease, setHoveredRelease] = useState<Release | null>(null);

  const propsRef = useRef({ releases, onSelectRelease, activeFilter });
  useEffect(() => {
    propsRef.current = { releases, onSelectRelease, activeFilter };
  }, [releases, onSelectRelease, activeFilter]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    const isMobile = container.clientWidth < 768;
    const cameraZ = isMobile ? 36 : 30;

    const camera = new THREE.PerspectiveCamera(
      isMobile ? 55 : 45,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, cameraZ);

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

    // --- Dynamic Studio Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const magentaLight = new THREE.PointLight(0xd946ef, 3.5, 90);
    magentaLight.position.set(20, 15, 25);
    scene.add(magentaLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 3.5, 90);
    cyanLight.position.set(-20, -10, 25);
    scene.add(cyanLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1.4);
    frontLight.position.set(0, 5, 30);
    scene.add(frontLight);

    // --- Helper: Generate Luxury Procedural Texture for each album cover ---
    const createCoverTexture = (rel: Release): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 600;
      const ctx = canvas.getContext('2d')!;

      const [c1, c2, c3] = rel.coverGradient || ['#060814', '#160b2e', '#3b0764'];

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 600, 600);
      grad.addColorStop(0, c1);
      grad.addColorStop(0.5, c2);
      grad.addColorStop(1, c3);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 600, 600);

      // Cyberpunk minimal geometric noise
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.lineWidth = 1;
      for (let y = 30; y < 600; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(600, y);
        ctx.stroke();
      }

      // Central Iridescent Hologram Glyph
      ctx.save();
      ctx.translate(300, 270);
      ctx.rotate((Math.PI / 180) * 45);

      const haloGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 120);
      haloGrad.addColorStop(0, '#d946ef');
      haloGrad.addColorStop(0.5, '#6366f1');
      haloGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = haloGrad;
      ctx.fillRect(-120, -120, 240, 240);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(-80, -80, 160, 160);

      ctx.strokeStyle = '#38bdf8';
      ctx.strokeRect(-50, -50, 100, 100);

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Header Typography
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.font = '700 24px "Space Grotesk", sans-serif';
      ctx.fillText('NARVENT', 45, 65);

      ctx.fillStyle = 'rgba(148, 163, 184, 0.95)';
      ctx.font = '600 18px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`${rel.type.toUpperCase()} // ${rel.year}`, 555, 65);

      // Title & Artist
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 36px "Space Grotesk", sans-serif';

      let title = rel.title;
      if (title.length > 20) title = title.substring(0, 18) + '...';
      ctx.fillText(title, 45, 500);

      ctx.fillStyle = 'rgba(203, 213, 225, 0.85)';
      ctx.font = '500 22px "Manrope", sans-serif';
      const artistLine = rel.featuring ? `${rel.artist} ft. ${rel.featuring.join(', ')}` : rel.artist;
      let displayArtist = artistLine;
      if (displayArtist.length > 26) displayArtist = displayArtist.substring(0, 24) + '...';
      ctx.fillText(displayArtist, 45, 540);

      // Chrome rim border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, 596, 596);

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      return texture;
    };

    // --- Create 3D Meshes ---
    const cardGroup = new THREE.Group();
    cardGroup.position.set(0, 0, 0);
    scene.add(cardGroup);

    // Box case geometry with rounded appearance
    const cardGeometry = new THREE.BoxGeometry(6.4, 6.4, 0.35);

    const cardMeshes: {
      mesh: THREE.Mesh;
      release: Release;
      basePos: THREE.Vector3;
      baseRot: THREE.Euler;
      texture: THREE.CanvasTexture;
    }[] = [];

    const total = releases.length;
    const arcRadius = isMobile ? 13 : 19;

    releases.forEach((rel, index) => {
      const texture = createCoverTexture(rel);

      const edgeMaterial = new THREE.MeshStandardMaterial({
        color: 0x060714,
        metalness: 0.85,
        roughness: 0.2,
      });

      const frontMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.3,
        roughness: 0.4,
        emissive: new THREE.Color(0x0e0e24),
        emissiveIntensity: 0.4,
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

      // Perfectly centered circular arc in X-Z plane
      const angle = ((index - total / 2) / total) * Math.PI * 1.6;

      const x = Math.sin(angle) * arcRadius;
      const z = -Math.cos(angle) * arcRadius + (arcRadius * 0.7);
      // Gentle subtle elevation variation centered around y=0
      const y = Math.sin(index * 0.7) * 1.5;

      mesh.position.set(x, y, z);
      mesh.rotation.y = -angle;

      const basePos = mesh.position.clone();
      const baseRot = mesh.rotation.clone();

      (mesh as any).userData = { release: rel };
      cardGroup.add(mesh);

      cardMeshes.push({
        mesh,
        release: rel,
        basePos,
        baseRot,
        texture,
      });
    });

    // --- Interactive Orbit & Drag Physics ---
    let isDragging = false;
    let prevPointer = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };
    const currentRotation = { x: 0, y: 0 };
    const initialZoom = isMobile ? 36 : 30;
    let targetZoom = initialZoom;
    let currentZoom = initialZoom;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevPointer = { x: clientX, y: clientY };
    };

    const raycaster = new THREE.Raycaster();

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - prevPointer.x;
        const deltaY = clientY - prevPointer.y;

        targetRotation.y += deltaX * 0.0055;
        targetRotation.x += deltaY * 0.003;
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
        targetRotation.y += 0.0012;
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

        const targetScale = match ? 1.0 : 0.15;
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.09);

        // Gentle floating wave
        const floatY = Math.sin(elapsed * 1.4 + idx * 0.5) * 0.35;
        mesh.position.y = basePos.y + floatY;

        // Subtle dynamic tilt
        mesh.rotation.z = baseRot.z + Math.sin(elapsed * 0.9 + idx) * 0.03;
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
  }, [releases]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
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

      {/* Floating HUD Tooltip */}
      {hoveredRelease && (
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(10, 11, 28, 0.88)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(217, 70, 239, 0.4)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.7), 0 0 25px rgba(217, 70, 239, 0.25)',
            padding: '0.65rem 1.6rem',
            borderRadius: '100px',
            color: '#ffffff',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.92rem',
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
        </div>
      )}

      {/* HUD Instruction */}
      <div
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.5rem',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.7rem',
          color: 'var(--text-dim)',
          background: 'rgba(10, 11, 28, 0.65)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '0.4rem 0.85rem',
          borderRadius: '100px',
          pointerEvents: 'none',
        }}
      >
        <span>SWIPE OR DRAG TO ROTATE // CLICK TO INSPECT</span>
      </div>
    </div>
  );
}
