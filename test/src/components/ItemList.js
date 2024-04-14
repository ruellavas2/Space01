import React, { useState, useEffect } from 'react';
import './styles.css';

const ItemList = ({ items }) => {
  const [showCheapest, setShowCheapest] = useState(true);
  const [cheapestItemId, setCheapestItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleShowCheapest = () => {
    setShowCheapest(prevState => !prevState);
  };

  useEffect(() => {
    if (showCheapest) {
      const cheapestItem = items.reduce((prev, current) => (prev.price < current.price) ? prev : current);
      setCheapestItemId(cheapestItem.id);
    } else {
      setCheapestItemId(null);
    }
  }, [items, showCheapest]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // filter items based on search term
  const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // sort the filtered items by price in ascending order
  const sortedItems = [...filteredItems].sort((a, b) => a.price - b.price);

  // get the cheapest 5 items or all items based on the showCheapest state
  const itemsToRender = showCheapest ? sortedItems.slice(0, 5) : sortedItems;

  return (
    <div className="item-list">
      <div className="item-list__header">
        <h2 className="item-list__title">
          {showCheapest ? 'Cheapest 5 Items' : 'All Items'}
        </h2>
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="item-list__search"
        />
        <button
          className={`item-list__toggle ${showCheapest ? 'active' : ''}`}
          onClick={toggleShowCheapest}
          title={showCheapest ? 'Toggle to show all items' : 'Toggle to show cheapest items'}
        >
          Toggle
        </button>
      </div>
      <div className="item-list__items">
        {itemsToRender.map((item) => (
          <div
            key={item.id} // assuming here each item has a unique ID for key
            className={`item-card ${item.id === cheapestItemId ? 'item-card--cheapest' : ''}`} // set background color to yellow for all chepest items
          >
            <h3 className="item-card__name">{item.name}</h3>
            <p className="item-card__price">Price: ${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
