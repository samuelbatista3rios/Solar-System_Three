/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import PropTypes from "prop-types";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

// Componente do Sol
const Sun = () => {
  const sunTexture = useLoader(THREE.TextureLoader, "/textures/sun.jpg");
  return (
    <mesh>
      <sphereGeometry args={[5, 32, 32]} />
      <meshBasicMaterial map={sunTexture} />
    </mesh>
  );
};

// Componente dos Planetas
const Planet = ({ texturePath, size, distance, speed, moons = [] }) => {
  const planetRef = useRef();
  const planetTexture = useLoader(THREE.TextureLoader, texturePath);

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.005; // Rotação do planeta
      const t = (Date.now() * speed) / 1000;
      planetRef.current.position.x = distance * Math.cos(t);
      planetRef.current.position.z = distance * Math.sin(t);
    }
  });

  return (
    <group ref={planetRef}>
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={planetTexture} />
      </mesh>
      {moons.map((moon, index) => (
        <Moon key={index} {...moon} parentRef={planetRef} />
      ))}
    </group>
  );
};

// Componente das Luas
const Moon = ({ texturePath, size, distance, speed, parentRef }) => {
  const moonRef = useRef();
  const moonTexture = useLoader(THREE.TextureLoader, texturePath);

  useFrame(() => {
    if (moonRef.current && parentRef.current) {
      const t = (Date.now() * speed) / 1000;
      moonRef.current.position.x = parentRef.current.position.x + distance * Math.cos(t);
      moonRef.current.position.z = parentRef.current.position.z + distance * Math.sin(t);
    }
  });

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial map={moonTexture} />
    </mesh>
  );
};

// Definir PropTypes para evitar erros do ESLint
Planet.propTypes = {
  texturePath: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  distance: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  moons: PropTypes.array,
};

// Definir PropTypes para as luas
Moon.propTypes = {
  texturePath: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  distance: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  parentRef: PropTypes.object.isRequired,
};

// Cena do Sistema Solar
const SolarSystem = () => {
  return (
    <Canvas camera={{ position: [0, 50, 100] }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} />
      <OrbitControls />
      <Stars />
      <Sun />

      {/* Planetas com espaçamentos realistas */}
      <Planet texturePath="/textures/mercury.jpg" size={0.38} distance={10} speed={0.24} />
      <Planet texturePath="/textures/venus.jpg" size={0.95} distance={16} speed={0.18} />
      <Planet
        texturePath="/textures/earth.jpg"
        size={1}
        distance={22}
        speed={0.10}
        moons={[
          { texturePath: "/textures/moon.jpg", size: 0.27, distance: 2, speed: 0.5 },
        ]}
      />
      <Planet
        texturePath="/textures/mars.jpg"
        size={0.53}
        distance={30}
        speed={0.08}
        moons={[
          { texturePath: "/textures/phobos.jpg", size: 0.1, distance: 1.5, speed: 0.3 },
          { texturePath: "/textures/deimos.jpg", size: 0.06, distance: 2.2, speed: 0.25 },
        ]}
      />
      <Planet
        texturePath="/textures/jupiter.jpg"
        size={3}
        distance={50}
        speed={0.04}
        moons={[
          { texturePath: "/textures/io.jpg", size: 0.4, distance: 4, speed: 0.2 },
          { texturePath: "/textures/europa.jpg", size: 0.3, distance: 5, speed: 0.15 },
          { texturePath: "/textures/ganymede.jpg", size: 0.5, distance: 7, speed: 0.1 },
          { texturePath: "/textures/callisto.jpg", size: 0.48, distance: 9, speed: 0.08 },
        ]}
      />
      <Planet
        texturePath="/textures/saturn.jpg"
        size={2.5}
        distance={70}
        speed={0.03}
        moons={[
          { texturePath: "/textures/titan.jpg", size: 0.4, distance: 5, speed: 0.12 },
          { texturePath: "/textures/enceladus.jpg", size: 0.1, distance: 3, speed: 0.2 },
        ]}
      />
      <Planet
        texturePath="/textures/uranus.jpg"
        size={2}
        distance={90}
        speed={0.02}
        moons={[
          { texturePath: "/textures/titania.jpg", size: 0.2, distance: 4, speed: 0.1 },
          { texturePath: "/textures/oberon.jpg", size: 0.2, distance: 5, speed: 0.08 },
        ]}
      />
      <Planet
        texturePath="/textures/neptune.jpg"
        size={1.9}
        distance={110}
        speed={0.01}
        moons={[
          { texturePath: "/textures/triton.jpg", size: 0.3, distance: 4.5, speed: 0.09 },
        ]}
      />
    </Canvas>
  );
};

export default SolarSystem;
