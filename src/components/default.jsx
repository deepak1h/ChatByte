import React, { useState, useEffect } from 'react';
import '../css/default.css';
import Logo from '../image/icon.png';

const Default = ({ message }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offsetX = (e.clientX - centerX) / centerX;
      const offsetY = (e.clientY - centerY) / centerY;

      // Calculate rotation angles based on mouse position
      const rotateX = offsetY * 30; // Adjust the rotation angle as needed
      const rotateY = -offsetX * 30; // Adjust the rotation angle as needed

      setRotation({ x: rotateX, y: rotateY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className='nouser'>
      <div
        className='mid'
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <img src={Logo} alt="" />
        <span>ChatByte</span>
      </div>
    </div>
  );
};

export default Default;





// import '../css/default.css'
// import Logo from '../image/icon.png'

// const Default = ({message}) => {

//   return (
//     <div className='nouser'>
//         <div className='mid'>
//             <img src={Logo} alt="" />
//             <span>ChatByte</span>
//         </div>

//     </div>
//   )
// }

// export default Default