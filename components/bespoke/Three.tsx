import * as React from 'react';

import * as THREE from 'three'
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF, OrbitControls, ContactShadows } from '@react-three/drei'


export function Model(props) {
  const { scene } = useGLTF('/coffee_cup.glb');           // ← use scene instead of nodes/materials for simplicity
  const scale = 5;
  return (
    <group {...props} dispose={null} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

function Table() {
  return (
    <group position={[0, -0.39, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {/* Simple large plane as the table top */}
      <mesh receiveShadow>
        <planeGeometry args={[20, 20]} />           {/* Big enough to catch shadows */}
        {/* <meshStandardMaterial 
          color="transparent"                         // Very light gray / off-white for subtle look
          roughness={0.3}                         // Matte, not shiny
          metalness={0.0}
        /> */}
      </mesh>
    </group>
  );
}


export default function Three(): React.ReactElement {
    return (
        <div 
            id="three-canvas" 
            style={{ 
            width: '100%', 
            height: '500px',
        }}>
            <Canvas 
            flat 
            shadows={{ type: THREE.PCFSoftShadowMap }} 
            camera={{
                position: [0, 2.5, 4],                     
                fov: 20,
                near: 0.1,
                far: 100
            }}
            gl={{ alpha: true }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.02} />
                    <directionalLight 
                        position={[4, 8, 3]} 
                        intensity={0.02} 
                        castShadow 
                        shadow-mapSize={[1024, 1024]}            // sharper shadows
                        shadow-camera-near={0.1}
                        shadow-camera-far={30}
                        shadow-camera-left={-8}
                        shadow-camera-right={8}
                        shadow-camera-top={8}
                        shadow-camera-bottom={-8}
                    />
                    <Model enableZoom/>

                    <ContactShadows 
                        opacity={0.4}               // faded / subtle
                        scale={8}                   // size of shadow spread
                        blur={2.5}                  // softness
                        far={5}                     // how far shadows extend
                        resolution={1024}
                        color="var(--color-black-100)"
                        position={[0, -0.21, 0]}   // right under the model
                    />
                    {/* <Table /> */}
                </Suspense>
                {/* <OrbitControls autoRotate autoRotateSpeed={0.05} enableZoom={false} makeDefault minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} /> */}
                <OrbitControls 
                // enableZoom={true}
                enablePan={true}             // optional: prevents dragging off-center
                minDistance={2}
                maxDistance={12}
                minPolarAngle={Math.PI * 0.1}   // almost top-down allowed
                maxPolarAngle={Math.PI * 0.9}   // almost bottom-up
                makeDefault
                />
                <Environment preset="warehouse"/>
            </Canvas>
        </div>
    )
}