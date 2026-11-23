import { Canvas } from '@react-three/fiber'
import { motion } from 'motion/react'
import { Suspense, useMemo } from 'react'
import * as THREE from 'three'

// Building types with colors
const BUILDING_TYPES = [
  { type: 'hq', color: 0xC9B896, width: 4, depth: 4, height: 6, probability: 0.05 },
  { type: 'office', color: 0xA38F6E, width: 3, depth: 3, height: 5, probability: 0.25 },
  { type: 'retail', color: 0xB8A484, width: 3, depth: 3, height: 3, probability: 0.3 },
  { type: 'warehouse', color: 0x8B7A5A, width: 4, depth: 4, height: 4, probability: 0.15 },
  { type: 'research', color: 0x7A6B4A, width: 3, depth: 3, height: 4, probability: 0.1 },
  { type: 'factory', color: 0x6B5D3A, width: 5, depth: 4, height: 4, probability: 0.15 },
]

interface BuildingProps {
  position: [number, number, number]
  type: typeof BUILDING_TYPES[0]
  index: number
}

function Building({ position, type, index }: BuildingProps) {
  const groupRef = React.useRef<THREE.Group>(null!)
  const [hovered, setHovered] = React.useState(false)

  // Animation
  React.useFrame((state, delta) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.05
      // Very slow rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1 + index) * 0.02
    }
  })

  // Create building geometry
  const geometry = useMemo(() => {
    const group = new THREE.Group()

    // Main building
    const mainGeo = new THREE.BoxGeometry(type.width, type.height, type.depth)
    const mainMat = new THREE.MeshStandardMaterial({
      color: type.color,
      roughness: 0.7,
      metalness: 0.1,
    })
    const mainMesh = new THREE.Mesh(mainGeo, mainMat)
    mainMesh.position.y = type.height / 2
    mainMesh.castShadow = true
    mainMesh.receiveShadow = true
    group.add(mainMesh)

    // Roof
    const roofGeo = new THREE.BoxGeometry(type.width + 0.2, 0.3, type.depth + 0.2)
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0x2A323C,
      roughness: 0.8,
      metalness: 0.2,
    })
    const roofMesh = new THREE.Mesh(roofGeo, roofMat)
    roofMesh.position.y = type.height + 0.15
    roofMesh.castShadow = true
    group.add(roofMesh)

    // Windows
    const windowGeo = new THREE.PlaneGeometry(0.6, 0.8)
    const windowMat = new THREE.MeshStandardMaterial({
      color: 0x3B82F6,
      emissive: 0x3B82F6,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    })

    const floors = Math.floor(type.height / 1.5)
    const windowsPerFloor = Math.floor(type.width / 1.2)

    for (let floor = 0; floor < floors; floor++) {
      for (let w = 0; w < windowsPerFloor; w++) {
        for (let side = 0; side < 4; side++) {
          if (Math.random() > 0.3) continue // Random window placement

          const windowMesh = new THREE.Mesh(windowGeo, windowMat)
          const angle = (side / 4) * Math.PI * 2
          const radius = (side % 2 === 0 ? type.depth : type.width) / 2 + 0.05

          windowMesh.position.x = Math.sin(angle) * radius
          windowMesh.position.z = Math.cos(angle) * radius
          windowMesh.position.y = 1 + floor * 1.5
          windowMesh.rotation.y = angle + Math.PI / 2

          group.add(windowMesh)
        }
      }
    }

    return group
  }, [type])

  return (
    <group ref={groupRef} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <primitive object={geometry} />
    </group>
  )
}

function Road({ width = 2, length = 100, position = [0, 0, 0] }: { width?: number; length?: number; position?: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[width, length]} />
      <meshStandardMaterial color={0x1E242A} roughness={0.9} metalness={0.1} />
    </mesh>
  )
}

