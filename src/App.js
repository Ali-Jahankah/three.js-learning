import './App.css';
import * as contentful from 'contentful';
import React, { useMemo, useState, Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  useGLTF,
  useProgress,
  Html,
  PositionalAudio
} from '@react-three/drei';

const App = () => {
  const [data, setData] = useState([]);
  const client = useMemo(() => {
    return contentful.createClient({
      space: process.env.REACT_APP_SPACE,
      accessToken: process.env.REACT_APP_ACCESS_TOKEN
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.getEntries();
        console.log(res.items);
        setData(res.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [client]);

  const audioRef = useRef(null);

  function Model() {
    const { scene } = useGLTF('./gaming_room/scene.gltf', true);
    return (
      <primitive
        object={scene}
        position={[0, -4, 0]}
        onClick={(e) => {
          console.log(e.intersections[0].object.name);
          if (e.intersections[0].object.name === 'Object_24') {
            if (audioRef.current) {
              audioRef.current.isPlaying
                ? audioRef.current.pause()
                : audioRef.current.play();
            }
          }
        }}
      />
    );
  }

  function Loader() {
    const { progress } = useProgress();
    return (
      <Html
        as="div"
        center={true}
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
  }

  return (
    <div className="model">
      <Canvas camera={{ position: [8, 3, 0], near: 0.01, far: 1000 }}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={1} color="#ffffff" />
          <directionalLight
            intensity={1}
            position={[0, 30, 20]}
            color="#ffffff"
          />
          <directionalLight
            intensity={1}
            position={[20, 0, 10]}
            color="#d400ff"
          />
          <directionalLight
            intensity={1}
            position={[10, 0, 1.3]}
            color="#e059c5"
          />

          <Model />

          {data.length > 0 && data[0].fields.music && (
            <PositionalAudio
              url={data[0].fields.music.fields.file.url}
              ref={audioRef}
              loop
              distance={0.1}
            />
          )}

          <OrbitControls
            target={[0, 2, 0]}
            enablePan={false}
            minDistance={1}
            maxDistance={1}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
