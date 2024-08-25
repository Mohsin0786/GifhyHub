// components/AnimatedIcon.tsx
import React from 'react'; // Make sure to import your CSS file

const Loader: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-auto">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[4px] border-t-[#f2677e] rounded-full animate-spin"></div>
        </div>
      );
};


export default Loader;