function StreetLight({ position }: { position: [number, number, number] }) {
  const lightRef = React.useRef<THREE.PointLight>(null!)

  React.useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.08, 3, 8]} />
        <meshStandardMaterial color={0x2A323C} roughness={0.7} metalness={0.3} />
      </mesh>
      <mesh position={[0, 1.5, 0]} castShadow>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial color={0xF5F0E8} emissive={0xF5F0E8} emissiveIntensity={1} roughness={0.3} />
      </mesh>
      <pointLight ref={lightRef} position={[0, 2, 0]} color={0xF5F0E8} intensity={0.5} distance={10} decay={2} />
    </group>
  )
}

function Vehicle({ position, speed = 0.02, color = 0x3B82F6 }: { position: [number, number, number]; speed?: number; color?: number }) {
  const vehicleRef = React.useRef<THREE.Group>(null!)

  React.useFrame((state, delta) => {
    if (vehicleRef.current) {
      vehicleRef.current.position.x += speed * delta * 60
      // Loop around
      if (vehicleRef.current.position.x > 50) vehicleRef.current.position.x = -50
    }
  })

  return (
    <group ref={vehicleRef} position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.8, 1.2]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[1.5, 0.7, 1]} />
        <meshStandardMaterial color={0x2A323C} roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Wheels */}
      <mesh position={[-1, -0.4, 0.6]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 8]} />
        <meshStandardMaterial color={0x0D0F11} roughness={0.8} />
      </mesh>
      <mesh position={[1, -0.4, 0.6]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 8]} />
        <meshStandardMaterial color={0x0D0F11} roughness={0.8} />
      </mesh>
      <mesh position={[-1, -0.4, -0.6]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 8]} />
        <meshStandardMaterial color={0x0D0F11} roughness={0.8} />
      </mesh>
      <mesh position={[1, -0.4, -0.6]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 8]} />
        <meshStandardMaterial color={0x0D0F11} roughness={0.8} />
      </mesh>
    </group>
  )
}

function Trees({ count = 20 }: { count?: number }) {
  const trees = useMemo(() => {
    const positions: [number, number, number][] = []
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 15 + Math.random() * 20
      positions.push([
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius,
      ])
    }
    return positions
  }, [count])

  return (
    <group>
      {trees.map((pos, i) => (
        <Tree key={i} position={pos} />
      ))}
    </group>
  )
}

function Tree({ position }: { position: [number, number, number] }) {
  const scale = 0.8 + Math.random() * 0.4
  const trunkColor = 0x3D2B1F
  const leafColor = [0x166534, 0x15803D, 0x14532D][Math.floor(Math.random() * 3)]

  return (
    <group position={position} scale={scale}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.5, 1.5, 6]} />
        <meshStandardMaterial color={trunkColor} roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <coneGeometry args={[1.2, 2, 8]} />
        <meshStandardMaterial color={leafColor} roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.2, 0]} castShadow receiveShadow scale={0.7}>
        <coneGeometry args={[1.2, 2, 8]} />
        <meshStandardMaterial color={leafColor} roughness={0.8} />
      </mesh>
    </group>
  )
}

