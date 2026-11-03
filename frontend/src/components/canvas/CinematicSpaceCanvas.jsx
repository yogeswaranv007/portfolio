import React, { useRef, useState, useEffect, Suspense, Component } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import { CelestialSun } from './CelestialSun';
import { CelestialMoon } from './CelestialMoon';
import { StarField } from './StarField';

// Error Boundary for WebGL Fallback
class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err) {
    console.warn('WebGL context failed, activating CSS fallback background:', err);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Camera Rig for cinematic drift, mouse parallax, and scroll reaction
function CameraRig({ mouseRef, scrollRef, reducedMotion }) {
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Subtle cinematic camera drift
    const driftX = reducedMotion ? 0 : Math.sin(t * 0.12) * 0.45;
    const driftY = reducedMotion ? 0 : Math.cos(t * 0.16) * 0.35;

    const scrollOffset = Math.min((scrollRef.current || 0) * 0.005, 8);

    // Mouse parallax lerp
    const targetX = (mouseRef.current.x || 0) * 2.2 + driftX;
    const targetY = -(mouseRef.current.y || 0) * 1.8 + driftY - scrollOffset;

    camera.position.x += (targetX - camera.position.x) * 0.045;
    camera.position.y += (targetY - camera.position.y) * 0.045;
    camera.lookAt(0, -scrollOffset, 0);
  });

  return null;
}

// Scene content coordinating the Sun, Moon, and Stars
function CelestialScene({ isDark, isMobile, reducedMotion, mouseRef, scrollRef }) {
  // Transition state: 0 = Sun (Light), 1 = Moon (Dark)
  const transitionRef = useRef(isDark ? 1.0 : 0.0);
  const [transitionProgress, setTransitionProgress] = useState(isDark ? 1.0 : 0.0);

  // Celestial coordinates
  const celestialCoords = isMobile
    ? { x: 0, y: 9.5, z: -8, scale: 0.75 }
    : { x: 13.5, y: 7.5, z: -6, scale: 1.0 };

  useFrame((state, delta) => {
    const target = isDark ? 1.0 : 0.0;
    // 1.2s smooth cinematic eased transition
    const step = delta * 1.6;
    if (Math.abs(transitionRef.current - target) > 0.001) {
      transitionRef.current += (target - transitionRef.current) * Math.min(step, 0.15);
      setTransitionProgress(transitionRef.current);
    } else {
      transitionRef.current = target;
    }
  });

  const sunWeight = Math.max(0, 1.0 - transitionProgress);
  const moonWeight = Math.max(0, transitionProgress);

  // Position offsets for setting / rising
  const sunPos = [
    celestialCoords.x,
    celestialCoords.y - (1 - sunWeight) * 8,
    celestialCoords.z,
  ];

  const moonPos = [
    celestialCoords.x,
    celestialCoords.y - (1 - moonWeight) * 8,
    celestialCoords.z,
  ];

  return (
    <>
      <CameraRig
        mouseRef={mouseRef}
        scrollRef={scrollRef}
        reducedMotion={reducedMotion}
      />

      {/* Ambient Lighting that shifts from warm daylight to cool starlight */}
      <ambientLight
        color={isDark ? '#1e1b4b' : '#fef3c7'}
        intensity={isDark ? 0.6 : 0.95}
      />

      {/* Sun Theme (Light Mode) */}
      <CelestialSun
        position={sunPos}
        scale={celestialCoords.scale * (0.35 + 0.65 * sunWeight)}
        opacity={sunWeight}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      {/* Moon Theme (Dark Mode) */}
      <CelestialMoon
        position={moonPos}
        scale={celestialCoords.scale * (0.35 + 0.65 * moonWeight)}
        opacity={moonWeight}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      {/* 3-Layer Depth-Sorted Starfield & Shooting Stars (Dark Mode) */}
      <StarField
        opacity={moonWeight}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      {/* Cinematic Post-Processing Pipeline: Bloom, Vignette, Film Grain */}
      <EffectComposer multisampling={0} disableNormalPass>
        <Bloom
          luminanceThreshold={isDark ? 0.35 : 0.45}
          luminanceSmoothing={0.85}
          intensity={isDark ? 0.75 : 1.1}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.22} darkness={isDark ? 0.58 : 0.35} />
        <Noise opacity={reducedMotion ? 0.01 : 0.022} />
      </EffectComposer>
    </>
  );
}

export default function CinematicSpaceCanvas() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  const [reducedMotion, setReducedMotion] = useState(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  const [isTabVisible, setIsTabVisible] = useState(true);

  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  // Listen to theme mutations on <html>
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains('dark');
      setIsDark(dark);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  // Listen to mouse, scroll, resize, tab visibility, and reduced motion
  useEffect(() => {
    const onMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY || 0;
    };

    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const onVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = (e) => setReducedMotion(e.matches);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibilityChange);
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  // Static CSS fallback in case WebGL is unsupported
  const cssFallback = (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ${
        isDark ? 'bg-gradient-to-b from-[#050814] via-[#0b1022] to-[#04060d]' : 'bg-gradient-to-b from-[#fef3c7] via-[#fffbeb] to-[#f8fafc]'
      }`}
    />
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 🌙 Dark Mode Cinematic Cosmic Gradient */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(ellipse 85% 75% at 80% 20%, rgba(30, 58, 138, 0.4) 0%, rgba(15, 23, 42, 0.75) 45%, rgba(5, 8, 20, 0.96) 80%, #050814 100%)',
        }}
      />

      {/* ☀️ Light Mode Cinematic Warm Solar Daylight Gradient (Pale gold to peach to soft sky blue) */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isDark ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background:
            'radial-gradient(ellipse 85% 75% at 80% 20%, rgba(254, 240, 138, 0.5) 0%, rgba(254, 215, 170, 0.3) 30%, rgba(224, 242, 254, 0.35) 60%, #f8fafc 100%)',
        }}
      />

      {/* Full-screen R3F WebGL Canvas (Pauses render loop on hidden tab) */}
      {isTabVisible && (
        <WebGLErrorBoundary fallback={cssFallback}>
          <Canvas
            camera={{ position: [0, 0, 24], fov: 60 }}
            dpr={[1, 1.5]}
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: 'high-performance',
            }}
            className="absolute inset-0 pointer-events-none"
          >
            <Suspense fallback={null}>
              <CelestialScene
                isDark={isDark}
                isMobile={isMobile}
                reducedMotion={reducedMotion}
                mouseRef={mouseRef}
                scrollRef={scrollRef}
              />
            </Suspense>
          </Canvas>
        </WebGLErrorBoundary>
      )}
    </div>
  );
}

