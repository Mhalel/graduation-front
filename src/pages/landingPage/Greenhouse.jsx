import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Plane } from "@react-three/drei";
import * as THREE from "three";
// import { three } from "maath";

// Improved glass material with better transparency
const GlassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xaaccee,
  transparent: true,
  opacity: 0.5,
  roughness: 0.1,
  transmission: 0.5,
  thickness: 0.1,
  side: THREE.DoubleSide,
});

// Frame material for greenhouse structure
const FrameMaterial = new THREE.MeshStandardMaterial({
  color: "#A47449",
  metalness: 0.6,
  roughness: 0.7
});

// Door and window component with animation
const OpenableElement = ({ position, rotation, isWindow, width, height }) => {
  const elementRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const size = isWindow ? [width, height, 0.05] : [width, height, 0.05];
  
  // Toggle open/close effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(prev => !prev);
    }, isWindow ? 8000 : 12000); // Different timing for window and door
    
    return () => clearInterval(interval);
  }, [isWindow]);
  
  useFrame(() => {
    if (!elementRef.current) return;
    
    const targetRotation = isOpen ? (isWindow ? Math.PI/4 : Math.PI/2) : 0;
    elementRef.current.rotation.y += (targetRotation - elementRef.current.rotation.y) * 0.05;
  });
  
  return (
    <group position={position} rotation={rotation}>
      <group ref={elementRef} position={[width/2, 0, 0]}>
        <mesh position={[-width/2, 0, 0]}>
          <boxGeometry args={size} />
          <meshStandardMaterial 
            color={isWindow ? "#87CEFA" : "#8B4513"}
            transparent={isWindow}
            opacity={isWindow ? 1 : 1}
            metalness={isWindow ? 0.2 : 0}
            roughness={0.3}

          />
        </mesh>
        {!isWindow && (
          <mesh position={[-width/4, 0, 0.03]}>
            <cylinderGeometry args={[0.04, 0.04, 0.08, 8]} rotation={[Math.PI/2, 0, 0]} />
            <meshStandardMaterial color="#FFD700" metalness={0.8} />
          </mesh>
        )}
      </group>
      {/* Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.08, height+0.08, 0.08]} />
        <primitive object={FrameMaterial} attach="material" />
      </mesh>
      <mesh position={[width, 0, 0]}>
        <boxGeometry args={[0.08, height+0.08, 0.08]} />
        <primitive object={FrameMaterial} attach="material" />
      </mesh>
      <mesh position={[width/2, height/2, 0]}>
        <boxGeometry args={[width+0.08, 0.08, 0.08]} />
        <primitive object={FrameMaterial} attach="material" />
      </mesh>
      <mesh position={[width/2, -height/2, 0]}>
        <boxGeometry args={[width+0.08, 0.08, 0.08]} />
        <primitive object={FrameMaterial} attach="material" />
      </mesh>
    </group>
  );
};

// LettucePlant component - more detailed
const LettucePlant = ({ position, rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    {/* Stem */}
    <mesh position={[0, 0.05, 0]}>
      <cylinderGeometry args={[0.03, 0.04, 0.1, 8]} />
      <meshStandardMaterial color="#90EE90" />
    </mesh>
    
    {/* Core/Heart */}
    <mesh position={[0, 0.12, 0]}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color="#7CFC00" roughness={0.7} />
    </mesh>
    
    {/* Leaves - more defined and crisp lettuce leaves */}
    {[...Array(12)].map((_, i) => {
      const angleStep = (Math.PI * 2) / 12;
      const radius = 0.1 + (i % 3) * 0.03;
      const curveAmount = 0.04 + (i % 2) * 0.02;
      const height = 0.02 + (i % 3) * 0.01;
      
      return (
        <mesh 
          key={`leaf-${i}`} 
          position={[
            Math.sin(i * angleStep) * radius * 0.7, 
            0.09 + (i % 3) * 0.02, 
            Math.cos(i * angleStep) * radius
          ]}
          rotation={[
            Math.PI/2 - curveAmount * 8,
            i * angleStep, 
            0
          ]}
        >
          {/* More lettuce-shaped leaves - FIXED: changed cylinderBufferGeometry to cylinderGeometry */}
          <cylinderGeometry args={[0.12, 0.08, height, 5, 1, false, 0, Math.PI]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#90EE90" : "#7CFC00"} 
            side={THREE.DoubleSide}
            roughness={0.8}
          />
        </mesh>
      );
    })}
  </group>
);

// Single large pot with three lettuce plants
const LargePotWithPlants = ({ position }) => (
  <group position={position}>
    {/* Large Pot */}
    <mesh position={[0, 0.15, 0]}>
      <cylinderGeometry args={[0.5, 0.4, 0.4, 16]} />
      <meshStandardMaterial color="#8B4513" roughness={0.8} />
    </mesh>
    
    {/* Soil */}
    <mesh position={[0, 0.33, 0]}>
      <cylinderGeometry args={[0.48, 0.48, 0.08, 16]} />
      <meshStandardMaterial color="#3D2817" roughness={1} />
    </mesh>
    
    {/* Three lettuce plants positioned in the pot */}
    <LettucePlant position={[-0.18, 0.36, -0.18]} scale={1.1} />
    <LettucePlant position={[0.2, 0.36, -0.1]} rotation={[0, Math.PI/3, 0]} scale={0.9} />
    <LettucePlant position={[0, 0.36, 0.2]} rotation={[0, -Math.PI/4, 0]} />
  </group>
);

// Improved RobotCar component with better wheels
const RobotCar = React.forwardRef(({ position, rotation = 0 }, ref) => (
  <group ref={ref} position={position} rotation={[0, rotation, 0]}>
    {/* Main chassis base plate - white/silver */}
    <mesh position={[0, 0.2, 0]}>
      <boxGeometry args={[0.8, 0.05, 0.6]} />
      <meshStandardMaterial color="#E0E0E0" metalness={0.5} roughness={0.3} />
    </mesh>
    <mesh position={[0, 0.06, 0]}>
      <boxGeometry args={[0.8, 0.05, 0.6]} />
      <meshStandardMaterial color="#E0E0E0" metalness={0.5} roughness={0.3} />
    </mesh>

    {/* Wheels - improved with golden centers */}
    {[
      [-0.4, 0.12, 0.2], // front-left
      [0.4, 0.12, 0.2],  // front-right
      [-0.4, 0.12, -0.2], // back-left
      [0.4, 0.12, -0.2]  // back-right
    ].map((pos, idx) => (
      <group key={`wheel-${idx}`} position={pos}>
        {/* Tire */}
        <mesh rotation={[Math.PI/2, 0, 1.57]}>
          <cylinderGeometry args={[0.12, 0.12, 0.05, 16]} />
          <meshStandardMaterial color="#333333"   roughness={0.8} />
          
          {/* Gold center hub */}
          <mesh>
            <cylinderGeometry args={[0.06, 0.06, 0.06, 12]} />
            <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* Spokes */}
          {/* {[...Array(6)].map((_, i) => {
            const angle = (Math.PI * 2 / 6) * i;
            return (
              <mesh 
                key={`spoke-${i}`} 
                position={[
                  Math.cos(angle) * 0.05,
                  0,
                  Math.sin(angle) * 0.05
                ]}
                rotation={[0, 0, angle]}
                scale={[0.03, 0.01, 0.1]}
              >
                <boxGeometry />
                <meshStandardMaterial color="#B8B8B8" metalness={0.5} />
              </mesh>
            );
          })} */}
        </mesh>
      </group>
    ))}

    {/* Electronics board */}
    <mesh position={[0, 0.18, 0]}>
      <boxGeometry args={[0.5, 0.04, 0.4]} />
      <meshStandardMaterial color="#232E21" roughness={0.7} />
    </mesh>

    {/* Ultrasonic sensor (eyes) */}
    <group position={[0, 0.25, 0.2]}>
      <mesh>
        <boxGeometry args={[0.25, 0.1, 0.05]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
      {[-0.07, 0.07].map((x, i) => (
        <mesh key={`eye-${i}`} position={[x, 0, 0.03]}>
          <cylinderGeometry args={[0.04, 0.04, 0.06, 16]} rotation={[Math.PI/2, 0, 0]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      ))}
    </group>

    {/* Motor controller */}
    <mesh position={[0, 0.1, -0.15]}>
      <boxGeometry args={[0.2, 0.1, 0.15]} />
      <meshStandardMaterial color="#1E3F66" />
    </mesh>

    {/* Green circuit board */}
    <mesh position={[0, 0.22, 0]}>
      <boxGeometry args={[0.3, 0.02, 0.2]} />
      <meshStandardMaterial color="#00A36C" />
    </mesh>
  </group>
));

// Moving robot car logic
const MovingRobotCar = () => {
  const carRef = useRef();
  const [phase, setPhase] = useState(0);

  // Path around the greenhouse perimeter
  const positions = [
    { x: -3, z: -2.5, rot: 0 },
    { x: 3, z: -2.5, rot: Math.PI/2 },
    { x: 3, z: 2.5, rot: Math.PI },
    { x: -3, z: 2.5, rot: 3*Math.PI/2 },
  ];

  const speed = 0.05;

  useFrame(() => {
    if (!carRef.current) return;

    const next = positions[(phase + 1) % positions.length];
    const pos = carRef.current.position;

    const dx = next.x - pos.x;
    const dz = next.z - pos.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    if (distance < 0.05) {
      setPhase((prev) => (prev + 1) % positions.length);
    } else {
      pos.x += (dx / distance) * speed;
      pos.z += (dz / distance) * speed;

      // Smooth rotation
      const targetRotation = Math.atan2(dx, dz);
      let currentRotation = carRef.current.rotation.y;
      
      // Normalize angle difference
      let diff = targetRotation - currentRotation;
      while (diff > Math.PI) diff -= 2 * Math.PI;
      while (diff < -Math.PI) diff += 2 * Math.PI;
      
      // Apply smooth rotation
      carRef.current.rotation.y += diff * 0.1;
    }
  });

  return <RobotCar ref={carRef} position={[-3, 0.12, -2.5]} />;
};

// Improved greenhouse model with triangular roof
const GreenhouseModel = () => {
  return (
    <group>
      {/* Ground with texture */}
      <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <meshStandardMaterial color="#3c7a3d" side={THREE.DoubleSide} roughness={0.9} />
      </Plane>

      {/* Greenhouse Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[7, 0.1, 5]} />
        <meshStandardMaterial color="#888888" metalness={0.2} side={THREE.DoubleSide} roughness={0.8} />
      </mesh>

      {/* Frame structure - vertical pillars */}
      {[
        [-3.45, 1, -2.45], // back-left
        [3.45, 1, -2.45],  // back-right
        [3.45, 1, 2.45],   // front-right
        [-3.45, 1, 2.45],  // front-left
      ].map((pos, idx) => (
        <mesh key={`pillar-${idx}`} position={pos}>
          <boxGeometry args={[0.1, 2, 0.1]} />
          <primitive object={FrameMaterial} attach="material" />
        </mesh>
      ))}

      {/* Walls - with gaps for door and window */}
      {/* Back wall */}
      <mesh position={[-1.2, 1, -2.45]} material={GlassMaterial}>
        <planeGeometry args={[4.5, 2]} />
      </mesh>
      <mesh position={[2.6, 1, -2.45]} material={GlassMaterial}>
        <planeGeometry args={[1.7, 2]} />
      </mesh>
      
      {/* Front wall with door space */}
      <mesh position={[-2.2, 1, 2.45]} rotation={[0, Math.PI, 0]} material={GlassMaterial}>
        <planeGeometry args={[2.5, 2]} />
      </mesh>
      <mesh position={[2.2, 1, 2.45]} rotation={[0, Math.PI, 0]} material={GlassMaterial}>
        <planeGeometry args={[2.5, 2]} />
      </mesh>
      
      {/* Side walls */}
      <mesh position={[-3.45, 1, 0]} rotation={[0, Math.PI / 2, 0]} material={GlassMaterial}>
        <planeGeometry args={[5, 2]} />
      </mesh>
      <mesh position={[3.45, 1, 0]} rotation={[0, -Math.PI / 2, 0]} material={GlassMaterial}>
        <planeGeometry args={[5, 2]} />
      </mesh>

      {/* Door - front center */}
      <OpenableElement 
        position={[-0.9, 1.86/2, 2.45]} 
        rotation={[0, 0, 0]} 
        isWindow={false}
        width={1.8}
        height={1.8}
      />

      {/* Window - on back wall */}
      <OpenableElement 
        position={[1.2, 0.5, -2.45]} 
        rotation={[0, 0, 0]} 
        isWindow={true}
        width={1.0}
        height={1.0}
      />

      {/* Triangular roof - A-frame */}
      {/* Triangle ends */}
      {[3.46, -3.46].map((x, idx) => (
        <mesh key={`roof-end-${idx}`} position={[x, 2, 0]} scale={[0.68,1,1]} rotation={[0,Math.PI/2,0]} material={GlassMaterial}>
          {/* <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={3}
              array={new Float32Array([-3.5, 0, 0, 3.5, 0, 0, 0, 1.5, 0])}
              itemSize={2}
            />
            <bufferAttribute
              attach="attributes-normal"
              count={3}
              array={new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1])}
              itemSize={3}
            />
          </bufferGeometry> */}
        </mesh>
      ))}
      
      {/* Roof sides */}
      <mesh position={[0, 2.75, 1.2]} rotation={[-Math.PI/3.2, 0, 0]} material={GlassMaterial}>
        <planeGeometry args={[7, 2.9]} />
      </mesh>
      <mesh position={[0, 2.75, -1.2]} rotation={[Math.PI/3.2, 0, 0]} material={GlassMaterial}>
        <planeGeometry args={[7, 2.9]} />
      </mesh>

      {/* Roof ridge beam */}
      <mesh position={[0, 3.5, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[7.2, 0.08, 0.08]} />
        <primitive object={FrameMaterial} attach="material" />
      </mesh>

      {/* Roof vertical supports */}
      {/* {[-3, -2, -1, 0, 1, 2, 3].map((x) => (
        <mesh key={`roof-support-${x}`} position={[x, 1.8, 0]}>
          <boxGeometry args={[0.06, 3.3, 0.06]} />
          <primitive object={FrameMaterial} attach="material" />
        </mesh>
      ))} */}

      {/* Single large pot with three lettuce plants */}
      <LargePotWithPlants position={[0, 0, -1]} />

      {/* Moving Robot Car */}
      <MovingRobotCar />
    </group>
  );
};

// Scene wrapper
const GreenhouseScene = () => {
  return (
    <div style={{ height: "70vh", width: "100%" }}>
      <Canvas camera={{ position: [8, 5, 8], fov: 50 }}>
        <color attach="background" args={["#87CEEB"]} />
        {/* <fog attach="fog" args={["#f0f0f0", 10, 30]} /> */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <OrbitControls enablePan={true} maxDistance={12} minDistance={6} maxPolarAngle={Math.PI/2.5} enableZoom={true} enableRotate={true} />
        <GreenhouseModel />
      </Canvas>
    </div>
  );
};

export default GreenhouseScene;