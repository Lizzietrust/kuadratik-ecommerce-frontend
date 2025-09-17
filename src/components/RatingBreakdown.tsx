import React from 'react';
import { Reviews } from '@/types';

interface RatingBreakdownProps {
  reviews: Reviews[];
}

const RatingBreakdown: React.FC<RatingBreakdownProps> = ({ reviews }) => {
  const ratings = [5, 4, 3, 2, 1];
  const totalReviews = reviews.length;

  return (
    <div className="w-full">
      {ratings.map((rating) => {
        const count = reviews.filter(
          (r) => typeof r.rating === 'number' && Math.round(r.rating) === rating
        ).length;
        const percentage =
          totalReviews > 0 ? (count / totalReviews) * 100 : 0;
        return (
          <div key={rating} className="flex items-center gap-2">
            <span className="text-sm font-medium">{rating} ★</span>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-yellow-400 h-2.5 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-500">{count}</span>
          </div>
        );
      })}
    </div>
  );
};

export default RatingBreakdown;
