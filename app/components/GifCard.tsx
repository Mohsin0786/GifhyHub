// components/GifCard.tsx
import React from 'react';
interface GifCardProps {
  gif: any;
}

const GifCard: React.FC<GifCardProps> = ({ gif }) => {
  console.log(gif)
  return (
    <div className="m-2">
      
         <img
        src={gif?.images?.original.url}  // Using the correct URL for the GIF
        alt={gif?.title}
        className="w-[354px] h-[236px] rounded-[12px]"
      />
      <h3 className="text-left font-extrabold text-pink-600">{gif?.title}</h3> 
      {/* <button onClick={onFavorite} className="bg-blue-500 text-white p-2 mt-2">Favorite</button> */}
    </div>
  );
};

export default GifCard;