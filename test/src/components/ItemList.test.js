import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ItemList from './ItemList';

describe('ItemList component', () => {

  // Test case 1: Check initial rendering
  test('renders with correct initial state', () => {
    const mockItems = [
      { name: 'Item 1', price: 10 },
      { name: 'Item 2', price: 20 },
      { name: 'Item 3', price: 15 },
    ];

    const { getByText } = render(<ItemList items={mockItems} />);

    expect(getByText('Cheapest 5 Items')).toBeInTheDocument();
    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
    expect(getByText('Item 3')).toBeInTheDocument();
  });

  // Test case 2: Check toggling behavior
  test('toggles between showing cheapest items and all items', () => {
    
    const mockItems = [
      { name: 'Item 1', price: 10 },
      { name: 'Item 2', price: 20 },
      { name: 'Item 3', price: 15 },
    ];

    const { getByText, queryByText } = render(<ItemList items={mockItems} />);

    const toggleButton = getByText('Toggle');
    fireEvent.click(toggleButton);

    // Assertions after clicking toggle button
    expect(getByText('All Items')).toBeInTheDocument();
    expect(queryByText('Item 1')).not.toBeInTheDocument();
    expect(queryByText('Item 2')).not.toBeInTheDocument();
    expect(queryByText('Item 3')).not.toBeInTheDocument();
  });

// Test case 3: Check filtering by item name
test('filters items by name', () => {
  const mockItems = [
    { name: 'Item C', price: 30 },
    { name: 'Item H', price: 15 },
    { name: 'Item F', price: 25 },
  ];

  const { getByLabelText, getByText, queryByText } = render(<ItemList items={mockItems} />);

  // Assume there is an input field labeled "Search Items"
  const searchField = getByLabelText('Search Items');
 
  fireEvent.change(searchField, { target: { value: 'Item C' } });
  
  // Check that only 'Item C' is displayed
  expect(getByText('Item C')).toBeInTheDocument();
  expect(queryByText('Item H')).not.toBeInTheDocument();
  expect(queryByText('Item F')).not.toBeInTheDocument();
});


});
