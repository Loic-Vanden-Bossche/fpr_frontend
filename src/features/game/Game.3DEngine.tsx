import { Canvas, useThree } from "@react-three/fiber";
import { Display } from ".";
import { PerspectiveCamera } from "three";

interface Props{displayData: Display}

interface CameraProps{
  width: number;
  height: number;
}

function Camera({width, height}: CameraProps) {
  const {camera}: {camera: PerspectiveCamera} = useThree();
  
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  return null;
}

function Box() {
  return <>
    <mesh position={[0,0,0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
    <mesh position={[0,2,0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'red'} />
    </mesh>
  </>;
}


export function Game3DEngine({displayData: {width, height, content}}: Props) {
  const cameraSettings = new PerspectiveCamera(90, undefined, 0.1, 1000);

  return <Canvas camera={cameraSettings}>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Camera width={width} height={height}/>
    <Box/>
  </Canvas>;
}