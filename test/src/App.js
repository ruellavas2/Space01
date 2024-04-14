import React from 'react';
import data from './components/data';
import ItemList from './components/ItemList';

function App() {
  return (
    <div>
      <ItemList items={data} />
    </div>
  );
}

export default App;
