import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BusinessLeadsScraper.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const BusinessLeadsScraper = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [scrapingResult, setScrapingResult] = useState(null); // To store the result of the scraping
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/scrape', {  // Ensure the correct Flask server URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search_query: searchQuery }),
      });

      if (response.ok) {
        // Create a blob URL to download the CSV file
        const result = await response.blob();
        setScrapingResult(URL.createObjectURL(result)); // Store the URL of the CSV file
        alert('Scraping completed successfully!');
      } else {
        console.error('Failed to scrape leads');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h1>Business Leads Scraper</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search_query">Enter Search Query:</label>
        <input
          type="text"
          id="search_query"
          name="search_query"
          placeholder="e.g., plumbers in New York"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
        />
        <button type="submit">
          <FontAwesomeIcon icon={faSearch} /> Scrape Leads
        </button>
      </form>

      {/* Display download link after scraping */}
      {scrapingResult && (
        <div>
          <a href={scrapingResult} download="business_leads.csv">Download Scraped Leads</a>
        </div>
      )}
    </div>
  );
};

export default BusinessLeadsScraper;
