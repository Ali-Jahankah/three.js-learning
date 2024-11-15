import './App.css';
import * as contentful from 'contentful';
import React, { useMemo, useState, Suspense } from 'react';

import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useProgress, Html } from '@react-three/drei';

const App = () => {
  const [, setData] = useState([]);

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
        setData(res.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [client]);

  function Model() {
    const { scene } = useGLTF('./gaming_room/scene.gltf', true);
    return <primitive object={scene} position={[0, -4, 0]} />;
  }

  function Loader() {
    console.log('loading');
    const { progress } = useProgress();
    return (
      <Html center>
        <div style={{ color: 'white', fontSize: '2rem' }}>
          Loading... {Math.round(progress)}%
        </div>
      </Html>
    );
  }
  return (
    <div className="model">
      <Canvas camera={{ position: [8, 3, 0], near: 0.01, far: 1000 }}>
        <Suspense fallback={<Loader></Loader>}>
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
