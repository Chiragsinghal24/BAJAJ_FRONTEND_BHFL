import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling

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

    // Create a filtered response based on selected filters
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
      <div className="response-container">
        <h3>Filtered API Response</h3>
        {Object.keys(filteredResponse).map((key) => (
          <div key={key} className="response-item">
            <h4>{key}:</h4>
            {Array.isArray(filteredResponse[key]) ? (
              filteredResponse[key].map((item, index) => <p key={index}>{item}</p>)
            ) : (
              <p>{filteredResponse[key]}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="app-container">
      <h1>Bajaj API Frontend</h1>
      <textarea
        rows="5"
        cols="50"
        placeholder='Enter JSON, e.g., {"data": ["M", "1", "334", "4", "B"]}'
        value={jsonInput}
        onChange={handleInputChange}
        className="textarea"
      />
      <br />
      <button onClick={handleSubmit} className="submit-button">Submit</button>
      <div className="filters-container">
        <label>
          <input
            type="checkbox"
            value="Alphabets"
            checked={filters.Alphabets}
            onChange={handleFilterChange}
            className="checkbox"
          />
          Alphabets
        </label>
        <label className="filter-label">
          <input
            type="checkbox"
            value="Numbers"
            checked={filters.Numbers}
            onChange={handleFilterChange}
            className="checkbox"
          />
          Numbers
        </label>
        <label className="filter-label">
          <input
            type="checkbox"
            value="Highest lowercase alphabet"
            checked={filters['Highest lowercase alphabet']}
            onChange={handleFilterChange}
            className="checkbox"
          />
          Highest lowercase alphabet
        </label>
      </div>
      <div className="response-section">
        {renderResponse()}
      </div>
    </div>
  );
}

export default App;
