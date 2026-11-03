import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { getRoundParticleTexture } from './textureUtils';

function createStarLayer(count, zMin, zMax, spreadX, spreadY) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = [
    new THREE.Color('#ffffff'), // Diamond white
    new THREE.Color('#7dd3fc'), // Cyan
    new THREE.Color('#c084fc'), // Lavender
    new THREE.Color('#fde047'), // Topaz
  ];

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spreadX;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
    positions[i * 3 + 2] = zMin + Math.random() * (zMax - zMin);

    const c = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  return { positions, colors };
}

export function StarField({
  opacity = 1.0,
  isMobile = false,
  reducedMotion = false,
}) {
  const layer1Ref = useRef();
  const layer2Ref = useRef();
  const layer3Ref = useRef();
  const meteorRef = useRef();

  const particleTexture = useMemo(() => getRoundParticleTexture(), []);

  // Three depth-sorted layers of round stars with parallax
  const count1 = isMobile ? 300 : 700; // Distant
  const count2 = isMobile ? 200 : 450; // Mid
  const count3 = isMobile ? 100 : 250; // Foreground

  const layer1Data = useMemo(() => createStarLayer(count1, -45, -30, 80, 50), [count1]);
  const layer2Data = useMemo(() => createStarLayer(count2, -30, -15, 70, 45), [count2]);
  const layer3Data = useMemo(() => createStarLayer(count3, -15, 5, 60, 40), [count3]);

  // Shooting star state
  const meteorState = useMemo(() => ({
    active: false,
    timer: 0,
    progress: 0,
    start: new THREE.Vector3(),
    end: new THREE.Vector3(),
  }), []);

  const meteorPositions = useMemo(() => new Float32Array(6), []);

  useFrame((state, delta) => {
    if (opacity <= 0.01) return;

    const t = state.clock.getElapsedTime();

    if (!reducedMotion) {
      // Differential parallax orbital drift per depth layer
      if (layer1Ref.current) layer1Ref.current.rotation.y = t * 0.004;
      if (layer2Ref.current) layer2Ref.current.rotation.y = t * 0.008;
      if (layer3Ref.current) layer3Ref.current.rotation.y = t * 0.014;

      // Shooting star / Meteor Streak
      meteorState.timer += delta;
      if (!meteorState.active && meteorState.timer > 4.5 + Math.random() * 3) {
        meteorState.active = true;
        meteorState.progress = 0;
        meteorState.timer = 0;

        // Choose random trajectory cutting across upper night sky
        meteorState.start.set((Math.random() - 0.2) * 20, 11 + Math.random() * 4, -10);
        meteorState.end.set(
          meteorState.start.x - 14 - Math.random() * 6,
          meteorState.start.y - 7 - Math.random() * 4,
          -10
        );
      }

      if (meteorState.active && meteorRef.current) {
        meteorState.progress += delta * 1.7;
        if (meteorState.progress >= 1.0) {
          meteorState.active = false;
          meteorRef.current.material.opacity = 0;
        } else {
          const head = meteorState.start.clone().lerp(meteorState.end, meteorState.progress);
          const tailProgress = Math.max(0, meteorState.progress - 0.24);
          const tail = meteorState.start.clone().lerp(meteorState.end, tailProgress);

          const posAttr = meteorRef.current.geometry.attributes.position;
          posAttr.setXYZ(0, head.x, head.y, head.z);
          posAttr.setXYZ(1, tail.x, tail.y, tail.z);
          posAttr.needsUpdate = true;

          const alpha = Math.sin(meteorState.progress * Math.PI);
          meteorRef.current.material.opacity = alpha * 0.9 * opacity;
        }
      }
    }
  });

  if (opacity <= 0.005) return null;

  return (
    <group>
      {/* Layer 1: Distant Stars (Small, faint) */}
      <points ref={layer1Ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count1}
            array={layer1Data.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count1}
            array={layer1Data.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.16 : 0.22}
          map={particleTexture}
          vertexColors={true}
          transparent={true}
          opacity={0.75 * opacity}
          depthWrite={false}
        />
      </points>

      {/* Layer 2: Mid-ground Stars */}
      <points ref={layer2Ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count2}
            array={layer2Data.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count2}
            array={layer2Data.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.22 : 0.3}
          map={particleTexture}
          vertexColors={true}
          transparent={true}
          opacity={0.85 * opacity}
          depthWrite={false}
        />
      </points>

      {/* Layer 3: Foreground Stars (Pronounced parallax) */}
      <points ref={layer3Ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count3}
            array={layer3Data.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count3}
            array={layer3Data.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.28 : 0.4}
          map={particleTexture}
          vertexColors={true}
          transparent={true}
          opacity={0.95 * opacity}
          depthWrite={false}
        />
      </points>

      {/* Shooting Star / Meteor Streak */}
      <line ref={meteorRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={meteorPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38bdf8"
          transparent={true}
          opacity={0}
          blending={THREE.AdditiveBlending}
        />
      </line>
    </group>
  );
}

