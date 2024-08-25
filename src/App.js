import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [filters, setFilters] = useState({
    Alphabets: false,
    Numbers: false,
    'Highest lowercase alphabet': false,
  });

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [value]: checked,
    }));
  };

  const handleSubmit = async () => {
    try {
      const jsonData = JSON.parse(jsonInput);
      const res = await axios.post('https://bajaj-round1.onrender.com/bfhl', jsonData);

      console.log('API Response:', res.data); // Console log the API response

      setResponse(res.data);
    } catch (error) {
      console.error('Error in API call or invalid JSON:', error); // Console log the error for debugging
      alert('Invalid JSON or Error in API call');
    }
  };

  // Render the API response based on selected filters
  const renderResponse = () => {
    if (!response) return null;

    const filteredResponse = {};

    if (filters.Alphabets && response.alphabets) {
      filteredResponse.Alphabets = response.alphabets;
    }
    if (filters.Numbers && response.numbers) {
      filteredResponse.Numbers = response.numbers;
    }
    if (filters['Highest lowercase alphabet'] && response.highest_lowercase_alphabet) {
      filteredResponse['Highest lowercase alphabet'] = response.highest_lowercase_alphabet;
    }

    return (
      <div>
        <h3>Filtered API Response</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>BFHL API Frontend</h1>
      <textarea
        rows="5"
        cols="50"
        placeholder='Enter JSON, e.g., {"data": ["M", "1", "334", "4", "B"]}'
        value={jsonInput}
        onChange={handleInputChange}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <div style={{ marginTop: '20px' }}>
        <label>
          <input
            type="checkbox"
            value="Alphabets"
            checked={filters.Alphabets}
            onChange={handleFilterChange}
          />
          Alphabets
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input
            type="checkbox"
            value="Numbers"
            checked={filters.Numbers}
            onChange={handleFilterChange}
          />
          Numbers
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input
            type="checkbox"
            value="Highest lowercase alphabet"
            checked={filters['Highest lowercase alphabet']}
            onChange={handleFilterChange}
          />
          Highest lowercase alphabet
        </label>
      </div>
      <div style={{ marginTop: '20px' }}>
        {renderResponse()}
      </div>
    </div>
  );
}

export default App;
