import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { SunSurfaceShader, SunCoronaShader } from './SunShaderMaterial';
import { getRoundParticleTexture } from './textureUtils';

// Generates an anamorphic horizontal lens flare texture for cinematic sci-fi light shafts
function getAnamorphicFlareTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(256, 32, 2, 256, 32, 250);
  grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.15, 'rgba(254, 240, 138, 0.85)');
  grad.addColorStop(0.4, 'rgba(245, 158, 11, 0.45)');
  grad.addColorStop(0.8, 'rgba(217, 119, 6, 0.15)');
  grad.addColorStop(1.0, 'rgba(217, 119, 6, 0.0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 64);

  return new THREE.CanvasTexture(canvas);
}

export function CelestialSun({
  position = [13.5, 7.5, -6],
  scale = 1.0,
  opacity = 1.0,
  isMobile = false,
  reducedMotion = false,
}) {
  const groupRef = useRef();
  const sunMeshRef = useRef();
  const innerCoronaRef = useRef();
  const outerCoronaRef = useRef();
  const plasmaDiskRef = useRef();
  const flareStreakRef = useRef();
  const flareCrossRef = useRef();
  const prominencesGroupRef = useRef();
  const particlesRef = useRef();

  // Load Sun equirectangular texture from Solar System Scope
  const sunTexture = useTexture('/textures/sun_color.webp');
  sunTexture.wrapS = THREE.RepeatWrapping;
  sunTexture.wrapT = THREE.RepeatWrapping;

  const anamorphicTexture = useMemo(() => getAnamorphicFlareTexture(), []);
  const particleTexture = useMemo(() => getRoundParticleTexture(), []);

  // Custom shader uniforms
  const surfaceUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: sunTexture },
      uOpacity: { value: opacity },
      uCoreColor: { value: new THREE.Color('#ffffff') },
      uMidColor: { value: new THREE.Color('#f59e0b') },
      uLimbColor: { value: new THREE.Color('#9a3412') },
    }),
    [sunTexture]
  );

  const innerCoronaUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: opacity },
      uColor: { value: new THREE.Color('#fbbf24') },
    }),
    []
  );

  const outerCoronaUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: opacity },
      uColor: { value: new THREE.Color('#f59e0b') },
    }),
    []
  );

  // 3D Solar Prominence Arches (Massive magnetic flux plasma loops erupting from surface)
  const prominenceGeos = useMemo(
    () => [
      { geo: new THREE.TorusGeometry(1.5, 0.08, 16, 50, Math.PI * 0.85), pos: [2.1, 1.6, 0.2], rot: [0.4, 0.3, 0.75] },
      { geo: new THREE.TorusGeometry(1.8, 0.09, 16, 50, Math.PI * 0.9), pos: [-2.2, 1.3, 0.5], rot: [-0.3, 0.6, -0.85] },
      { geo: new THREE.TorusGeometry(1.3, 0.07, 16, 50, Math.PI * 0.8), pos: [1.5, -2.1, -0.3], rot: [0.7, -0.4, 2.2] },
      { geo: new THREE.TorusGeometry(2.0, 0.08, 16, 50, Math.PI * 0.75), pos: [-1.4, -2.2, 0.3], rot: [0.2, 0.8, -1.9] },
    ],
    []
  );

  // Drifting golden dust particles & solar wind filaments
  const particleCount = isMobile ? 130 : 280;
  const { particlePositions, particleVelocities } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = [];
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 55;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
      vel.push({
        x: (Math.random() - 0.5) * 0.006,
        y: 0.005 + Math.random() * 0.008,
        z: (Math.random() - 0.5) * 0.006,
      });
    }
    return { particlePositions: pos, particleVelocities: vel };
  }, [particleCount]);

  // Animation Loop
  useFrame((state, delta) => {
    if (opacity <= 0.01) return;

    const t = state.clock.getElapsedTime();

    // Update shader uniforms
    surfaceUniforms.uTime.value = t;
    surfaceUniforms.uOpacity.value = opacity;

    innerCoronaUniforms.uTime.value = t;
    innerCoronaUniforms.uOpacity.value = opacity * 0.8;

    outerCoronaUniforms.uTime.value = t * 0.85;
    outerCoronaUniforms.uOpacity.value = opacity * 0.5;

    if (!reducedMotion) {
      // Slow rotation of core
      if (sunMeshRef.current) {
        sunMeshRef.current.rotation.y += 0.002;
        const pulse = 1.0 + Math.sin(t * 1.8) * 0.018;
        sunMeshRef.current.scale.set(pulse, pulse, pulse);
      }
      if (innerCoronaRef.current) {
        innerCoronaRef.current.rotation.z -= 0.003;
      }
      if (outerCoronaRef.current) {
        outerCoronaRef.current.rotation.z += 0.002;
      }

      // Rotate equatorial plasma disk
      if (plasmaDiskRef.current) {
        plasmaDiskRef.current.rotation.z += 0.004;
      }

      // Rotate plasma prominences slowly along magnetic fields
      if (prominencesGroupRef.current) {
        prominencesGroupRef.current.rotation.y += 0.0015;
        prominencesGroupRef.current.rotation.z = Math.sin(t * 0.5) * 0.08;
      }

      // Subtle breath on anamorphic flare beam
      if (flareStreakRef.current) {
        const flarePulse = 1.0 + Math.sin(t * 2.5) * 0.06;
        flareStreakRef.current.scale.set(flarePulse, flarePulse, 1.0);
      }
      if (flareCrossRef.current) {
        const flareCrossPulse = 1.0 + Math.cos(t * 2.2) * 0.05;
        flareCrossRef.current.scale.set(flareCrossPulse, flareCrossPulse, 1.0);
      }

      // Animate drifting golden dust particles
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += particleVelocities[i].y;
          positions[i * 3] += Math.sin(t * 0.5 + i) * 0.006;
          if (positions[i * 3 + 1] > 20) {
            positions[i * 3 + 1] = -18;
          }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  if (opacity <= 0.005) return null;

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* Directional Sunlight Casting Warm Golden Beams */}
      <directionalLight
        position={[4, 3, 5]}
        intensity={2.8 * opacity}
        color="#fff7ed"
      />
      <pointLight
        position={[0, 0, 0]}
        intensity={3.4 * opacity}
        distance={50}
        color="#fbbf24"
      />

      {/* 1. Anamorphic Horizontal Sci-Fi Flare Beam (Cuts across the Sun's core) */}
      <mesh ref={flareStreakRef} position={[0, 0, 0.2]}>
        <planeGeometry args={[26, 1.4]} />
        <meshBasicMaterial
          map={anamorphicTexture}
          transparent={true}
          opacity={0.85 * opacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Secondary Tilted Diagonal Flare Spike */}
      <mesh ref={flareCrossRef} position={[0, 0, 0.2]} rotation={[0, 0, Math.PI / 3]}>
        <planeGeometry args={[18, 0.9]} />
        <meshBasicMaterial
          map={anamorphicTexture}
          transparent={true}
          opacity={0.6 * opacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 3. 3D Sun Core Sphere with Custom GLSL Boiling Granulation */}
      <mesh ref={sunMeshRef}>
        <sphereGeometry args={[3.2, 64, 64]} />
        <shaderMaterial
          vertexShader={SunSurfaceShader.vertexShader}
          fragmentShader={SunSurfaceShader.fragmentShader}
          uniforms={surfaceUniforms}
          transparent={true}
        />
      </mesh>

      {/* 4. Multi-Layered 3D Solar Prominence Arches (Magnetic Flux Loops) */}
      <group ref={prominencesGroupRef}>
        {prominenceGeos.map((item, idx) => (
          <mesh
            key={idx}
            geometry={item.geo}
            position={item.pos}
            rotation={item.rot}
          >
            <meshBasicMaterial
              color="#ffea79"
              transparent={true}
              opacity={0.75 * opacity}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* 5. Tilted Equatorial Radiative Plasma Disk */}
      <group rotation={[Math.PI / 3.2, Math.PI / 6, 0]}>
        <mesh ref={plasmaDiskRef}>
          <ringGeometry args={[3.6, 6.4, 64]} />
          <meshBasicMaterial
            color="#f59e0b"
            transparent={true}
            opacity={0.35 * opacity}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        {/* Glowing Accretion Rim Ring */}
        <mesh>
          <torusGeometry args={[5.2, 0.06, 16, 90]} />
          <meshBasicMaterial
            color="#fef08a"
            transparent={true}
            opacity={0.65 * opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* 6. Inner Corona Shell */}
      <mesh ref={innerCoronaRef}>
        <sphereGeometry args={[3.85, 32, 32]} />
        <shaderMaterial
          vertexShader={SunCoronaShader.vertexShader}
          fragmentShader={SunCoronaShader.fragmentShader}
          uniforms={innerCoronaUniforms}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 7. Outer Corona Shell with Animated Solar Flares */}
      <mesh ref={outerCoronaRef}>
        <sphereGeometry args={[4.85, 32, 32]} />
        <shaderMaterial
          vertexShader={SunCoronaShader.vertexShader}
          fragmentShader={SunCoronaShader.fragmentShader}
          uniforms={outerCoronaUniforms}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 8. Floating Golden Dust Particles (Depth of Field Motifs) */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.28 : 0.4}
          map={particleTexture}
          transparent={true}
          opacity={0.65 * opacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          color="#f59e0b"
        />
      </points>
    </group>
  );
}
