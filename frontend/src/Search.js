import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [rowData, setRowData] = useState({});
  const id = 5; // ID of the row you want to fetch

  useEffect(() => {
    axios.get(`/api/getRow/${id}`)
      .then(response => {
        setRowData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Row Data</h1>
      <pre>{JSON.stringify(rowData, null, 2)}</pre>
    </div>
  );
};

export default Search;
