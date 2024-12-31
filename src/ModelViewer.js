import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import {
  useGLTF,
  Html,
  PositionalAudio,
  useProgress,
  CameraControls
} from '@react-three/drei';
import AboutMe from './pages/AboutMe';
import FindMe from './pages/FindMe';

const ModelViewer = ({ audioData, cv }) => {
  const [activeCamera, setActiveCamera] = useState('main-cam');
  const [cameraPos, setCameraPos] = useState({ x: 0, y: 0, z: 0 });
  const [page, setPage] = useState();
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
          setPage={setPage}
          cv={cv}
        />
        <CameraControls ref={cameraControlsRef} />
        {audioData && audioData.fields?.file?.url && (
          <PositionalAudio
            url={audioData.fields.file.url}
            ref={audioRef}
            loop
            distance={1000}
            setDistanceModel="linear"
          />
        )}
        <ambientLight intensity={0.5} color={0xffffff} />
        {activeCamera === 'laptop-cam' && page && (
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
                backgroundColor: '#262525',
                overflowY: 'auto',
                position: 'relative'
              }}
            >
              {page === 'aboutmebox' ? (
                <AboutMe />
              ) : page === 'findmebox' ? (
                <FindMe />
              ) : (
                <p>
                  To see content please return to the room and press any options
                  on the wall!
                </p>
              )}
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
                  backgroundColor: '#e8d229',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  position: 'absolute',
                  bottom: '0.5em',
                  left: ' 0.5em'
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
  cameraPos,
  setPage,
  cv
}) => {
  const { scene, cameras } = useGLTF('./gaming_room/room.gltf', true);
  const { camera } = useThree();
  const cameraRef = useRef(camera);

  useEffect(() => {
    const activeCam = cameras.find((cam) => cam.name === activeCamera);
    const widthCategory =
      window.innerWidth >= 340 && window.innerWidth < 450
        ? 'mobile'
        : window.innerWidth >= 450 && window.innerWidth < 600
        ? 'small'
        : window.innerWidth >= 600 && window.innerWidth < 800
        ? 'medium'
        : 'large';
    cameraRef.current = activeCam;
    if (activeCam) {
      if (activeCam.name === 'main-cam') {
        cameraRef.current.position.set(0, 0, 0);
        cameraRef.current.updateMatrix();
        cameraRef.current.updateMatrixWorld();
        cameraControlsRef.current.setLookAt(0, 2, 0, 5, 0, 0, true);
      }

      if (activeCam.name === 'laptop-cam') {
        if (widthCategory === 'large') {
          cameraRef.current.position.set(
            cameraPos.x + 13,
            cameraPos.y,
            cameraPos.z
          );
          cameraRef.current.updateMatrix();
          cameraRef.current.updateMatrixWorld();
          cameraControlsRef.current.setLookAt(
            cameraPos.x + 3.8,
            cameraPos.y,
            cameraPos.z,
            cameraPos.x + 8,
            cameraPos.y,
            cameraPos.z,
            true
          );
        }
        if (widthCategory === 'medium') {
          cameraRef.current.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
          cameraRef.current.updateMatrix();
          cameraRef.current.updateMatrixWorld();
          cameraControlsRef.current.setLookAt(
            cameraPos.x + 3,
            cameraPos.y,
            cameraPos.z,
            cameraPos.x + 8,
            cameraPos.y,
            cameraPos.z,
            true
          );
        }
        if (widthCategory === 'small') {
          cameraRef.current.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
          cameraRef.current.updateMatrix();
          cameraRef.current.updateMatrixWorld();
          cameraControlsRef.current.setLookAt(
            cameraPos.x + 2,
            cameraPos.y,
            cameraPos.z,
            cameraPos.x + 8,
            cameraPos.y,
            cameraPos.z,
            true
          );
        }
        if (widthCategory === 'mobile') {
          cameraRef.current.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
          cameraRef.current.updateMatrix();
          cameraRef.current.updateMatrixWorld();
          cameraControlsRef.current.setLookAt(
            cameraPos.x + 1.5,
            cameraPos.y,
            cameraPos.z,
            cameraPos.x + 8,
            cameraPos.y,
            cameraPos.z,
            true
          );
        }
      }
    }
  }, [activeCamera, window.innerWidth]);

  return (
    <primitive
      object={scene}
      onClick={(e) => {
        const clickedObject = e.intersections[0]?.object;
        e.stopPropagation();
        if (clickedObject?.name === 'cvbox') {
          const link = document.createElement('a');
          link.href = cv.fields.file.url;
          link.download = 'Ali_Jahankhah_CV.docx';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        if (
          clickedObject?.name === 'aboutmebox' ||
          clickedObject?.name === 'findmebox' ||
          clickedObject?.name === 'projectsbox' ||
          clickedObject?.name === 'blogsbox'
        ) {
          setActiveCamera('laptop-cam');
          setCameraPos({
            x: 3,
            y: 0.3,
            z: 5
          });
          setPage(clickedObject?.name);
        }

        if (clickedObject?.name.includes('amp') && audioRef.current) {
          if (audioRef.current.isPlaying) {
            audioRef.current.pause();
          } else {
            audioRef.current.play();
          }
        }
      }}
    />
  );
};

export default ModelViewer;
