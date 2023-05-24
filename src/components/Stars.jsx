import { useState } from 'react';
import Star from './Star';

export default function Stars({ onRate, rate }) {
  const selectStarHandler = (id) => {
    // setSelectedStars(id);
    onRate(id);
  };

  return (
    <div className="flex gap-2 text-xl">
      {[...Array(5)].map((arr, i) => {
        return (
          <Star
            onSelectStar={selectStarHandler}
            key={i}
            id={i + 1}
            selectedStars={rate}
          />
        );
      })}
    </div>
  );
}
