import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import {
  useGLTF,
  Html,
  PositionalAudio,
  useProgress,
  CameraControls
} from '@react-three/drei';

const ModelViewer = ({ audioData }) => {
  const [activeCamera, setActiveCamera] = useState('main-cam');
  const [cameraPos, setCameraPos] = useState({ x: 0, y: 0, z: 0 });
  const audioRef = useRef(null);
  const cameraControlsRef = useRef(null);

  const Loader = () => {
    const { progress } = useProgress();
    return (
      <Html
        as="div"
        center
        style={{
          justifyContent: 'center',
          color: 'white',
          fontSize: '2rem',
          textAlign: 'center',
          width: '400px'
        }}
      >
        <div>Loading 3D model and music... {Math.round(progress)}%</div>
      </Html>
    );
  };

  return (
    <Canvas>
      <Suspense fallback={<Loader />}>
        <Model
          activeCamera={activeCamera}
          setActiveCamera={setActiveCamera}
          audioRef={audioRef}
          cameraControlsRef={cameraControlsRef}
          cameraPos={cameraPos}
          setCameraPos={setCameraPos}
        />
        <CameraControls
          ref={cameraControlsRef}
          maxDistance={4}
          minDistance={1}
        />
        {audioData && audioData.fields?.file?.url && (
          <PositionalAudio
            url={audioData.fields.file.url}
            ref={audioRef}
            loop
            distance={0.5}
          />
        )}
        <ambientLight intensity={0.5} color={0xffffff} />

        {activeCamera === 'laptop-cam' && (
          <Html
            position={[9, 0.274, 5.04]}
            transform
            distanceFactor={4}
            rotation={[0, -Math.PI / 2, 0]}
          >
            <div
              style={{
                width: '355px',
                height: '205px',
                padding: '0.5em',
                fontSize: '0.5rem',
                lineHeight: '1.5em',
                backgroundColor: 'black',
                color: 'lime',
                overflowY: 'auto',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <p>
                Hello! My name is Ali, and I’m a 28-year-old developer from the
                land of Persia. I’m not just working as a developer—I’m living
                as one. I’m a passionate full-stack JavaScript developer with
                experience in DevOps and cloud technologies.
              </p>
              <br />
              <p style={{ color: '#ffffff' }}>
                I have over <b>80 repositories</b> on GitHub, showcasing my solo
                and team projects.
              </p>
              <p style={{ color: '#ffffff' }}>
                If you'd like to learn more about me, view my CV, or connect
                elsewhere, please explore the options displayed on the wall.
              </p>
              <br />
              <p
                style={{
                  color: '#cb0000'
                }}
              >
                By the way, I’m a metalhead guitar player as well. I have three
                weapons at my home: my laptop, my guitar, and my phone.
              </p>
              <button
                onClick={() => {
                  setActiveCamera('main-cam');
                  setCameraPos({ x: 0, y: 0, z: 0 });
                }}
                style={{
                  marginTop: '15px',
                  padding: '0.5em',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  color: 'black',
                  backgroundColor: 'lime',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                Back to ROOM
              </button>
            </div>
          </Html>
        )}
      </Suspense>
    </Canvas>
  );
};

const Model = ({
  activeCamera,
  setActiveCamera,
  setCameraPos,
  audioRef,
  cameraControlsRef,
  cameraPos
}) => {
  const { scene, cameras } = useGLTF('./gaming_room/room.gltf', true);
  const { camera } = useThree();

  useEffect(() => {
    const widthCategory =
      window.innerWidth < 600
        ? 'small'
        : window.innerWidth >= 600 && window.innerWidth < 800
        ? 'medium'
        : 'large';

    const activeCam = cameras.find((cam) => cam.name === activeCamera);
    if (activeCam && cameraControlsRef.current) {
      cameraControlsRef.current.setLookAt(
        activeCam.position.x,
        activeCam.position.y,
        activeCam.position.z,
        cameraPos.x,
        cameraPos.y,
        cameraPos.z,
        true
      );
      if (activeCam.name === 'laptop-cam') {
        switch (widthCategory) {
          case 'small':
            camera.fov = 50;
            break;
          case 'medium':
            camera.fov = 30;
            break;
          case 'large':
            camera.fov = 25;
            break;
        }
        camera.updateProjectionMatrix();
      } else {
        camera.fov = 80;

        camera.updateProjectionMatrix();

        camera.position.set(0, 0, 0); // Adjust the camera position

        // Ensure the camera is looking at the front wall (or the target you want)
        cameraControlsRef.current.setLookAt(
          0,
          0,
          0, // Target point (front wall or desired point)
          5,
          0,
          0, // Camera position (start looking from here)
          true // Smooth transition
        );
        camera.updateProjectionMatrix();
      }
    }
  }, [activeCamera, cameraPos]);

  return (
    <primitive
      object={scene}
      onClick={(e) =>
        handleObjectClick(e, setActiveCamera, audioRef, setCameraPos)
      }
    />
  );
};

const handleObjectClick = (e, setActiveCamera, audioRef, setCameraPos) => {
  e.stopPropagation();
  const clickedObject = e.intersections[0]?.object;
  if (clickedObject?.name === 'monitor_5') {
    setActiveCamera('laptop-cam');
    setCameraPos({
      x: 3,
      y: 0.3,
      z: 5
    });
  }

  if (clickedObject?.name.includes('amp') && audioRef.current) {
    if (audioRef.current.isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }
};

export default ModelViewer;
