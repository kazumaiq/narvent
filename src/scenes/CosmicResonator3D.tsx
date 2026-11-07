import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CosmicResonator3DProps {
  /** Subtle accent color synced to active release era */
  accentColor?: string;
}

/**
 * CosmicResonator3D — Dark-Editorial Gargantua Black Hole Sculpture
 * Designed specifically to match NARVENT's stark white + deep void (#020206) + subtle neon accent palette:
 * - Zero wireframe cages or cartoon rings.
 * - Pitch-black 3D Schwarzschild Event Horizon sphere that physically occludes the rear disk.
 * - Custom GLSL Gravitational Lensing billboard (Einstein upper/lower bent light arcs + Doppler photon ring).
 * - Custom GLSL 3D Concentric Filament Accretion Disk with FBM plasma lanes & Doppler beaming.
 * - 4,000 ultra-fine pinpoint monochrome/accent micro-particles in Keplerian orbit.
 * - Interactive click-and-drag 3D orbit + passive cursor gravity + smooth era color transitions.
 */
export default function CosmicResonator3D({ accentColor = '#c084fc' }: CosmicResonator3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const targetAccentRef = useRef<THREE.Color>(new THREE.Color(accentColor));

  useEffect(() => {
    targetAccentRef.current.set(accentColor);
  }, [accentColor]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const w0 = container.clientWidth || 520;
    const h0 = container.clientHeight || 480;
    const aspect0 = w0 / h0;

    const camera = new THREE.PerspectiveCamera(36, aspect0, 0.1, 100);
    const getCamZ = (asp: number) =>
      asp < 1.08 ? 15.0 / Math.min(1, Math.max(asp, 0.65)) : 13.7;
    camera.position.set(0, 0.15, getCamZ(aspect0));

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w0, h0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const currentAccent = new THREE.Color(accentColor);

    // Master 3D Singularity Group (tilted for iconic Gargantua silhouette)
    const singularityGroup = new THREE.Group();
    const baseTiltX = 0.24;
    const baseTiltZ = -0.19;
    singularityGroup.rotation.x = baseTiltX;
    singularityGroup.rotation.z = baseTiltZ;
    scene.add(singularityGroup);

    // =========================================================================
    // 1. GRAVITATIONAL LENSING HALO BILLBOARD (EINSTEIN ARCS + PHOTON RING)
    // =========================================================================
    // Always faces the camera, sits centered at the singularity to render the
    // bent light from behind the black hole curving over the top & bottom poles.
    const lensingGeo = new THREE.PlaneGeometry(9.2, 9.2);
    const lensingMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uAccent: { value: currentAccent.clone() },
        uTiltZ: { value: baseTiltZ },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv * 2.0 - 1.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uAccent;
        uniform float uTiltZ;
        varying vec2 vUv;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
            f.y
          );
        }

        void main() {
          // Rotate UV to align Einstein lensing arcs with the tilted accretion disk
          float c = cos(-uTiltZ);
          float s = sin(-uTiltZ);
          vec2 p = mat2(c, -s, s, c) * vUv;

          float r = length(p);
          float rs = 0.285; // Normalized Schwarzschild shadow radius on the 9.2u quad (9.2 * 0.285 / 2 = 1.31u)

          // Inside event horizon shadow: transparent here (3D occluder sphere draws pure black)
          if (r < rs * 0.96) {
            discard;
          }

          float angle = atan(p.y, p.x);

          // Razor-sharp relativistic photon ring right at r = rs
          float photonDist = abs(r - rs);
          float photonRing = exp(-photonDist * 68.0);

          // Einstein bent-light upper and lower arches (back of disk lensed over poles)
          float archSpread = max(r - rs, 0.0);
          float poleFactor = pow(abs(sin(angle)), 1.45);
          float archFilaments = 0.65 + 0.35 * sin(archSpread * 105.0 - uTime * 1.5);
          float einsteinArch = exp(-archSpread * 10.5) * poleFactor * archFilaments * smoothstep(rs * 0.99, rs * 1.035, r);

          // Subtle outer atmospheric gravitational glow
          float outerGlow = exp(-archSpread * 5.4) * 0.24;

          // Relativistic Doppler beaming: left/approaching side is brighter & whiter
          float doppler = 0.72 + 0.48 * (-p.x / max(r, 0.001));
          doppler = clamp(doppler, 0.32, 1.35);

          // Fine animated filament shimmer along the lensed arches
          float shimmer = 0.84 + 0.16 * noise(vec2(angle * 6.0 - uTime * 1.6, r * 24.0));

          float totalIntensity = (photonRing * 1.35 + einsteinArch * 0.85 + outerGlow) * doppler * shimmer;

          // Radial mask to ensure zero square quad boundary
          float edgeFade = smoothstep(0.98, 0.55, r);
          totalIntensity *= edgeFade;

          // Editorial palette: stark white photon core + silver/accent outer corona
          vec3 starkWhite = vec3(1.0, 1.0, 1.0);
          vec3 coldSilver = vec3(0.78, 0.82, 0.90);
          vec3 tint = mix(coldSilver, uAccent, 0.55);

          vec3 col = mix(tint, starkWhite, clamp(photonRing * 1.2 + einsteinArch * 0.45, 0.0, 1.0));

          gl_FragColor = vec4(col * totalIntensity, clamp(totalIntensity, 0.0, 1.0));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lensingQuad = new THREE.Mesh(lensingGeo, lensingMat);
    scene.add(lensingQuad);

    // =========================================================================
    // 2. TRUE 3D SCHWARZSCHILD EVENT HORIZON SPHERE (PURE VOID OCCLUDER)
    // =========================================================================
    // Physically occludes the back half of the 3D accretion disk while the front
    // half passes in front of it!
    const horizonGeo = new THREE.SphereGeometry(1.30, 96, 96);
    const horizonMat = new THREE.ShaderMaterial({
      uniforms: {
        uAccent: { value: currentAccent.clone() },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPos;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewPos = -mvPos.xyz;
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform vec3 uAccent;
        varying vec3 vNormal;
        varying vec3 vViewPos;
        void main() {
          vec3 n = normalize(vNormal);
          vec3 v = normalize(vViewPos);
          float ndotv = max(dot(n, v), 0.0);
          // Ultra-thin razor grazing limb in stark white, interior is pure #010103 void
          float rim = pow(1.0 - ndotv, 9.0);
          vec3 col = mix(vec3(0.004, 0.004, 0.012), mix(uAccent, vec3(1.0), 0.75), rim * 0.95);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
      depthWrite: true,
      depthTest: true,
    });
    const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
    singularityGroup.add(horizonMesh);

    // =========================================================================
    // 3. 3D CONCENTRIC FILAMENT ACCRETION DISK (GARGANTUA PLASMA RINGS)
    // =========================================================================
    const diskGeo = new THREE.RingGeometry(1.36, 4.45, 256, 24);
    const diskMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uAccent: { value: currentAccent.clone() },
      },
      vertexShader: `
        varying vec3 vLocalPos;
        varying vec3 vViewPos;
        void main() {
          vLocalPos = position;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewPos = mvPos.xyz;
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uAccent;
        varying vec3 vLocalPos;
        varying vec3 vViewPos;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
            f.y
          );
        }

        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          for (int i = 0; i < 4; i++) {
            v += a * noise(p);
            p *= 2.04;
            a *= 0.5;
          }
          return v;
        }

        void main() {
          float r = length(vLocalPos.xy);
          float normR = clamp((r - 1.36) / (4.45 - 1.36), 0.0, 1.0);
          float theta = atan(vLocalPos.y, vLocalPos.x);

          // Keplerian differential angular shear
          float shear = theta + uTime * (1.8 / pow(r, 1.15)) - normR * 7.5;

          // Concentric high-definition rings + spiral filament turbulence
          float concentric = 0.55 + 0.45 * sin(normR * 52.0 - fbm(vec2(normR * 12.0, shear)) * 3.5);
          float spiral = fbm(vec2(normR * 16.0, sin(shear) * 2.2 + cos(shear) * 2.2));
          float density = concentric * (0.45 + 0.75 * spiral);

          // Smooth inner & outer Gaussian envelope (zero hard ring cutoffs)
          float innerFade = smoothstep(0.0, 0.07, normR);
          float outerFade = pow(1.0 - normR, 1.95);
          float alpha = innerFade * outerFade * density;

          // Relativistic Doppler beaming: left side approaching camera glows hotter
          float doppler = 0.72 + 0.52 * (-vLocalPos.x / max(r, 0.001));
          doppler = clamp(doppler, 0.28, 1.4);

          // Editorial monochrome-first color ramp:
          // Inner photon edge -> pure white (#ffffff)
          // Mid disk -> cool silver-white blended subtly with era accent
          // Outer dust -> deep muted obsidian-accent
          vec3 hotWhite = vec3(1.0, 1.0, 1.0);
          vec3 midSilver = mix(vec3(0.82, 0.85, 0.92), uAccent, 0.42);
          vec3 outerDust = mix(vec3(0.18, 0.20, 0.28), uAccent, 0.55);

          vec3 col = mix(hotWhite, midSilver, smoothstep(0.0, 0.28, normR));
          col = mix(col, outerDust, smoothstep(0.28, 0.88, normR));

          col *= doppler * (1.15 + 0.45 * (1.0 - normR));

          gl_FragColor = vec4(col, clamp(alpha * 0.92, 0.0, 1.0));
        }
      `,
      side: THREE.DoubleSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const diskMesh = new THREE.Mesh(diskGeo, diskMat);
    diskMesh.rotation.x = Math.PI / 2;
    singularityGroup.add(diskMesh);

    // =========================================================================
    // 4. ULTRA-THIN ARCHITECTURAL MERIDIAN RING (TIES 3D TO 1PX UI HAIRLINES)
    // =========================================================================
    const meridianPts: THREE.Vector3[] = [];
    const segments = 180;
    const meridianRadius = 4.55;
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      meridianPts.push(new THREE.Vector3(Math.cos(a) * meridianRadius, 0, Math.sin(a) * meridianRadius));
    }
    const meridianGeo = new THREE.BufferGeometry().setFromPoints(meridianPts);
    const meridianMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.11,
    });
    const meridianLine = new THREE.Line(meridianGeo, meridianMat);
    singularityGroup.add(meridianLine);

    // =========================================================================
    // 5. 4,000 PINPOINT MICRO-STARS IN KEPLERIAN ORBIT (MATCHES STARFIELD)
    // =========================================================================
    const particleCount = 4000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const orbitRadii = new Float32Array(particleCount);
    const orbitAngles = new Float32Array(particleCount);
    const orbitSpeeds = new Float32Array(particleCount);
    const verticalOffsets = new Float32Array(particleCount);

    const cWhite = new THREE.Color(0xffffff);
    const cSilver = new THREE.Color(0x94a3b8);

    for (let i = 0; i < particleCount; i++) {
      const t = Math.pow(Math.random(), 1.65);
      const r = 1.42 + t * 3.15;
      const angle = Math.random() * Math.PI * 2;
      const ySpread = (0.02 + t * 0.22) * (Math.random() - 0.5);

      orbitRadii[i] = r;
      orbitAngles[i] = angle;
      orbitSpeeds[i] = 1.35 / Math.pow(r, 1.2);
      verticalOffsets[i] = ySpread;

      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = ySpread;
      positions[i * 3 + 2] = Math.sin(angle) * r;

      // 80% crisp editorial white & silver, 20% subtle violet/blue stardust
      const col = Math.random() < 0.55 ? cWhite : cSilver;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const vortexGeo = new THREE.BufferGeometry();
    vortexGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    vortexGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext('2d')!;
    const pGrad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
    pGrad.addColorStop(0, 'rgba(255,255,255,1)');
    pGrad.addColorStop(0.45, 'rgba(255,255,255,0.65)');
    pGrad.addColorStop(1, 'rgba(0,0,0,0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 16, 16);
    const pTex = new THREE.CanvasTexture(pCanvas);

    const vortexMat = new THREE.PointsMaterial({
      size: 0.048,
      map: pTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.82,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const vortexPoints = new THREE.Points(vortexGeo, vortexMat);
    singularityGroup.add(vortexPoints);

    // =========================================================================
    // 6. INTERACTIVE CLICK-AND-DRAG ORBIT + PASSIVE CURSOR GRAVITY
    // =========================================================================
    let isDragging = false;
    let prevPointer = { x: 0, y: 0 };
    const dragOffset = { x: 0, y: 0 };
    const hoverOffset = { x: 0, y: 0 };
    const curRot = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevPointer = { x: e.clientX, y: e.clientY };
      container.style.cursor = 'grabbing';
    };

    const onPointerUp = () => {
      isDragging = false;
      container.style.cursor = 'grab';
    };

    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      hoverOffset.y = nx * 0.22;
      hoverOffset.x = ny * 0.18;

      if (isDragging) {
        const dx = e.clientX - prevPointer.x;
        const dy = e.clientY - prevPointer.y;
        dragOffset.y += dx * 0.006;
        dragOffset.x = Math.max(-0.55, Math.min(0.55, dragOffset.x + dy * 0.005));
        prevPointer = { x: e.clientX, y: e.clientY };
      }
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 520;
      const h = container.clientHeight || 480;
      const aspect = w / h;
      camera.aspect = aspect;
      camera.position.z = getCamZ(aspect);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // =========================================================================
    // 7. ANIMATION LOOP
    // =========================================================================
    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smoothly transition accent color when user switches release eras
      currentAccent.lerp(targetAccentRef.current, 0.05);
      lensingMat.uniforms.uAccent.value.copy(currentAccent);
      horizonMat.uniforms.uAccent.value.copy(currentAccent);
      diskMat.uniforms.uAccent.value.copy(currentAccent);

      lensingMat.uniforms.uTime.value = t;
      diskMat.uniforms.uTime.value = t;

      // Gentle decay on manual drag so it settles gracefully
      if (!isDragging) {
        dragOffset.x *= 0.992;
        dragOffset.y *= 0.992;
      }

      const targetX = baseTiltX + hoverOffset.x + dragOffset.x;
      const targetY = hoverOffset.y + dragOffset.y;

      curRot.x += (targetX - curRot.x) * 0.05;
      curRot.y += (targetY - curRot.y) * 0.05;

      const dynamicTiltZ = baseTiltZ + Math.sin(t * 0.35) * 0.03;
      singularityGroup.rotation.x = curRot.x;
      singularityGroup.rotation.y = curRot.y;
      singularityGroup.rotation.z = dynamicTiltZ;

      // Keep lensing billboard facing camera and synced with tilt
      lensingQuad.quaternion.copy(camera.quaternion);
      lensingMat.uniforms.uTiltZ.value = dynamicTiltZ + curRot.y * 0.25;

      // Update Keplerian micro-star orbits
      const vPos = vortexGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        const a = orbitAngles[i] + t * orbitSpeeds[i];
        const r = orbitRadii[i];
        vPos.setXYZ(i, Math.cos(a) * r, verticalOffsets[i], Math.sin(a) * r);
      }
      vPos.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', handleResize);

      lensingGeo.dispose();
      lensingMat.dispose();
      horizonGeo.dispose();
      horizonMat.dispose();
      diskGeo.dispose();
      diskMat.dispose();
      meridianGeo.dispose();
      meridianMat.dispose();
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
        touchAction: 'none',
        WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000000 66%, transparent 99%)',
        maskImage: 'radial-gradient(circle at 50% 50%, #000000 66%, transparent 99%)',
      }}
    />
  );
}
