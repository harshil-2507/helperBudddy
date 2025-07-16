"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import type { Mesh } from "three"
import { Environment, Float, PerspectiveCamera } from "@react-three/drei"

function MovingSpheres() {
  const sphere1 = useRef<Mesh>(null)
  const sphere2 = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (sphere1.current && sphere2.current) {
      sphere1.current.position.x = Math.sin(clock.getElapsedTime() * 0.3) * 2
      sphere1.current.position.y = Math.cos(clock.getElapsedTime() * 0.2) * 2
      sphere2.current.position.x = Math.cos(clock.getElapsedTime() * 0.2) * 2
      sphere2.current.position.y = Math.sin(clock.getElapsedTime() * 0.3) * 2
    }
  })

  return (
    <>
      <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={sphere1} position={[0, 0, -2]} as={Mesh}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color="#4F46E5" opacity={0.5} transparent />
        </mesh>
      </Float>
      <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={sphere2} position={[0, 0, -4]} as={Mesh}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial color="#7C3AED" opacity={0.3} transparent />
        </mesh>
      </Float>
    </>
  )
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <MovingSpheres />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

