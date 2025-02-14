'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const vertexShader = `
  uniform float uTime;
  uniform float uSize;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  
  attribute float aScale;
  attribute vec3 aStartPosition;
  
  varying vec3 vColor;
  varying float vDistance;
  
  // Rotation matrix for default animation
  mat3 rotateY(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat3(
      c, 0.0, -s,
      0.0, 1.0, 0.0,
      s, 0.0, c
    );
  }

  mat3 rotateX(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat3(
      1.0, 0.0, 0.0,
      0.0, c, -s,
      0.0, s, c
    );
  }
  
  void main() {
    // Default dynamic motion
    vec3 pos = position;
    float timeScale = uTime * 0.3;
    
    // Create spiral motion
    float spiralRadius = length(pos.xz) * 0.5;
    float spiralAngle = atan(pos.z, pos.x) + timeScale;
    float heightOffset = sin(timeScale + length(pos)) * 0.3;
    
    // Apply rotations for 3D motion
    pos = rotateY(timeScale * 0.2) * pos;
    pos = rotateX(timeScale * 0.1) * pos;
    
    // Add wave motion
    pos.x += sin(timeScale + pos.z * 2.0) * 0.2;
    pos.y += cos(timeScale + pos.x * 2.0) * 0.2 + heightOffset;
    pos.z += sin(timeScale * 0.5 + pos.y) * 0.2;
    
    // Mouse interaction
    vec2 mouseDistance = (vec2(pos.x, pos.y) - uMouse) * uMouseStrength;
    float distanceStrength = 1.0 / (length(mouseDistance) + 0.1);
    
    // Faster mouse response
    pos.x -= mouseDistance.x * distanceStrength * 0.15;
    pos.y += mouseDistance.y * distanceStrength * 0.15;
    
    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    
    // Moderate particle size
    float size = uSize * aScale * (1.0 + distanceStrength * 0.5);
    gl_PointSize = size * (1.0 / -viewPosition.z);
    
    // Subtle color variation
    float colorIntensity = distanceStrength * 0.3;
    vColor = vec3(
      0.6 + colorIntensity,
      0.7 + colorIntensity * 0.6,
      0.9
    );
    vDistance = distanceStrength;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vDistance;
  
  void main() {
    float distanceToCenter = length(gl_PointCoord - vec2(0.5));
    float strength = 0.05 / (distanceToCenter + 0.1);
    strength = pow(strength, 1.4);
    
    vec3 finalColor = vColor * (1.0 + vDistance * 0.3);
    gl_FragColor = vec4(finalColor, strength);
  }
`;

const AnimatedTestimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current || !sectionRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    
    const positions = new Float32Array(particlesCount * 3);
    const scales = new Float32Array(particlesCount);
    const startPositions = new Float32Array(particlesCount * 3);
    
    // Create particles in a more spherical distribution
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      
      // Spherical distribution
      const radius = Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      startPositions[i3] = x;
      startPositions[i3 + 1] = y;
      startPositions[i3 + 2] = z;
      
      scales[i] = Math.random() * 0.6 + 0.2; // Smaller size range
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    particlesGeometry.setAttribute('aStartPosition', new THREE.BufferAttribute(startPositions, 3));

    const particlesMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 45 }, // Reduced base size
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseStrength: { value: 1.0 }
      }
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Enhanced mouse interaction with faster response
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      mousePosition.current = { x, y };
      particlesMaterial.uniforms.uMouse.value = new THREE.Vector2(x * 5, y * 5);
      
      gsap.to(particlesMaterial.uniforms.uMouseStrength, {
        value: 1.2,
        duration: 0.2, // Faster response
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(particlesMaterial.uniforms.uMouseStrength, {
        value: 0.0,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Animation with camera motion
    const clock = new THREE.Clock();
    let frame = 0;

    const animate = () => {
      frame++;
      const elapsedTime = clock.getElapsedTime();
      
      // Subtle camera movement
      camera.position.x = Math.sin(elapsedTime * 0.1) * 0.5;
      camera.position.y = Math.cos(elapsedTime * 0.1) * 0.5;
      camera.lookAt(0, 0, 0);
      
      particlesMaterial.uniforms.uTime.value = elapsedTime;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Rest of the component remains the same...
  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black py-16 text-white overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
      <div className="container relative mx-auto px-4 z-10">
        <h2 className="mb-12 text-center text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
          What Our Customers Say
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="testimonial-card group">
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-md transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-700/30">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="mb-4 flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 fill-yellow-400 text-yellow-400 transform transition-transform hover:scale-110"
                  />
                ))}
              </div>
              <p className="mb-6 text-gray-200 text-lg">
                The AC cleaning service was thorough and efficient. My home feels fresh and cool again. Thank you.
              </p>
              <div className="flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
                      P
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
                    Priya Patel
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-card group">
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-md transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-700/30">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="mb-4 flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 fill-yellow-400 text-yellow-400 transform transition-transform hover:scale-110"
                  />
                ))}
              </div>
              <p className="mb-6 text-gray-200 text-lg">
                Helper Buddy transformed my home with their exceptional cleaning service. Highly recommend for any
                cleaning needs.
              </p>
              <div className="flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
                      P
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
                    Purvi Patel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedTestimonials;