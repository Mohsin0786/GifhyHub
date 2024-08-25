'use client'
import React, { useState,useEffect } from 'react';
// import Header from '../components/Header';
import GifGrid from './components/GifGrid'
import { fetchGifs } from './utils/giphy';
import Image from "next/image"
import SearchIcon from "./Search-icon.png"
import Pagination from './components/Pagination';
import Loader from './components/Loader';
const Home: React.FC = () => {
  const [gifs, setGifs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading,setLoading] = useState(false)
  const ITEMS_PER_PAGE = 3; // Number of items per page

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearch = async () => {
    setCurrentPage(1); // Reset to the first page on new search
    await loadGifs(1); // Load GIFs for the first page
  };

  const loadGifs = async (page: number) => {
    const offset = (page - 1) * ITEMS_PER_PAGE; // Calculate offset
    setLoading(true); // Show loading spinner
    try {
      const result = await fetchGifs(searchTerm, ITEMS_PER_PAGE, offset);
      setGifs(result); // Set the fetched GIFs
      setTotalPages(Math.ceil(25 / ITEMS_PER_PAGE)); // Update total pages
      setLoading(false); // Hide loading spinner
    } catch (error) {
      console.error('Failed to load GIFs:', error);
      setLoading(false); // Hide loading spinner
    }
  };

  useEffect(() => {
    if (searchTerm) {
      loadGifs(currentPage); // Load GIFs whenever current page or search term changes
    }
  }, [currentPage]);

  return (
    <div className='flex justify-center'>
      <div className='bg-white w-[auto] min-w-[816px] max-w-[1136px] max-h[500px] rounded-[20px] p-[24px] mt-[100px]'>
        <div className="p-4 flex justify-center h-[74px]">
        <div className="flex items-center border rounded bg-[#F2F4F8] w-[100%] min-w-[642px] pt-6 pr-0 pb-6 pl-[13px]">
            <Image src={SearchIcon} alt="Search Icon" className="w-6 h-6 ml-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for GIFs"
              className="border-none p-2 flex-1 rounded bg-[#F2F4F8] focus:outline-none"
            />
          </div>

          <button onClick={handleSearch} className="p-[24px] bg-black text-white ml-2 rounded-[12px] flex justify-center items-center">Search</button>
        </div>
        {!loading && <GifGrid gifs={gifs} />}
        {gifs.length>0 && !loading&& <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange}
        />}
       {loading && <Loader/>}
      </div>
    </div>
  );
};

export default Home;