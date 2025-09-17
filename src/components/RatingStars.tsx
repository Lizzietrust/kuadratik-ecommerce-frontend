import React from "react";
import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1 mb-2">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating || 0)
              ? "text-[#22A24F] fill-current"
              : "text-[#ADB7BC]"
          }`}
        />
      ))}
      <span className="text-xs text-gray-500">({rating || 0})</span>
    </div>
  );
};

export default RatingStars;
