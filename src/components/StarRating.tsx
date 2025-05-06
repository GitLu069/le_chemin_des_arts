
import React from 'react';

export interface StarRatingProps {
  value?: number;
  rating?: number;
  onChange?: (rating: number) => void;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ value, rating, onChange, onRatingChange }) => {
  // Use the appropriate prop based on what's passed
  const currentRating = rating !== undefined ? rating : (value !== undefined ? value : 0);
  const handleRatingChange = (star: number) => {
    if (onChange) onChange(star);
    if (onRatingChange) onRatingChange(star);
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleRatingChange(star)}
          className="focus:outline-none"
          aria-label={`${star} étoile${star > 1 ? 's' : ''}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill={star <= currentRating ? '#FFC107' : 'none'}
            viewBox="0 0 24 24"
            stroke={star <= currentRating ? '#FFC107' : '#D1D5DB'}
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </button>
      ))}
    </div>
  );
};

export default StarRating;
