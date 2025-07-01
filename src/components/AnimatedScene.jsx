'use client'; // Client-only

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AnimatedScene({pageName}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff6969, wireframe: true });
    const icosahedron = new THREE.Mesh(geometry, material);
    scene.add(icosahedron);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      icosahedron.rotation.x += 0.01;
      icosahedron.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
  <div className="relative w-screen h-screen">
    <h1 className="text-2xl absolute top-4 left-4 z-10 mt-5 text-white">This is the {pageName} page</h1>
    <div
      ref={mountRef}
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  </div>
  )
}
