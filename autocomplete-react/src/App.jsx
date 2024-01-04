import React, { useState, useEffect } from 'react';
import './App.css';
import country from '../resources/countryData.json';

function App() {
  const countries = country;

  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSggts, showSuggtns] = useState(false);

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearch(term);
    filterSuggestions(term);
  };

  const filterSuggestions = (term) => {
    if (term.trim() === '') {
      setSuggestions([]);
      showSuggtns(false);
    } else {
      const filtered = countries.filter(country =>
        country.name.toLowerCase().startsWith(term.toLowerCase())
      );
      setSuggestions(filtered);
      showSuggtns(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      console.log('Escape')
      showSuggtns(false);
    }
  };

  useEffect(() => {
    showSuggtns(true);
  }, [suggestions]);

  return (
    <div className='container'>
      <input
        type="text"
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type to search..."
      />
      <button>Search</button>
      <div className='suggs'>
        {showSggts && suggestions.map((country, index) => (
          <div key={index}>{country.name}</div>
        ))}
      </div>

    </div>
  );
}

export default App;
