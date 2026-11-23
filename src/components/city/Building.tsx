import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { BUILDING_CONFIGS, BuildingType } from '@types/city'

interface Building3DProps {
  type: BuildingType
  level: number
  position: [number, number, number]
  color: string
  onClick?: () => void
}

export function Building3D({ type, level, position, color, onClick }: Building3DProps) {
  const config = BUILDING_CONFIGS[type]
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.03
      // Very slow rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.01
    }
  })

  // Calculate building dimensions based on level
  const width = config.baseSize.width * (1 + (level - 1) * 0.15)
  const depth = config.baseSize.depth * (1 + (level - 1) * 0.15)
  const height = config.baseSize.height * (1 + (level - 1) * 0.2)

  const hexColor = parseInt(color.replace('#', ''), 16)

  return (
    <group ref={groupRef} position={position} onClick={onClick}>
      {/* Main building */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={hexColor}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[0, height / 2 + 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.3, 0.3, depth + 0.3]} />
        <meshStandardMaterial
          color={0x2A323C}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Windows */}
      <group>
        {Array.from({ length: Math.floor(height / 1.2) }).map((_, floor) => {
          const floors = Math.floor(height / 1.5)
          const windowsPerSide = Math.floor(width / 1.2)

          return Array.from({ length: 4 }).map((_, side) => {
            if (Math.random() > 0.3) return null

            const angle = (side / 4) * Math.PI * 2
            const radius = (side % 2 === 0 ? depth : width) / 2 + 0.05

            return (
              <mesh
                key={`${floor}-${side}`}
                position={[
                  Math.sin(angle) * radius,
                  0.8 + floor * 1.5,
                  Math.cos(angle) * radius,
                ]}
                rotation={[0, angle + Math.PI / 2, 0]}
              >
                <planeGeometry args={[0.6, 0.8]} />
                <meshStandardMaterial
                  color={0x3B82F6}
                  emissive={0x3B82F6}
                  emissiveIntensity={0.3}
                  transparent
                  opacity={0.8}
                  side={THREE.DoubleSide}
                />
              </mesh>
            )
          })
        })}
      </group>

      {/* Level indicator for high levels */}
      {level >= 5 && (
        <mesh position={[0, height + 1, 0]} castShadow>
          <coneGeometry args={[0.8, 1.5, 6]} />
          <meshStandardMaterial
            color={0xC9B896}
            emissive={0xC9B896}
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
      )}
    </group>
  )
}

function Road({ width = 3, length = 100 }: { width?: number; length?: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
      <planeGeometry args={[width, length]} />
      <meshStandardMaterial color={0x1E242A} roughness={0.9} metalness={0.1} />
    </mesh>
  )
}

function StreetLight({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.12, 4, 8]} />
        <meshStandardMaterial color={0x2A323C} roughness={0.7} metalness={0.3} />
      </mesh>
      <mesh position={[0, 2, 0]} castShadow>
        <sphereGeometry args={[0.4, 8, 8]} />
        <meshStandardMaterial
          color={0xF5F0E8}
          emissive={0xF5F0E8}
          emissiveIntensity={1}
          roughness={0.3}
        />
      </mesh>
      <pointLight position={[0, 2.5, 0]} color={0xF5F0E8} intensity={0.8} distance={15} decay={2} />
    </group>
  )
}

function Tree({ position }: { position: [number, number, number] }) {
  const scale = 0.8 + Math.random() * 0.4
  const trunkColor = 0x3D2B1F
  const leafColors = [0x166534, 0x15803D, 0x14532D]
  const leafColor = leafColors[Math.floor(Math.random() * leafColors.length)]

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

export function CityScene({ buildings }: { buildings: any[] }) {
  const roadPositions = useRef<[number, number, number][]>([])

  useEffect(() => {
    const spacing = 10
    const positions: [number, number, number][] = []

    for (let i = -5; i <= 5; i++) {
      positions.push([i * spacing, 0.02, 0]) // Horizontal roads
      positions.push([0, 0.02, i * spacing]) // Vertical roads
    }
    roadPositions.current = positions
  }, [])

  return (
    <group>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[120, 120, 60, 60]} />
        <meshStandardMaterial color={0x0F172A} roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Roads */}
      {roadPositions.current.map((pos, i) => (
        <Road key={i} position={pos} width={3} length={100} />
      ))}

      {/* Buildings */}
      {buildings.map((building, i) => (
        <Building3D
          key={building.id}
          type={building.type}
          level={building.level}
          position={[
            building.position.x,
            building.position.y,
            building.position.z
          ]}
          color={building.color}
        />
      ))}

      {/* Street lights at intersections */}
      {roadPositions.current.map((pos, i) => {
        if (pos[0] === 0 || pos[2] === 0) return null // Skip center
        return (
          <StreetLight key={i} position={[pos[0], 0, pos[2]]} />
        )
      })}

      {/* Trees around perimeter */}
      {Array.from({ length: 40 }).map((_, i) => (
        <Tree
          key={i}
          position={[
            (Math.random() - 0.5) * 100,
            0,
            (Math.random() - 0.5) * 100,
          ]}
        />
      ))}
    </group>
  )
}