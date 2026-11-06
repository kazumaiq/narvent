import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function BackgroundScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04040c, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // --- Starfield with dynamic sizing & color ---
    const starCount = 2800;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    const palette = [
      new THREE.Color('#4f75ff'), // Electric Blue
      new THREE.Color('#7093ff'), // Bright Electric
      new THREE.Color('#6b4d96'), // Muted Violet
      new THREE.Color('#c3b4e0'), // Soft Lavender
      new THREE.Color('#ffffff'), // Pure White
      new THREE.Color('#a4a4be'), // Subtle Silver
    ];

    for (let i = 0; i < starCount; i++) {
      // Distribute in a spherical cylinder volume
      const radius = 30 + Math.random() * 220;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      starPositions[i * 3] = radius * Math.cos(phi) * Math.sin(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi);
      starPositions[i * 3 + 2] = -120 + Math.random() * 240;

      const col = palette[Math.floor(Math.random() * palette.length)];
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;

      starSizes[i] = 1.0 + Math.random() * 2.8;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    // Particle texture generator (smooth circular glow)
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.25, 'rgba(212,200,245,0.75)');
      grad.addColorStop(0.65, 'rgba(79,117,255,0.2)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createParticleTexture();

    const starMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // --- Floating Cosmic Dust (Slow floating foreground particles) ---
    const dustCount = 450;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustScales = new Float32Array(dustCount);

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 160;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 160;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 90;
      dustScales[i] = 0.8 + Math.random() * 2.5;
    }

    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      color: 0x98a8f8,
      size: 1.6,
      map: particleTexture,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dustField = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustField);

    // --- Dynamic Procedural Nebula Clouds ---
    const nebulaGroup = new THREE.Group();
    const nebulaCount = 14;
    const nebulaColors = [0x161244, 0x221354, 0x0c255e, 0x3d1768, 0x140a32];

    const createNebulaTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
      grad.addColorStop(0, 'rgba(255,255,255,0.7)');
      grad.addColorStop(0.35, 'rgba(120,100,220,0.35)');
      grad.addColorStop(0.7, 'rgba(40,30,100,0.1)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
      return new THREE.CanvasTexture(canvas);
    };

    const nebulaTexture = createNebulaTexture();

    for (let i = 0; i < nebulaCount; i++) {
      const planeGeo = new THREE.PlaneGeometry(160 + Math.random() * 120, 160 + Math.random() * 120);
      const col = nebulaColors[i % nebulaColors.length];
      const planeMat = new THREE.MeshBasicMaterial({
        color: col,
        map: nebulaTexture,
        transparent: true,
        opacity: 0.22 + Math.random() * 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(planeGeo, planeMat);
      mesh.position.set(
        (Math.random() - 0.5) * 180,
        (Math.random() - 0.5) * 140,
        -100 + Math.random() * 80
      );
      mesh.rotation.z = Math.random() * Math.PI * 2;
      nebulaGroup.add(mesh);
    }
    scene.add(nebulaGroup);

    // --- Volumetric Light Glow ---
    const light = new THREE.PointLight(0x6b8cff, 2.5, 300);
    light.position.set(0, 20, 40);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0x0c0c28, 1.2);
    scene.add(ambient);

    // --- Cursor & Scroll tracking ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const scroll = { y: 0, targetY: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      scroll.targetY = scrollMax > 0 ? window.scrollY / scrollMax : 0;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', onResize);

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      scroll.y += (scroll.targetY - scroll.y) * 0.05;

      // Camera parallax based on mouse and scroll
      camera.position.x = mouse.x * 6;
      camera.position.y = mouse.y * 5 - scroll.y * 25;
      camera.lookAt(0, -scroll.y * 20, 0);

      // Rotate starfield slowly
      starField.rotation.y = elapsedTime * 0.015;
      starField.rotation.x = elapsedTime * 0.007;

      // Dust float
      dustField.rotation.y = -elapsedTime * 0.02;
      dustField.position.y = Math.sin(elapsedTime * 0.4) * 3;

      // Nebula rotation & subtle pulse
      nebulaGroup.children.forEach((cloud, idx) => {
        cloud.rotation.z += 0.0008 * (idx % 2 === 0 ? 1 : -1);
      });

      // Shift light based on cursor
      light.position.x = mouse.x * 40;
      light.position.y = 20 + mouse.y * 25;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      starGeometry.dispose();
      starMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="bg-canvas-container" />;
}
