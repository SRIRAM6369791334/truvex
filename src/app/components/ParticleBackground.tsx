import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function ParticleSphere(props: any) {
  const ref = useRef<any>();
  // Use maath to generate random points in a sphere. The array size MUST be a multiple of 3.
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 }) as Float32Array);
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
      
      // Subtle reaction to mouse
      ref.current.rotation.x += (state.pointer.y * 0.05 - ref.current.rotation.x) * 0.05;
      ref.current.rotation.y += (state.pointer.x * 0.05 - ref.current.rotation.y) * 0.05;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#F59E0B" size={0.008} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
      </Points>
    </group>
  );
}

export function ParticleBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-50">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "low-power" }}
      >
        <ParticleSphere />
      </Canvas>
    </div>
  );
}
