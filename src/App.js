import './App.css';
import * as Three from 'three';
import React from 'react';

import { useEffect, useRef } from 'react';
const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new Three.Scene();
    const boxMaterials = [
      new Three.MeshBasicMaterial({ color: '#faaf18' }),
      new Three.MeshBasicMaterial({ color: '#18fa20' }),
      new Three.MeshBasicMaterial({ color: '#18faf6' }),
      new Three.MeshBasicMaterial({ color: '#f576ad' }),
      new Three.MeshBasicMaterial({ color: '#e01017' }),
      new Three.MeshBasicMaterial({ color: '#1876fa' })
    ];
    const box = new Three.BoxGeometry(1, 1, 1);
    new Three.MeshBasicMaterial({ color: 'red' });
    const mesh = new Three.Mesh(box, boxMaterials);
    scene.add(mesh);
    const aspect = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    const camera = new Three.PerspectiveCamera(
      75,
      aspect.width / aspect.height
    );
    camera.position.z = 3;
    scene.add(camera);
    const rerenderer = new Three.WebGLRenderer({ canvas: canvasRef.current });
    rerenderer.setSize(aspect.width, aspect.height);

    const animate = () => {
      window.requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;

      rerenderer.render(scene, camera);
    };
    animate();
    return () => {
      rerenderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default App;
