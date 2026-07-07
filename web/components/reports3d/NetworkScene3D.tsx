"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line, Html } from "@react-three/drei";
import type { Topology3DData, TopologyNode3D } from "@/lib/types";
import * as THREE from "three";

function NetworkNode({
  node,
  selected,
  onSelect,
}: {
  node: TopologyNode3D;
  selected: boolean;
  onSelect: (n: TopologyNode3D) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isGateway = node.id === "gateway";
  const scale = isGateway ? 0.55 : 0.35 + (node.latencyMs ?? 0) / 40;
  const color = node.color;

  useFrame((state) => {
    if (!meshRef.current) return;
    if (node.status === "down") {
      meshRef.current.position.y =
        node.y + Math.sin(state.clock.elapsedTime * 3) * 0.05;
    }
  });

  return (
    <group position={[node.x, node.y, node.z]}>
      <mesh
        ref={meshRef}
        scale={selected ? scale * 1.3 : scale}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node);
        }}
      >
        {isGateway ? (
          <octahedronGeometry args={[1, 0]} />
        ) : (
          <boxGeometry args={[1, 1, 1]} />
        )}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={selected ? 0.9 : 0.45}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
      <Text
        position={[0, scale + 0.5, 0]}
        fontSize={0.28}
        color="#e8edf4"
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.02}
        outlineColor="#06040f"
      >
        {node.label}
      </Text>
      {selected && (
        <Html distanceFactor={12} position={[0, scale + 1.2, 0]}>
          <div className="rounded-lg border border-accent/40 bg-[#0c0818]/95 px-3 py-2 text-xs backdrop-blur-md shadow-glow-cyan">
            <div className="font-semibold text-gradient-dynamic">{node.label}</div>
            {node.ip && <div className="text-[var(--muted)]">{node.ip}</div>}
            <div className="capitalize text-accent">{node.status}</div>
            {node.latencyMs != null && (
              <div className="font-mono">{node.latencyMs}ms</div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

function NetworkEdges({
  data,
  nodeMap,
}: {
  data: Topology3DData;
  nodeMap: Map<string, TopologyNode3D>;
}) {
  return (
    <>
      {data.edges.map((edge, i) => {
        const from = nodeMap.get(edge.from);
        const to = nodeMap.get(edge.to);
        if (!from || !to) return null;
        return (
          <Line
            key={`${edge.from}-${edge.to}-${i}`}
            points={[
              [from.x, from.y, from.z],
              [to.x, to.y, to.z],
            ]}
            color="#8b5cf6"
            lineWidth={1}
            transparent
            opacity={0.5}
          />
        );
      })}
    </>
  );
}

function Scene({
  data,
  selected,
  onSelect,
}: {
  data: Topology3DData;
  selected: TopologyNode3D | null;
  onSelect: (n: TopologyNode3D) => void;
}) {
  const nodeMap = new Map(data.nodes.map((n) => [n.id, n]));

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[10, 12, 10]} intensity={1.2} color="#00d4ff" />
      <pointLight position={[-8, 6, -10]} intensity={0.8} color="#ec4899" />
      <pointLight position={[0, -5, 5]} intensity={0.5} color="#8b5cf6" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#14102a"
          metalness={0.8}
          roughness={0.4}
          transparent
          opacity={0.6}
        />
      </mesh>

      <NetworkEdges data={data} nodeMap={nodeMap} />
      {data.nodes.map((node) => (
        <NetworkNode
          key={node.id}
          node={node}
          selected={selected?.id === node.id}
          onSelect={onSelect}
        />
      ))}

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        minDistance={3}
        maxDistance={25}
        maxPolarAngle={Math.PI / 2.1}
      />
    </>
  );
}

export function NetworkScene3D({ data }: { data: Topology3DData }) {
  const [selected, setSelected] = useState<TopologyNode3D | null>(null);

  return (
    <div className="table-3d h-[520px] w-full overflow-hidden rounded-xl">
      <Canvas
        camera={{ position: [8, 8, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene data={data} selected={selected} onSelect={setSelected} />
      </Canvas>
    </div>
  );
}
