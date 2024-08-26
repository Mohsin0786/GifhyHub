'use client'

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { Search } from 'lucide-react';
import GifGrid from './components/GifGrid';
import { fetchGifs } from './utils/giphy';
import Pagination from './components/Pagination';
import Loader from './components/Loader';
import LogoutButton from './components/LogoutButton';
import withProtectedRoute from './components/withProtectedRoute';

const Home: React.FC = () => {
  const [gifs, setGifs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const ITEMS_PER_PAGE = 3;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearch = async () => {
    setCurrentPage(1);
    await loadGifs(1);
  };

  const loadGifs = async (page: number) => {
    const offset = (page - 1) * ITEMS_PER_PAGE;
    setLoading(true);
    try {
      const result = await fetchGifs(searchTerm, ITEMS_PER_PAGE, offset);
      setGifs(result);
      setTotalPages(Math.ceil(25 / ITEMS_PER_PAGE));
    } catch (error) {
      console.error('Failed to load GIFs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      loadGifs(currentPage);
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="absolute right-2 top-3 sm:right-4 sm:top-4">
          <LogoutButton />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mt-16 sm:mt-24">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-grow flex items-center border rounded bg-[#F2F4F8] p-2">
              <Search className="w-6 h-6 text-gray-400 mr-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for GIFs"
                className="w-full text-gray-900 bg-transparent focus:outline-none"
              />
            </div>
            <button
              onClick={handleSearch}
              className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-lg flex justify-center items-center"
            >
              Search
            </button>
          </div>
          
          {loading ? (
            <Loader />
          ) : (
            <>
              <GifGrid gifs={gifs} />
              {gifs.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default withProtectedRoute(Home);