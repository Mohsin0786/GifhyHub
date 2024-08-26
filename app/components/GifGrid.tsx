
// components/GifGrid.tsx
import React from 'react';
import GifCard from './GifCard'

interface GifGridProps {
  gifs: any[];
}

const GifGrid: React.FC<GifGridProps> = ({ gifs }) => {
  // if (gifs.length === 0) {
  //   return <p className="text-center">No GIFs found. Try searching for something else!</p>;
  // }

  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {gifs.map((value) => (
    <div key={value.id} className="w-full flex justify-center"> {/* Set width to 1/3 and add padding */}
      <GifCard gif={value} />
    </div>
  ))}
</div>
  );
};

export default GifGrid;

