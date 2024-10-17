import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">Sorry, the page you are looking for does not exist.</p>
      <button className='bg-blue-200 p-2 px-3 rounded-lg text-white' onClick={()=>navigate('/')}>Go Back</button>
    </div>
  );
};

export default NotFound;
