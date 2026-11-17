"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Float, Icosahedron, Torus, Octahedron } from "@react-three/drei";
import { useRef } from "react";
function Rig({children}){const g=useRef();useFrame(({pointer})=>{g.current.rotation.y+=(pointer.x*.4-g.current.rotation.y)*.05;g.current.rotation.x+=(-pointer.y*.3-g.current.rotation.x)*.05});return <group ref={g}>{children}</group>}
const M=({c})=><meshStandardMaterial color={c} metalness={.8} roughness={.25}/>;
export default function Scene({reduced}){const s=reduced?0:2;
 return <Canvas dpr={[1,1.5]} camera={{position:[0,0,6],fov:45}} aria-hidden="true">
  <ambientLight intensity={.4}/><pointLight position={[4,4,4]} intensity={60} color="#4D7CFF"/><pointLight position={[-4,-2,3]} intensity={40} color="#8B5CF6"/>
  <Sparkles count={reduced?0:70} scale={[12,7,4]} size={2.5} speed={.4} color="#8B5CF6"/><Rig><Float speed={s}><Icosahedron args={[.6]} position={[3.2,1.2,0]}><M c="#4D7CFF"/></Icosahedron></Float>
  <Float speed={s}><Torus args={[.5,.16,16,48]} position={[3.6,-1.3,-1]}><M c="#8B5CF6"/></Torus></Float>
  <Float speed={s}><Octahedron args={[.4]} position={[-3.4,-1.4,0]}><M c="#4D7CFF"/></Octahedron></Float></Rig>
 </Canvas>}
