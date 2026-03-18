import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from '@react-three/drei'
import { useGLTF } from "@react-three/drei";


function Model(props) {
  const gltf = useGLTF('/me.glb')
  return <primitive {...props} object={gltf.scene} />
}

export default function Three(): React.ReactElement {
    return (
        <div id="three-canvas">
            <Canvas>
                <Suspense fallback={null}>
                    <Model/>
                </Suspense>
                {/* <Environment/> */}
            </Canvas>
        </div>
    )
}