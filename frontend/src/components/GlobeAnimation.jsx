import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GlobeAnimation = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const landCoordsRef = useRef([]);
  const timerRef = useRef(0);
  const isWaitingRef = useRef(true);
  const photonGroupRef = useRef(null);
  const rippleRef = useRef(null);
  const globeGroupRef = useRef(null);
  const worldGroupRef = useRef(null);

  const trailDots = 25;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    const globeGroup = new THREE.Group();
    const worldGroup = new THREE.Group();
    globeGroup.add(worldGroup);
    globeGroup.rotation.z = 0.41; // Axial Tilt
    scene.add(globeGroup);

    globeGroupRef.current = globeGroup;
    worldGroupRef.current = worldGroup;

    // Fetch and process land data
    fetch(
      'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson'
    )
      .then((res) => res.json())
      .then((data) => {
        processLand(data, scene, worldGroup);
        setupElements(worldGroup);
        setTimeout(jump, 1000);
        animate(scene, renderer, camera, worldGroup);
      })
      .catch((err) => console.error('Error loading land data:', err));

    // Handle window resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const processLand = (data, scene, worldGroup) => {
    const radius = 7;
    const positions = [];
    data.features.forEach((feature) => {
      feature.geometry.coordinates.forEach((polygon) => {
        const points = Array.isArray(polygon[0][0]) ? polygon[0] : polygon;
        points.forEach((coord) => {
          const phi = (90 - coord[1]) * (Math.PI / 180);
          const theta = (coord[0] + 180) * (Math.PI / 180);
          const v = new THREE.Vector3(
            -(radius * Math.sin(phi) * Math.cos(theta)),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
          );
          positions.push(v.x, v.y, v.z);
          landCoordsRef.current.push(v);
        });
      });
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.045,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    worldGroup.add(new THREE.Points(geometry, material));
  };

  const setupElements = (worldGroup) => {
    const photonGroup = new THREE.Group();
    // Silver metallic reflective color
    const silverColor = 0xd3d3d3;
    const silverGlow = 0xffffff;

    for (let i = 0; i < trailDots; i++) {
      const pMat = new THREE.MeshBasicMaterial({
        color: silverColor,
        transparent: true,
        opacity: (1 - i / trailDots) * 0.9,
        emissive: silverGlow,
        emissiveIntensity: 0.6 + (i / trailDots) * 0.4,
      });
      const pMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.12 * (1 - i / trailDots), 8, 8),
        pMat
      );
      photonGroup.add(pMesh);
    }
    const light = new THREE.PointLight(0xffffff, 4, 8);
    photonGroup.add(light);
    photonGroup.visible = false;
    worldGroup.add(photonGroup);

    photonGroupRef.current = photonGroup;

    const ringGeom = new THREE.RingGeometry(0.005, 0.01, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });
    const ripple = new THREE.Mesh(ringGeom, ringMat);
    worldGroup.add(ripple);

    rippleRef.current = ripple;
  };

  const jump = () => {
    if (landCoordsRef.current.length < 2) return;

    const worldGroup = worldGroupRef.current;
    const photonGroup = photonGroupRef.current;

    const visibleLand = landCoordsRef.current.filter((v) => {
      const worldPos = v.clone().applyMatrix4(worldGroup.matrixWorld);
      // Only visible in camera field of view: front-facing hemisphere (z > 0)
      return worldPos.z > 1;
    });

    const targetPool =
      visibleLand.length > 5 ? visibleLand : landCoordsRef.current;
    const start = targetPool[Math.floor(Math.random() * targetPool.length)];
    const end = visibleLand.length > 0
      ? visibleLand[Math.floor(Math.random() * visibleLand.length)]
      : targetPool[Math.floor(Math.random() * targetPool.length)];

    const mid = start.clone().lerp(end, 0.5).normalize().multiplyScalar(11);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);

    photonGroup.userData.curve = curve;
    photonGroup.userData.endPos = end;

    timerRef.current = 0;
    isWaitingRef.current = false;
    photonGroup.visible = true;
  };

  const animate = (scene, renderer, camera, worldGroup) => {
    const animationId = requestAnimationFrame(() => animate(scene, renderer, camera, worldGroup));

    worldGroup.rotation.y += 0.003;
    worldGroup.updateMatrixWorld();

    const photonGroup = photonGroupRef.current;
    const ripple = rippleRef.current;

    if (!isWaitingRef.current && photonGroup.userData.curve) {
      timerRef.current += 0.003;

      if (timerRef.current >= 1) {
        isWaitingRef.current = true;
        photonGroup.visible = false;

        ripple.position.copy(photonGroup.userData.endPos);
        ripple.lookAt(new THREE.Vector3(0, 0, 0));
        ripple.scale.set(1, 1, 1);
        ripple.material.opacity = 1;

        setTimeout(jump, 1000);
      } else {
        for (let i = 0; i < trailDots; i++) {
          const tOffset = Math.max(0, timerRef.current - i * 0.004);
          const pos = photonGroup.userData.curve.getPoint(tOffset);
          photonGroup.children[i].position.copy(pos);
        }
      }
    }

    if (ripple.material.opacity > 0) {
      ripple.scale.multiplyScalar(1.12);
      ripple.material.opacity -= 0.02;
    }

    renderer.render(scene, camera);
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden bg-black"
      style={{ display: 'block' }}
    />
  );
};

export default GlobeAnimation;