function CityScene() {
  // Generate city layout
  const buildings = useMemo(() => {
    const layout: { position: [number, number, number]; type: typeof BUILDING_TYPES[0] }[] = []

    // Central HQ
    layout.push({
      position: [0, 0, 0],
      type: BUILDING_TYPES[0], // HQ
    })

    // Grid layout for other buildings
    const gridSize = 4
    const spacing = 8

    for (let x = -gridSize; x <= gridSize; x++) {
      for (let z = -gridSize; z <= gridSize; z++) {
        if (x === 0 && z === 0) continue // Skip center (HQ)

        // Random chance for building
        if (Math.random() < 0.7) {
          const rand = Math.random()
          let cumulative = 0
          let selectedType = BUILDING_TYPES[1]

          for (const type of BUILDING_TYPES.slice(1)) {
            cumulative += type.probability
            if (rand < cumulative) {
              selectedType = type
              break
            }
          }

          layout.push({
            position: [x * spacing + (Math.random() - 0.5) * 2, 0, z * spacing + (Math.random() - 0.5) * 2],
            type: selectedType,
          })
        }
      }
    }

    return layout
  }, [])

  const roads = useMemo(() => {
    const roadPositions: [number, number, number][] = []
    const spacing = 8

    // Main roads
    for (let i = -4; i <= 4; i++) {
      roadPositions.push([i * spacing, 0.01, 0]) // Horizontal
      roadPositions.push([0, 0.01, i * spacing]) // Vertical
    }

    return roadPositions
  }, [])

  const streetLights = useMemo(() => {
    const positions: [number, number, number][] = []
    const spacing = 8

    for (let i = -4; i <= 4; i++) {
      for (let j = -4; j <= 4; j++) {
        if ((i === 0 && j === 0) || Math.random() < 0.3) continue
        positions.push([i * spacing, 0, j * spacing])
      }
    }

    return positions
  }, [])

  const vehicles = useMemo(() => {
    return [
      { position: [-40, 0.5, -8], speed: 0.015, color: 0x3B82F6 },
      { position: [40, 0.5, 8], speed: -0.012, color: 0xEF4444 },
      { position: [-8, 0.5, -40], speed: 0.01, color: 0x10B981 },
      { position: [8, 0.5, 40], speed: -0.018, color: 0xF59E0B },
    ]
  }, [])

  return (
    <group>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[100, 100, 50, 50]} />
        <meshStandardMaterial
          color={0x0F172A}
          roughness={0.9}
          metalness={0.1}
          wireframe={false}
        />
      </mesh>

      {/* Roads */}
      {roads.map((pos, i) => (
        <Road key={i} position={pos} width={2} length={80} />
      ))}

      {/* Buildings */}
      {buildings.map((building, i) => (
        <Building key={i} position={building.position} type={building.type} index={i} />
      ))}

      {/* Street lights */}
      {streetLights.map((pos, i) => (
        <StreetLight key={i} position={pos} />
      ))}

      {/* Vehicles */}
      {vehicles.map((v, i) => (
        <Vehicle key={i} position={v.position} speed={v.speed} color={v.color} />
      ))}

      {/* Trees around the perimeter */}
      <Trees count={30} />
    </group>
  )
}

function FallbackCity() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-graphite-950">
      <div className="text-center p-8">
        <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-graphite-800 to-graphite-900 border border-graphite-700 flex items-center justify-center">
          <svg className="w-16 h-16 text-champagne-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <p className="text-body-sm text-slate-500">3D city requires WebGL support</p>
        <p className="text-caption text-slate-600 mt-1">Experience the full simulation in the dashboard</p>
      </div>
    </div>
  )
}

export function IsometricCity() {
  const [webglError, setWebglError] = React.useState(false)

  if (webglError) {
    return <FallbackCity />
  }

  return (
    <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-graphite-950">
      <Canvas
        camera={{ position: [15, 18, 15], fov: 35 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
        shadows
        onCreated={({ gl }) => {
          gl.setClearColor(0x0D0F11, 1)
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
      >
        <fog color={0x0D0F11} near={10} far={60} />

        {/* Lights */}
        <ambientLight color={0xF5F0E8} intensity={0.4} />
        <directionalLight
          position={[20, 30, 20]}
          color={0xFDFBF7}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={1}
          shadow-camera-far={80}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
          shadow-bias={-0.001}
        />
        <directionalLight
          position={[-10, 15, -10]}
          color={0xC9B896}
          intensity={0.3}
        />
        <hemisphereLight color={0xC9B896} groundColor={0x0F172A} intensity={0.5} />

        <Suspense fallback={<FallbackCity />}>
          <CityScene />
        </Suspense>
      </Canvas>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/80 via-transparent to-transparent pointer-events-none" />

      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-24 h-24 border-t-2 border-l-2 border-champagne-400/30 rounded-tl-xl pointer-events-none" />
      <div className="absolute top-4 right-4 w-24 h-24 border-t-2 border-r-2 border-champagne-400/30 rounded-tr-xl pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-24 h-24 border-b-2 border-l-2 border-champagne-400/30 rounded-bl-xl pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-24 h-24 border-b-2 border-r-2 border-champagne-400/30 rounded-br-xl pointer-events-none" />
    </div>
  )
}

// Need to import React
import React from 'react'