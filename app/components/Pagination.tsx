import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 rounded text-sm font-medium ${
            currentPage === i
              ? 'bg-pink-500 text-white'
              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <nav className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="px-3 py-1 rounded border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="px-3 py-1 rounded border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;