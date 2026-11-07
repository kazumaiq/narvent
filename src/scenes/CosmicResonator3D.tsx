import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * CosmicResonator3D — Interactive Relativistic Black Hole & Geodesic Singularity
 * Features:
 * 1. Event Horizon with custom GLSL Fresnel Photon Ring & Gravitational Lensing corona
 * 2. High-polygon subdivided geodesic spacetime lattice (detail=4) with subtle wave breathing
 * 3. Gargantua-style double-plane relativistic accretion disk & lensed vertical halo
 * 4. 3,600-particle Keplerian differential spiral vortex (inner core spins faster than outer arms)
 * 5. Full mouse/touch orbital tilt + radial edge feathering so it NEVER clips against any box
 */
export default function CosmicResonator3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const w0 = container.clientWidth || 500;
    const h0 = container.clientHeight || 500;
    const aspect0 = w0 / h0;

    const camera = new THREE.PerspectiveCamera(38, aspect0, 0.1, 120);
    // Automatically scale camera distance for narrow aspect ratios so nothing ever clips
    camera.position.set(0, 0.35, 14.8 / Math.min(1, Math.max(aspect0, 0.68)));

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w0, h0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Master Root Group (tilted at a cinematic Gargantua angle)
    const blackHoleSystem = new THREE.Group();
    blackHoleSystem.rotation.x = 0.32;
    blackHoleSystem.rotation.z = -0.22;
    scene.add(blackHoleSystem);

    // =========================================================================
    // 1. EVENT HORIZON & PHOTON SPHERE (CUSTOM GLSL FRESNEL LENSING SHADER)
    // =========================================================================
    const horizonGeo = new THREE.SphereGeometry(1.52, 96, 96);
    const horizonMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorInner: { value: new THREE.Color(0xffffff) },
        uColorMid: { value: new THREE.Color(0xd946ef) },
        uColorOuter: { value: new THREE.Color(0x38bdf8) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColorInner;
        uniform vec3 uColorMid;
        uniform vec3 uColorOuter;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);
          float dotNV = max(dot(normal, viewDir), 0.0);

          // Pure void black core inside the Schwarzschild radius
          float fresnel = pow(1.0 - dotNV, 3.6);
          float photonRing = smoothstep(0.58, 0.92, fresnel);
          float pulse = 0.92 + 0.08 * sin(uTime * 3.0);

          vec3 rimColor = mix(uColorOuter, uColorMid, smoothstep(0.25, 0.65, fresnel));
          rimColor = mix(rimColor, uColorInner, photonRing * pulse);

          // Pitch black event horizon center + incandescent photon ring limb
          vec3 finalColor = rimColor * (fresnel * 2.1 + photonRing * 1.4);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });
    const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
    blackHoleSystem.add(horizonMesh);

    // Outer Gravitational Lensing Corona Halo (Additive back-face glow sphere)
    const coronaGeo = new THREE.SphereGeometry(1.95, 64, 64);
    const coronaMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);
          float intensity = pow(0.68 - dot(normal, viewDir), 2.8);
          intensity = clamp(intensity, 0.0, 1.0);
          vec3 col = mix(vec3(0.54, 0.36, 0.96), vec3(0.85, 0.27, 0.93), 0.5 + 0.5 * sin(uTime * 1.5));
          gl_FragColor = vec4(col, intensity * 0.55);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    blackHoleSystem.add(coronaMesh);

    // =========================================================================
    // 2. HIGH-POLYGON GEODESIC SPACETIME METRIC SHELL (DETAIL = 4, 2560 FACES)
    // =========================================================================
    const geodesicGeo = new THREE.IcosahedronGeometry(1.76, 4);
    const basePositions = (geodesicGeo.attributes.position as THREE.BufferAttribute).clone();
    const geodesicMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
    });
    const geodesicMesh = new THREE.Mesh(geodesicGeo, geodesicMat);
    blackHoleSystem.add(geodesicMesh);

    // Secondary fine inner geodesic shell
    const innerCageGeo = new THREE.IcosahedronGeometry(1.61, 3);
    const innerCageMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
    });
    const innerCageMesh = new THREE.Mesh(innerCageGeo, innerCageMat);
    blackHoleSystem.add(innerCageMesh);

    // =========================================================================
    // 3. GARGANTUA GRAVITATIONAL LENSING HALO RINGS & ACCRETION SHADER BANDS
    // =========================================================================
    const lensingGroup = new THREE.Group();
    blackHoleSystem.add(lensingGroup);

    // Primary equatorial accretion shader disk
    const diskGeo = new THREE.RingGeometry(1.82, 4.35, 128, 8);
    const diskMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPos;
        void main() {
          vUv = uv;
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vPos;

        void main() {
          float r = length(vPos.xy);
          float normR = clamp((r - 1.82) / (4.35 - 1.82), 0.0, 1.0);
          float angle = atan(vPos.y, vPos.x);

          // Spiral relativistic Doppler streaks
          float spiral1 = sin(angle * 5.0 - normR * 18.0 + uTime * 3.2);
          float spiral2 = cos(angle * 3.0 - normR * 12.0 + uTime * 2.1);
          float streaks = 0.55 + 0.45 * (spiral1 * 0.6 + spiral2 * 0.4);

          // Radial fade at inner & outer boundaries
          float radialAlpha = smoothstep(0.0, 0.12, normR) * pow(1.0 - normR, 1.65);

          vec3 hotCore = vec3(1.0, 0.94, 1.0);
          vec3 midMagenta = vec3(0.85, 0.27, 0.93);
          vec3 outerCyan = vec3(0.22, 0.74, 0.97);

          vec3 col = mix(hotCore, midMagenta, smoothstep(0.0, 0.35, normR));
          col = mix(col, outerCyan, smoothstep(0.35, 0.9, normR));

          gl_FragColor = vec4(col * (1.1 + streaks * 0.6), radialAlpha * streaks * 0.72);
        }
      `,
      side: THREE.DoubleSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const diskMesh = new THREE.Mesh(diskGeo, diskMat);
    diskMesh.rotation.x = Math.PI / 2;
    lensingGroup.add(diskMesh);

    // Relativistic Bent Light Arch (Gargantua vertical lensed photon ring)
    const arch1Geo = new THREE.TorusGeometry(2.15, 0.032, 32, 180);
    const arch1Mat = new THREE.MeshBasicMaterial({
      color: 0xf0abfc,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const arch1 = new THREE.Mesh(arch1Geo, arch1Mat);
    arch1.rotation.x = 0.18;
    lensingGroup.add(arch1);

    const arch2Geo = new THREE.TorusGeometry(2.65, 0.018, 24, 180);
    const arch2Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const arch2 = new THREE.Mesh(arch2Geo, arch2Mat);
    arch2.rotation.y = Math.PI / 3;
    arch2.rotation.x = -0.35;
    lensingGroup.add(arch2);

    // =========================================================================
    // 4. 3,600-PARTICLE KEPLERIAN SPIRAL ACCRETION VORTEX
    // =========================================================================
    const particleCount = 3600;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const orbitRadii = new Float32Array(particleCount);
    const orbitAngles = new Float32Array(particleCount);
    const orbitSpeeds = new Float32Array(particleCount);
    const verticalOffsets = new Float32Array(particleCount);

    const cHotWhite = new THREE.Color(0xffffff);
    const cMagenta = new THREE.Color(0xd946ef);
    const cViolet = new THREE.Color(0x8b5cf6);
    const cCyan = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      // Concentrate more particles near the inner photon ring
      const t = Math.pow(Math.random(), 1.55);
      const r = 1.78 + t * 2.85;
      const armOffset = (i % 3) * ((Math.PI * 2) / 3);
      const angle = armOffset + t * 8.5 + (Math.random() - 0.5) * 1.4;

      // Thin disk near the event horizon, slightly flared further out
      const ySpread = (0.04 + t * 0.28) * (Math.random() - 0.5);

      orbitRadii[i] = r;
      orbitAngles[i] = angle;
      // Keplerian angular velocity: inner orbits move faster
      orbitSpeeds[i] = 1.45 / Math.pow(r, 1.15);
      verticalOffsets[i] = ySpread;

      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = ySpread;
      positions[i * 3 + 2] = Math.sin(angle) * r;

      let col: THREE.Color;
      if (t < 0.16) {
        col = cHotWhite.clone().lerp(cMagenta, t / 0.16);
      } else if (t < 0.55) {
        col = cMagenta.clone().lerp(cViolet, (t - 0.16) / 0.39);
      } else {
        col = cViolet.clone().lerp(cCyan, (t - 0.55) / 0.45);
      }

      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const vortexGeo = new THREE.BufferGeometry();
    vortexGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    vortexGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Soft glowing circular sprite texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d')!;
    const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    pGrad.addColorStop(0, 'rgba(255,255,255,1)');
    pGrad.addColorStop(0.35, 'rgba(240,171,252,0.8)');
    pGrad.addColorStop(1, 'rgba(0,0,0,0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 32, 32);
    const pTex = new THREE.CanvasTexture(pCanvas);

    const vortexMat = new THREE.PointsMaterial({
      size: 0.095,
      map: pTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const vortexPoints = new THREE.Points(vortexGeo, vortexMat);
    blackHoleSystem.add(vortexPoints);

    // =========================================================================
    // 5. INTERACTIVE MOUSE & TOUCH GRAVITATIONAL TILT
    // =========================================================================
    const targetRot = { x: 0, y: 0 };
    const curRot = { x: 0, y: 0 };

    const handlePointerMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRot.y = nx * 0.55;
      targetRot.x = ny * 0.42;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const nx = (touch.clientX / window.innerWidth - 0.5) * 2;
        const ny = (touch.clientY / window.innerHeight - 0.5) * 2;
        targetRot.y = nx * 0.65;
        targetRot.x = ny * 0.48;
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 500;
      const aspect = w / h;
      camera.aspect = aspect;
      camera.position.z = 14.8 / Math.min(1, Math.max(aspect, 0.68));
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // =========================================================================
    // 6. ANIMATION LOOP (60FPS KEPLERIAN ORBITS + GEODESIC WAVE DISPLACEMENT)
    // =========================================================================
    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      horizonMat.uniforms.uTime.value = t;
      coronaMat.uniforms.uTime.value = t;
      diskMat.uniforms.uTime.value = t;

      // Smooth gravitational tilt response
      curRot.x += (targetRot.x - curRot.x) * 0.045;
      curRot.y += (targetRot.y - curRot.y) * 0.045;

      blackHoleSystem.rotation.x = 0.32 + curRot.x;
      blackHoleSystem.rotation.y = curRot.y;
      blackHoleSystem.rotation.z = -0.22 + Math.sin(t * 0.4) * 0.04;

      // Subtle relativistic wave breathing on the high-poly geodesic lattice
      const posAttr = geodesicGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < posAttr.count; i++) {
        const bx = basePositions.getX(i);
        const by = basePositions.getY(i);
        const bz = basePositions.getZ(i);
        const wave = 1.0 + 0.032 * Math.sin(bx * 2.5 + t * 2.2) * Math.cos(by * 2.5 - t * 1.8);
        posAttr.setXYZ(i, bx * wave, by * wave, bz * wave);
      }
      posAttr.needsUpdate = true;

      geodesicMesh.rotation.y = -t * 0.22;
      geodesicMesh.rotation.z = t * 0.14;
      innerCageMesh.rotation.y = t * 0.35;
      innerCageMesh.rotation.x = -t * 0.2;

      arch1.rotation.z = t * 0.5;
      arch2.rotation.z = -t * 0.38;

      // Update Keplerian spiral particle positions
      const vPos = vortexGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        const a = orbitAngles[i] + t * orbitSpeeds[i];
        const r = orbitRadii[i];
        vPos.setXYZ(
          i,
          Math.cos(a) * r,
          verticalOffsets[i] + Math.sin(a * 2.0 + t) * 0.03,
          Math.sin(a) * r
        );
      }
      vPos.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      horizonGeo.dispose();
      horizonMat.dispose();
      coronaGeo.dispose();
      coronaMat.dispose();
      geodesicGeo.dispose();
      geodesicMat.dispose();
      innerCageGeo.dispose();
      innerCageMat.dispose();
      diskGeo.dispose();
      diskMat.dispose();
      arch1Geo.dispose();
      arch1Mat.dispose();
      arch2Geo.dispose();
      arch2Mat.dispose();
      vortexGeo.dispose();
      vortexMat.dispose();
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
        /* Feathered radial mask guarantees zero hard rectangular clipping edges */
        WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000000 62%, transparent 98%)',
        maskImage: 'radial-gradient(circle at 50% 50%, #000000 62%, transparent 98%)',
      }}
    />
  );
}
