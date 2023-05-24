import { AiFillStar } from 'react-icons/ai';

function Star({ onSelectStar, id, selectedStars }) {
  return (
    <AiFillStar
      onClick={() => {
        onSelectStar(id);
      }}
      style={{ color: `${selectedStars >= id ? 'yellow' : 'gray'}` }}
    />
  );
}

export default Star;
