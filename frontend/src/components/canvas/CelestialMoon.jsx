import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

// Custom Fresnel Glow Shader for Ethereal Lunar Atmosphere
const MoonHaloShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewDir;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewDir = -normalize(mvPosition.xyz);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform float uOpacity;
    uniform vec3 uColor;

    varying vec3 vNormal;
    varying vec3 vViewDir;

    void main() {
      float NdotV = abs(dot(vNormal, vViewDir));
      float fresnel = pow(1.0 - NdotV, 3.0);
      gl_FragColor = vec4(uColor, fresnel * uOpacity * 0.7);
    }
  `,
};

// Generates an anamorphic cool moonlight flare texture
function getMoonFlareTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(256, 32, 2, 256, 32, 240);
  grad.addColorStop(0.0, 'rgba(255, 255, 255, 0.95)');
  grad.addColorStop(0.15, 'rgba(186, 230, 253, 0.75)');
  grad.addColorStop(0.4, 'rgba(56, 189, 248, 0.35)');
  grad.addColorStop(0.8, 'rgba(30, 58, 138, 0.1)');
  grad.addColorStop(1.0, 'rgba(30, 58, 138, 0.0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 64);

  return new THREE.CanvasTexture(canvas);
}

export function CelestialMoon({
  position = [13.5, 7.5, -6],
  scale = 1.0,
  opacity = 1.0,
  isMobile = false,
  reducedMotion = false,
}) {
  const groupRef = useRef();
  const moonMeshRef = useRef();
  const ringRef = useRef();
  const satelliteBeaconRef = useRef();
  const orbitGroupRef = useRef();

  // Load NASA / Solar System Scope photoreal color & displacement maps
  const [colorMap, displacementMap] = useTexture([
    '/textures/moon_color.webp',
    '/textures/moon_displacement.webp',
  ]);

  const moonFlareTexture = useMemo(() => getMoonFlareTexture(), []);

  const haloUniforms = useMemo(
    () => ({
      uOpacity: { value: opacity },
      uColor: { value: new THREE.Color('#93c5fd') },
    }),
    []
  );

  // Generate an inclined orbital trajectory ellipse
  const orbitCurvePoints = useMemo(() => {
    const points = [];
    const radiusX = 4.8;
    const radiusY = 3.6;
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * radiusX, Math.sin(angle) * radiusY, 0));
    }
    return points;
  }, []);

  const orbitLineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(orbitCurvePoints);
    return geo;
  }, [orbitCurvePoints]);

  useFrame((state, delta) => {
    if (opacity <= 0.01) return;

    const t = state.clock.getElapsedTime();
    haloUniforms.uOpacity.value = opacity;

    if (!reducedMotion) {
      // Very slow cinematic lunar rotation
      if (moonMeshRef.current) {
        moonMeshRef.current.rotation.y += 0.0012;
      }
      // Slowly rotate orbital ring
      if (ringRef.current) {
        ringRef.current.rotation.z += 0.002;
      }
      // Rotate orbital trajectory
      if (orbitGroupRef.current) {
        orbitGroupRef.current.rotation.y = Math.sin(t * 0.1) * 0.15;
      }
      // Animate orbiting satellite beacon along trajectory
      if (satelliteBeaconRef.current) {
        const orbitAngle = t * 0.6;
        const radiusX = 4.8;
        const radiusY = 3.6;
        satelliteBeaconRef.current.position.set(
          Math.cos(orbitAngle) * radiusX,
          Math.sin(orbitAngle) * radiusY,
          Math.sin(orbitAngle) * 0.5
        );
      }
    }
  });

  if (opacity <= 0.005) return null;

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* 1. Grazing Angle Directional Sunlight: Slices Moon into a Dramatic Crescent with Deep Crater Shadows */}
      <directionalLight
        position={[-18, 4, 8]}
        intensity={3.2 * opacity}
        color="#ffffff"
      />

      {/* 2. Earthshine Rim Light: Washes the Dark Limb in Ethereal Deep Cyan-Blue */}
      <directionalLight
        position={[14, -4, -6]}
        intensity={0.65 * opacity}
        color="#38bdf8"
      />

      {/* 3. Anamorphic Horizontal Moonlit Flare (Cuts across the Crescent Rim) */}
      <mesh position={[-1.2, 0, 0.3]}>
        <planeGeometry args={[20, 1.1]} />
        <meshBasicMaterial
          map={moonFlareTexture}
          transparent={true}
          opacity={0.65 * opacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 4. Photoreal Moon Sphere with NASA LOLA Elevation Displacement */}
      <mesh ref={moonMeshRef}>
        <sphereGeometry args={[3.0, isMobile ? 64 : 128, isMobile ? 64 : 128]} />
        <meshStandardMaterial
          map={colorMap}
          displacementMap={displacementMap}
          displacementScale={0.14}
          displacementBias={-0.035}
          bumpMap={displacementMap}
          bumpScale={0.08}
          roughness={0.88}
          metalness={0.02}
          transparent={true}
          opacity={opacity}
        />
      </mesh>

      {/* 5. Tilted Celestial Lunar Orbital Debris / Dust Ring (Breaks the round circle) */}
      <group rotation={[Math.PI / 3.4, -Math.PI / 5, 0]}>
        <mesh ref={ringRef}>
          <ringGeometry args={[3.6, 5.8, 64]} />
          <meshBasicMaterial
            color="#94a3b8"
            transparent={true}
            opacity={0.32 * opacity}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        {/* Outer illuminated orbit rim */}
        <mesh>
          <torusGeometry args={[4.9, 0.03, 16, 90]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent={true}
            opacity={0.5 * opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* 6. Glowing Orbital Trajectory Vector & Orbiting Satellite Beacon */}
      <group ref={orbitGroupRef} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <line geometry={orbitLineGeo}>
          <lineBasicMaterial
            color="#38bdf8"
            transparent={true}
            opacity={0.35 * opacity}
            blending={THREE.AdditiveBlending}
          />
        </line>
        {/* Orbiting Satellite / Space Station Beacon */}
        <mesh ref={satelliteBeaconRef}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent={true}
            opacity={0.95 * opacity}
          />
          <pointLight color="#38bdf8" intensity={1.5 * opacity} distance={6} />
        </mesh>
      </group>

      {/* 7. Soft Blue Lunar Halo Aura (Inner) */}
      <mesh>
        <sphereGeometry args={[3.45, 32, 32]} />
        <shaderMaterial
          vertexShader={MoonHaloShader.vertexShader}
          fragmentShader={MoonHaloShader.fragmentShader}
          uniforms={haloUniforms}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 8. Ethereal Outer Glow (Outer) */}
      <mesh>
        <sphereGeometry args={[4.5, 32, 32]} />
        <shaderMaterial
          vertexShader={MoonHaloShader.vertexShader}
          fragmentShader={MoonHaloShader.fragmentShader}
          uniforms={haloUniforms}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
