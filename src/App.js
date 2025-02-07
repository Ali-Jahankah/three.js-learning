import './App.css';
import * as Three from 'three';
import React, { useRef } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useEffect } from 'react';

const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const aspect = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    const scene = new Three.Scene();

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

    let winAnimate;
    const animate = () => {
      points.rotation.x += 0.005;
      points.rotation.y += 0.001;

      rerenderer.render(scene, camera);

      winAnimate = window.requestAnimationFrame(animate);
    };
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
      window.cancelAnimationFrame(winAnimate);

      window.removeEventListener('resize', handleResize);

      rerenderer.dispose();
      orbitControls.dispose();
    };
  }, []);

  return (
    <article className="container">
      <canvas ref={canvasRef} className="canvas"></canvas>
    </article>
  );
};

export default App;
