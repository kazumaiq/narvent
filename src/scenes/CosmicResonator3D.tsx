import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CosmicResonator3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    const isMobile = window.innerWidth < 768;
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 50 : 42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, isMobile ? 13 : 11.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.8);
    scene.add(ambientLight);

    const cyanPoint = new THREE.PointLight(0x38bdf8, 5, 25);
    cyanPoint.position.set(-5, 4, 6);
    scene.add(cyanPoint);

    const magentaPoint = new THREE.PointLight(0xd946ef, 6, 25);
    magentaPoint.position.set(5, -4, 6);
    scene.add(magentaPoint);

    const coreLight = new THREE.PointLight(0x818cf8, 4, 15);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // --- 1. Central Cosmic Crystal Polyhedron ---
    const crystalGeo = new THREE.IcosahedronGeometry(2.35, 1);
    
    // Custom chromatic crystalline material
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x070914,
      emissive: 0x1e1035,
      roughness: 0.12,
      metalness: 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
      ior: 1.6,
      wireframe: false,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    scene.add(crystalMesh);

    // Glowing wireframe cage
    const wireGeo = new THREE.IcosahedronGeometry(2.42, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xd946ef,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    crystalMesh.add(wireMesh);

    // Inner Singularity Core
    const coreGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    crystalMesh.add(coreMesh);

    // --- 2. Counter-Rotating Gyro-Astro Rings ---
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    // Outer Ring (Cyan)
    const ring1Geo = new THREE.TorusGeometry(3.8, 0.038, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    // Inner Ring (Magenta)
    const ring2Geo = new THREE.TorusGeometry(4.5, 0.028, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xd946ef,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    ringGroup.add(ring2);

    // Equator Dotted Ring
    const ring3Geo = new THREE.RingGeometry(3.1, 3.14, 64);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = Math.PI / 2;
    ringGroup.add(ring3);

    // Orbiting Sound Nodes (Satellites)
    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const satGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const satMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x38bdf8 : 0xd946ef,
        blending: THREE.AdditiveBlending,
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      scene.add(sat);
      satellites.push(sat);
    }

    // --- 3. Orbital Stardust Embers ---
    const emberCount = 320;
    const emberPositions = new Float32Array(emberCount * 3);
    const emberColors = new Float32Array(emberCount * 3);

    const cCyan = new THREE.Color(0x38bdf8);
    const cMag = new THREE.Color(0xd946ef);
    const cPurp = new THREE.Color(0xc084fc);

    for (let i = 0; i < emberCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const dist = 3.2 + Math.random() * 3.8;

      emberPositions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      emberPositions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      emberPositions[i * 3 + 2] = dist * Math.cos(phi);

      const col = Math.random() < 0.4 ? cCyan : Math.random() < 0.7 ? cMag : cPurp;
      emberColors[i * 3] = col.r;
      emberColors[i * 3 + 1] = col.g;
      emberColors[i * 3 + 2] = col.b;
    }

    const emberGeo = new THREE.BufferGeometry();
    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
    emberGeo.setAttribute('color', new THREE.BufferAttribute(emberColors, 3));

    // Circle particle texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext('2d')!;
    const pGrad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
    pGrad.addColorStop(0, 'rgba(255,255,255,1)');
    pGrad.addColorStop(0.4, 'rgba(217,70,239,0.7)');
    pGrad.addColorStop(1, 'rgba(0,0,0,0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 16, 16);
    const pTex = new THREE.CanvasTexture(pCanvas);

    const emberMat = new THREE.PointsMaterial({
      size: 0.16,
      map: pTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const emberPoints = new THREE.Points(emberGeo, emberMat);
    scene.add(emberPoints);

    // --- Interactive Mouse & Touch Tracking ---
    const targetRot = { x: 0, y: 0 };
    const curRot = { x: 0, y: 0 };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRot.y = nx * 0.75;
      targetRot.x = -ny * 0.75;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const nx = ((touch.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((touch.clientY - rect.top) / rect.height - 0.5) * 2;
        targetRot.y = nx * 0.85;
        targetRot.x = -ny * 0.85;
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const mob = window.innerWidth < 768;
      camera.fov = mob ? 50 : 42;
      camera.aspect = w / h;
      camera.position.z = mob ? 13 : 11.5;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera / crystal rotation lerp
      curRot.x += (targetRot.x - curRot.x) * 0.05;
      curRot.y += (targetRot.y - curRot.y) * 0.05;

      // Crystal rotation & pulse
      crystalMesh.rotation.x = elapsedTime * 0.35 + curRot.x;
      crystalMesh.rotation.y = elapsedTime * 0.45 + curRot.y;
      const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.045;
      crystalMesh.scale.set(pulse, pulse, pulse);

      // Core light oscillation
      coreMesh.scale.setScalar(0.85 + Math.sin(elapsedTime * 3.5) * 0.15);

      // Rings counter-rotations
      ring1.rotation.z = elapsedTime * 0.6;
      ring1.rotation.x = Math.PI / 3 + Math.sin(elapsedTime * 0.5) * 0.15;

      ring2.rotation.z = -elapsedTime * 0.45;
      ring2.rotation.y = Math.PI / 4 + Math.cos(elapsedTime * 0.4) * 0.2;

      ring3.rotation.z = elapsedTime * 0.25;

      ringGroup.rotation.y = curRot.y * 0.5;
      ringGroup.rotation.x = curRot.x * 0.5;

      // Orbiting Satellites position calculation
      satellites.forEach((sat, i) => {
        const angle = elapsedTime * 1.2 + (i * Math.PI) / 2;
        const radius = i % 2 === 0 ? 3.8 : 4.5;
        sat.position.x = Math.cos(angle) * radius;
        sat.position.y = Math.sin(angle * 1.5) * 1.2;
        sat.position.z = Math.sin(angle) * radius;
      });

      // Embers slow drift
      emberPoints.rotation.y = elapsedTime * 0.08;
      emberPoints.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js resources
      crystalGeo.dispose();
      crystalMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      emberGeo.dispose();
      emberMat.dispose();
      pTex.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
      }}
    />
  );
}
