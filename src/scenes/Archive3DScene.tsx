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
  const [hoveredReleaseTitle, setHoveredReleaseTitle] = useState<string | null>(null);

  // Keep latest callbacks/props in refs for the Three.js render loop
  const propsRef = useRef({ releases, onSelectRelease, activeFilter });
  useEffect(() => {
    propsRef.current = { releases, onSelectRelease, activeFilter };
  }, [releases, onSelectRelease, activeFilter]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060613, 0.0035);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 48);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x7093ff, 2.5);
    dirLight1.position.set(20, 30, 40);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xb8a9d4, 1.8);
    dirLight2.position.set(-25, -20, 20);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x4f75ff, 3, 70);
    pointLight.position.set(0, 5, 20);
    scene.add(pointLight);

    // Helper: generate 2D canvas texture for album cover
    const createCoverTexture = (rel: Release): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      const [c1, c2, c3] = rel.coverGradient || ['#0d0d26', '#191142', '#361866'];

      // Gradient background
      const grad = ctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0, c1);
      grad.addColorStop(0.5, c2);
      grad.addColorStop(1, c3);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      // Grid effect
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 40; i < 512; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 512);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(512, i);
        ctx.stroke();
      }

      // Neon center emblem
      ctx.save();
      ctx.translate(256, 230);
      ctx.rotate((Math.PI / 180) * 45);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(-65, -65, 130, 130);
      ctx.strokeStyle = '#7093ff';
      ctx.strokeRect(-40, -40, 80, 80);
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Top Tag
      ctx.font = '600 22px "Space Grotesk", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fillText('NARVENT', 40, 60);

      ctx.font = '500 16px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(184, 169, 212, 0.9)';
      ctx.textAlign = 'right';
      ctx.fillText(`${rel.type.toUpperCase()} // ${rel.year}`, 472, 60);

      // Bottom Title
      ctx.textAlign = 'left';
      ctx.font = '700 32px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#ffffff';

      // Truncate title if long
      let title = rel.title;
      if (title.length > 22) title = title.substring(0, 20) + '...';
      ctx.fillText(title, 40, 430);

      // Bottom Artist
      ctx.font = '400 20px "Inter", sans-serif';
      ctx.fillStyle = 'rgba(212, 200, 245, 0.75)';
      const artistLine = rel.featuring ? `${rel.artist} ft. ${rel.featuring.join(', ')}` : rel.artist;
      let displayArtist = artistLine;
      if (displayArtist.length > 28) displayArtist = displayArtist.substring(0, 26) + '...';
      ctx.fillText(displayArtist, 40, 465);

      // Shiny border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, 508, 508);

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      return texture;
    };

    // --- Create 3D Meshes for Releases ---
    const releaseCardMeshes: {
      mesh: THREE.Mesh;
      release: Release;
      basePos: THREE.Vector3;
      baseRot: THREE.Euler;
      targetScale: number;
      texture: THREE.CanvasTexture;
    }[] = [];

    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    // Box geometry with bevel-like depth
    const cardGeometry = new THREE.BoxGeometry(6, 6, 0.28);

    releases.forEach((rel, index) => {
      const texture = createCoverTexture(rel);

      // Dark edge/back material
      const edgeMaterial = new THREE.MeshStandardMaterial({
        color: 0x090918,
        metalness: 0.8,
        roughness: 0.3,
      });

      // Front cover material with dynamic texture
      const frontMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.25,
        roughness: 0.45,
        emissive: new THREE.Color(0x111122),
        emissiveIntensity: 0.4,
      });

      // Six face materials: [right, left, top, bottom, front, back]
      const materials = [
        edgeMaterial,
        edgeMaterial,
        edgeMaterial,
        edgeMaterial,
        frontMaterial,
        edgeMaterial,
      ];

      const mesh = new THREE.Mesh(cardGeometry, materials);

      // Calculate position along an expansive cosmic ribbon / helix
      const total = releases.length;
      const angle = (index / total) * Math.PI * 4.2;
      const radius = 17 + Math.sin(index * 0.4) * 3;
      const x = Math.sin(angle) * radius;
      const y = (index - total / 2) * 2.8;
      const z = Math.cos(angle) * (radius * 0.85);

      mesh.position.set(x, y, z);
      // Face towards center/viewer
      mesh.rotation.y = angle + Math.PI;
      mesh.rotation.x = -y * 0.015;

      const basePos = mesh.position.clone();
      const baseRot = mesh.rotation.clone();

      (mesh as any).userData = { release: rel };
      cardGroup.add(mesh);

      releaseCardMeshes.push({
        mesh,
        release: rel,
        basePos,
        baseRot,
        targetScale: 1,
        texture,
      });
    });

    // --- Interactive Orbit & Drag Controls ---
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    const rotationTarget = { x: 0, y: 0 };
    const rotationCurrent = { x: 0, y: 0 };
    let zoomTarget = 48;
    let zoomCurrent = 48;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMousePos = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - prevMousePos.x;
        const deltaY = clientY - prevMousePos.y;
        rotationTarget.y += deltaX * 0.005;
        rotationTarget.x += deltaY * 0.004;
        // Clamp vertical tilt
        rotationTarget.x = Math.max(-0.6, Math.min(0.6, rotationTarget.x));
        prevMousePos = { x: clientX, y: clientY };
      }

      // Raycasting for hover (mouse only)
      if (!('touches' in e)) {
        const rect = container.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
        const intersects = raycaster.intersectObjects(
          releaseCardMeshes.map((r) => r.mesh)
        );

        if (intersects.length > 0) {
          const hoveredMesh = intersects[0].object as THREE.Mesh;
          const rel = (hoveredMesh as any).userData.release as Release;
          setHoveredReleaseTitle(`${rel.title} — ${rel.artist}`);
          container.style.cursor = 'pointer';
        } else {
          setHoveredReleaseTitle(null);
          container.style.cursor = isDragging ? 'grabbing' : 'grab';
        }
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      container.style.cursor = 'grab';
    };

    const onWheel = (e: WheelEvent) => {
      // Zoom gently without breaking scroll
      e.preventDefault();
      zoomTarget += e.deltaY * 0.04;
      zoomTarget = Math.max(18, Math.min(75, zoomTarget));
    };

    const raycaster = new THREE.Raycaster();

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
      const intersects = raycaster.intersectObjects(
        releaseCardMeshes.map((r) => r.mesh)
      );

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const clickedRelease = (hitMesh as any).userData.release as Release;
        propsRef.current.onSelectRelease(clickedRelease);
      }
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('click', onClick);
    container.addEventListener('wheel', onWheel, { passive: false });

    // Touch events for mobile
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Resize handler
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // --- Render Loop ---
    let animId: number;
    let clock = new THREE.Clock();

    const render = () => {
      animId = requestAnimationFrame(render);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera orbit
      rotationCurrent.x += (rotationTarget.x - rotationCurrent.x) * 0.06;
      rotationCurrent.y += (rotationTarget.y - rotationCurrent.y) * 0.06;
      zoomCurrent += (zoomTarget - zoomCurrent) * 0.06;

      // Slowly rotate the entire galaxy of releases if not dragging
      if (!isDragging) {
        rotationTarget.y += 0.0012;
      }

      cardGroup.rotation.y = rotationCurrent.y;
      cardGroup.rotation.x = rotationCurrent.x;
      camera.position.z = zoomCurrent;

      // Animate individual release meshes (gentle hovering and filter scaling)
      const currentFilter = propsRef.current.activeFilter;

      releaseCardMeshes.forEach((item, idx) => {
        const { mesh, release, basePos, baseRot } = item;

        // Check filter match
        let isVisible = true;
        if (currentFilter === 'albums' && release.type !== 'album') isVisible = false;
        if (currentFilter === 'eps' && release.type !== 'ep') isVisible = false;
        if (currentFilter === 'singles' && release.type !== 'single') isVisible = false;
        if (currentFilter === 'collaborations' && (!release.featuring || release.featuring.length === 0)) isVisible = false;

        const targetScale = isVisible ? 1 : 0.15;
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

        // Gentle floating motion
        const floatOffset = Math.sin(elapsedTime * 1.5 + idx * 0.7) * 0.45;
        mesh.position.y = basePos.y + floatOffset;

        // Subtle wobble
        mesh.rotation.z = baseRot.z + Math.sin(elapsedTime * 0.8 + idx) * 0.03;
      });

      renderer.render(scene, camera);
    };

    render();

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
      releaseCardMeshes.forEach((r) => {
        r.texture.dispose();
      });
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

      {/* Floating 3D HUD Tooltip */}
      {hoveredReleaseTitle && (
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(10, 10, 30, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(111, 147, 255, 0.4)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.6), 0 0 20px rgba(79, 117, 255, 0.25)',
            padding: '0.65rem 1.6rem',
            borderRadius: '100px',
            color: '#ffffff',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            pointerEvents: 'none',
            zIndex: 10,
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#4f75ff',
              boxShadow: '0 0 10px #4f75ff',
            }}
          />
          {hoveredReleaseTitle}
        </div>
      )}

      {/* Exploration instruction overlay badge */}
      <div
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.5rem',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.72rem',
          color: 'rgba(184, 169, 212, 0.65)',
          background: 'rgba(12, 12, 32, 0.65)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '0.45rem 0.9rem',
          borderRadius: '100px',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}
      >
        <span>DRAG TO ROTATE // CLICK COVER TO INSPECT</span>
      </div>
    </div>
  );
}
