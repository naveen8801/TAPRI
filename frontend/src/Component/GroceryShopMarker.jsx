import { Icon } from '@iconify/react';
import grocerystallmaker from '@iconify/icons-mdi/letter-g';

const GroceryShopsMarker = ({ lat, lng, onClick }) => {
  return (
    <div className="Grocery-shop-marker" onClick={onClick}>
      <Icon icon={grocerystallmaker} className="Grocery-shop-icon" />
    </div>
  );
};

export default GroceryShopsMarker;
