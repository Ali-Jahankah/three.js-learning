import './App.css';
import * as Three from 'three';
import * as contentful from 'contentful';
import React, { useMemo, useState } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useEffect, useRef } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const canvasRef = useRef(null);
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
        console.log('Contentful Data:', res.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [client]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const aspect = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    const scene = new Three.Scene();
    // scene.background = new Three.Color('#1d1b1b');

    const camera = new Three.PerspectiveCamera(
      75,
      aspect.width / aspect.height,
      0.01,
      2000
    );
    camera.position.z = 6;
    const rerenderer = new Three.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true
    });
    rerenderer.setSize(aspect.width, aspect.height);
    const orbitControls = new OrbitControls(camera, rerenderer.domElement);
    orbitControls.enableDamping = true;
    rerenderer.render(scene, camera);
    orbitControls.addEventListener('change', () => {
      rerenderer.render(scene, camera);
    });
    const numberOfPoints = 1000;
    const geometry = new Three.BufferGeometry();
    const verticesArray = new Float32Array(numberOfPoints * 3);

    for (let i = 0; i < numberOfPoints * 3; i++) {
      verticesArray[i] = (Math.random() - 0.5) * 9;
    }
    geometry.setAttribute(
      'position',
      new Three.BufferAttribute(verticesArray, 3)
    );
    const material = new Three.PointsMaterial({ color: 'lightBlue' });
    material.size = 0.02;
    const points = new Three.Points(geometry, material);
    scene.add(points);

    // const boxMaterials = [
    //   new Three.MeshBasicMaterial({ color: '#faaf18', wireframe: true }),
    //   new Three.MeshBasicMaterial({ color: '#18fa20', wireframe: true }),
    //   new Three.MeshBasicMaterial({ color: '#18faf6', wireframe: true }),
    //   new Three.MeshBasicMaterial({ color: '#f576ad', wireframe: true }),
    //   new Three.MeshBasicMaterial({ color: '#e01017', wireframe: true }),
    //   new Three.MeshBasicMaterial({ color: '#1876fa', wireframe: true }),
    //   new Three.MeshBasicMaterial({
    //     color: '#ec17ff',
    //     wireframe: true
    //   })
    // ];
    // const x = new Three.MeshBasicMaterial({
    //   color: '#ffbd2e',
    //   wireframe: true
    // });
    // const sphere = new Three.SphereGeometry(4, 32, 64);
    // const box = new Three.BoxGeometry(1, 1, 1, 32, 32, 32);
    // const mesh = new Three.Mesh(sphere, x);
    // const boxMesh = new Three.Mesh(box, boxMaterials);
    // scene.add(boxMesh);
    // scene.add(mesh);

    // scene.add(camera);

    const animate = () => {
      points.rotation.x += 0.005;
      points.rotation.y += 0.001;
      // boxMesh.rotation.x -= 0.01;
      // boxMesh.rotation.y -= 0.01;
      orbitControls.update();
      rerenderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    console.log('first');
    animate();
    const handleResize = () => {
      const aspect = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      camera.aspect = aspect.width / aspect.height;
      camera.updateProjectionMatrix();
      rerenderer.setSize(aspect.width, aspect.height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      rerenderer.dispose();
      orbitControls.dispose();
    };
  }, [canvasRef.current]);

  return data[0] ? (
    <article className="container">
      <canvas ref={canvasRef}></canvas>
      <h1 className="title">{data[0].fields.title}</h1>
      <img src={data[0].fields.logo.fields.file.url} alt="app logo" />
    </article>
  ) : (
    <h1 className="title">Loading...</h1>
  );
};

export default App;
