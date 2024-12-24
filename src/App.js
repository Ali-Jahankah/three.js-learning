import './App.css';
import * as contentful from 'contentful';
import React, { useMemo, useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useProgress, Html } from '@react-three/drei';

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

  function Model() {
    const { scene } = useGLTF('./gaming_room/untitled.gltf', true);

    return (
      <primitive
        object={scene}
        position={[0, 0, 0]}
        onClick={(e) => {
          console.log(e.intersections[0].object.name);
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
      <Canvas>
        <Suspense fallback={<Loader />}>
          <Model />
          {/* <directionalLight
            position={[5, 10, 5]} // Adjust to illuminate from above
            intensity={3} // Adjust brightness
            castShadow
          /> */}
          <ambientLight intensity={1.5} color={0xffffff} />

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
