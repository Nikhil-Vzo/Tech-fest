import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const MovingGrid = () => {
    const gridRef = useRef<THREE.GridHelper>(null);

    useFrame((state) => {
        if (gridRef.current) {
            // Move grid infinite illusion
            gridRef.current.position.z = (state.clock.getElapsedTime() * 0.5) % 2;
        }
    });

    return (
        <gridHelper
            ref={gridRef}
            args={[20, 20, 0xdc2626, 0x333333]}
            position={[0, -1, 0]}
        />
    );
};

const RotatingCyberObject = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 1.0, 0]}>
            <icosahedronGeometry args={[1, 1]} />
            <meshBasicMaterial wireframe color="#dc2626" />
        </mesh>
    );
}

export const RahasyaCanvas = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas dpr={[1, 1.5]}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />

                {/* Deep Starfield */}
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                {/* Moving Floor Grid (Tron style) */}
                <MovingGrid />

                {/* Floating Wireframe Object */}
                <RotatingCyberObject />

                {/* Fog for depth */}
                <fog attach="fog" args={['#000', 3, 10]} />
            </Canvas>
        </div>
    );
};
