import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";

type ModelProps = {
    url: string;
    onModelLoaded?: () => void; // Callback for when the model is loaded
};

function SpinningModel({ url, onModelLoaded }: ModelProps) {
    const group = useRef<THREE.Group>(null);
    const [modelLoaded, setModelLoaded] = React.useState(false);
    const { scene } = useGLTF(url, true);

    React.useEffect(() => {
        let isMounted = true;
        const loadModel = async () => {
            await new Promise<void>((resolve) => {
                if (scene) resolve();
            });
            if (isMounted) {
                setModelLoaded(true);
                if (onModelLoaded) onModelLoaded(); // Trigger the callback
            }
        };
        loadModel();
        return () => {
            isMounted = false;
        };
    }, [scene, onModelLoaded]);

    useFrame((_, delta) => {
        if (group.current && modelLoaded) {
            group.current.rotation.y += delta * 0.3; // Slow spin
        }
    });

    if (!modelLoaded) return null;

    return (
        <Center>
            <primitive ref={group} object={scene} position={[0, 0, 0]} scale={0.65} />
        </Center>
    );
}

type ThreeDMeProps = {
    gltfUrl: string;
    style?: React.CSSProperties;
    onModelLoaded?: () => void;
};

const ThreeDMe: React.FC<ThreeDMeProps> = ({ gltfUrl, style, onModelLoaded }) => (
    <div style={{ width: "100%", height: "400px", ...style }}>
        <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
            <ambientLight intensity={2}/>
            <directionalLight position={[2, 2, 2]} intensity={3} color={"#E0FF7C"}/>
            <Suspense fallback={null}>
                <SpinningModel url={gltfUrl} onModelLoaded={onModelLoaded} />
            </Suspense>
        </Canvas>
    </div>
);

export default ThreeDMe;

