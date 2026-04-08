import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, ChartArea, ChartPie, ChartPieIcon, Clock1, Layers, Play } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';

gsap.registerPlugin(useGSAP);

const GLTFTextModel = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Get Initial Size
    const getContainerSize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight || 400; 
      return { width, height };
    };
    let { width, height } = getContainerSize();

    // Scene Setup
    const scene = new THREE.Scene();
    
    // Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    
    // Helper to calculate camera distance based on screen width to prevent clipping
    const getCameraZ = (vw) => {
      if (vw < 640) return 30; // Mobile: pull way back so it fits
      if (vw < 1024) return 20; // Tablet: slightly pulled back
      return 15; // Desktop: original distance
    };
    camera.position.set(0, 0, getCameraZ(width));

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    mountRef.current.appendChild(renderer.domElement);

    // Render initially
    renderer.setClearColor(0x000000, 0); // Transparent background

    // Initialize RectAreaLight for the bottom panel effect
    RectAreaLightUniformsLib.init();

    // Lighting (crucial for silver material reflections)
    // Raised ambient slightly so it's not "too dark" globally
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    // Massive Panel Light shining up from the bottom (width 40 to cover all text, height 10)
    // This creates a broad, glowing white/silver reflection pool across the bottom geometry
    const bottomPanelLight = new THREE.RectAreaLight(0xffffff, 15.0, 40, 10);
    bottomPanelLight.position.set(0, -6, 2); // Positioned low and slightly forward
    bottomPanelLight.lookAt(0, 0, 0); // Pointed directly up at the center of the text
    scene.add(bottomPanelLight);

    // Keep a subtle front fill so the centers aren't entirely empty, but bumped slightly
    const frontLight = new THREE.DirectionalLight(0xffffff, 0.5);
    frontLight.position.set(0, 0, 15);
    scene.add(frontLight);
    
    // Far edge Rim lights to define the extreme left/right bounds (but not the center faces)
    const leftRim = new THREE.DirectionalLight(0xffffff, 5.0);
    leftRim.position.set(-20, 0, -2);
    scene.add(leftRim);
    
    const rightRim = new THREE.DirectionalLight(0xffffff, 5.0);
    rightRim.position.set(20, 0, -2);
    scene.add(rightRim);

    // The Realistic Silver Material (Brightened up)
    const silverMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xa9b0bd,           // Brighter silver base color to fix "too dark"
      metalness: 1.0,            // 100% metal
      roughness: 0.15,           // Slightly softer roughness to spread the bottom panel light beautifully
      clearcoat: 1.0,            // Glossy protective layer over it
      clearcoatRoughness: 0.05,  // Slight blur on the clearcoat
      reflectivity: 1.0          // Maximum light reflection
    });

    let modelGroup;
    let wrapper;
    const loader = new GLTFLoader();
    
    // Load the provided GLTF model
    loader.load('/images/model.gltf', (gltf) => {
      modelGroup = gltf.scene;
      
      // Create a wrapper group for safe scaling and rotation
      wrapper = new THREE.Group();
      scene.add(wrapper);

      // Apply the silver material to all meshes in the model
      modelGroup.traverse((child) => {
        if (child.isMesh) {
          child.material = silverMaterial;
        }
      });

      // Step 1: Center the model using its exact bounding box
      const box = new THREE.Box3().setFromObject(modelGroup);
      const center = new THREE.Vector3();
      box.getCenter(center);
      const size = new THREE.Vector3();
      box.getSize(size);
      
      // Shift the model itself backward by its bounds center so its true center rests at (0, 0, 0)
      modelGroup.position.sub(center);
      wrapper.add(modelGroup);

      // Step 2: Scale the wrapper so the word "Quasar" fits visually in the container
      // Make it noticeably bigger as requested
      const targetWidth = 30; 
      const scale = targetWidth / Math.max(size.x, 1); // fallback to 1 to avoid div zero
      wrapper.scale.set(scale, scale, scale);

      // Move it down slightly so it's closer to the text below
      wrapper.position.y -= 1.5;

      // If the model was created flat on the ground (XZ plane), uncomment the following line to stand it up.
      // Often, GLTFs map Z up or Y up differently:
      // wrapper.rotation.x = Math.PI / 2;
    });

    // Add continuous render loop WITHOUT constant rotation wobble
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const { width, height } = getContainerSize();
      camera.aspect = width / height;
      camera.position.z = getCameraZ(width);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      // Optional: adjust lighting or scales specifically for mobile here if needed
    };
    
    window.addEventListener('resize', handleResize);

    const currentMount = mountRef.current;

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="flex justify-center items-center w-full max-w-[1200px] h-[200px] sm:h-[300px] md:h-[400px] mx-auto pointer-events-none"
    />
  );
};

const HeroSection = () => {
  const containerRef = useRef(null);

  useGSAP((context, contextSafe) => {
    const tl = gsap.timeline();

    // Parallax background elements
    gsap.to('.hero-bg-video', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[90vh] flex flex-col justify-center overflow-hidden bg-black pt-24 md:pt-26 pb-20 md:pb-40"
    >
      {/* Ambient background styling */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Soft, blended video background for motion */}
        <video
          className="hero-bg-video absolute top-0 left-0 w-full h-[120%] object-cover mix-blend-screen opacity-60"
          autoPlay
          muted
          loop
          playsInline
          src="/videos/Quasar2.mp4"
        />

        {/* Sophisticated gradient blurs */}
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vh] max-w-[800px] bg-gradient-to-r from-slate-700/30 to-slate-800/20 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] -right-[20%] w-[80vw] h-[80vh] max-w-[1000px] bg-gradient-to-l from-slate-600/20 to-transparent rounded-full blur-[140px]" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-0" />
      </div>

      {/* Main Foreground Content */}
      <div className="relative z-10 w-full px-6 md:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto w-full">

          {/* Main Copy */}
          <div className="flex flex-col items-center text-center pt-16 md:pt-24 max-w-4xl mx-auto">
            
            {/* Real GLTF 3D Body Representation */}
            <div className="relative mb-2 flex justify-center w-full z-50">
              <GLTFTextModel />
            </div>

            <p className="hero-elem text-lg md:text-xl lg:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl mb-6 md:mb-8 mx-auto -mt-6">
              The ultimate scheduler.
            </p>

            <div className="hero-elem flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link
                to="/products/quasar"
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-transparent border border-white text-white font-medium rounded-full overflow-hidden hover:bg-white/5 shadow-[0_4px_20px_rgba(255,255,255,0.05)] hover:shadow-[0_20px_40px_-5px_rgba(255,255,255,0.1)] transition-all duration-500 text-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Know More
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Downward Scroll Indicator Arrow */}
      <div className="absolute bottom-8 left-6 md:left-12 z-20 opacity-50 hover:opacity-100 transition-opacity duration-500">
        <div>
          <ArrowDown className="text-white w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
