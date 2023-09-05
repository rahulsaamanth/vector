import React, { useState,useEffect } from 'react';
import axios from 'axios';

function Data() {
    const [id, setId] = useState('');
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({ Laptop_Brand: '',
  OS: '',
  Price: '',
  Date_of_Purchase: ''},); 


  const generateCSV = () => {
    const csvContent = [
      'ID,Laptop Brand,OS,Price,Date of Purchase',
      ...allData.map(item => (
        `${item.id},"${item.Laptop_Brand}","${item.OS}",${item.Price},"${item.Date_of_Purchase}"`
      ))
    ].join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.csv'; // You can customize the filename here
    link.click();
  };

  const [showDatabase, setShowDatabase] = useState(false); // State to toggle showing database
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    if (showDatabase) {
      fetchAllData();
    }
  }, [showDatabase]);

  const fetchAllData = () => {
    axios.get('/api/data')
      .then(response => {
        setAllData(response.data); // Set all data in the new state
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };


  const fetchData = () => {
    axios.get(`/api/data/${id}`)
      .then(response => {
        setData(response.data);
        // setId('');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDelete = () => {
    axios.delete(`/api/data/${id}`)
      .then(() => {
        console.log('Data deleted successfully');
        setData([]); // Clear the fetched data after deletion
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  };

  const handleUpdate = () => {
    axios.put(`/api/data/${id}`, updateData) // Assuming you have a PUT route for updating
      .then(() => {
        console.log('Data updated successfully');
        fetchData(); // Refetch data after update
        setUpdateData({
            Laptop_Brand: '',
            OS: '',
            Price: '',
            Date_of_Purchase: '',
          });
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };  

  return (
    <div>
    <h2>Fetch Data by ID</h2>
    <input
      type="text"
      placeholder="Enter ID"
      value={id}
      onChange={e => setId(e.target.value)}
    />
    <button onClick={fetchData}>Fetch Data</button>

    {data && (
      <div>
        <h2>Data from Database</h2>
        <p>{data.Laptop_Brand}</p>
        <p>{data.OS}</p>
        <p>{data.Price}</p>
        <p>{data.Date_of_Purchase}</p>
        {/* Update Form */}
        <h2>Update Data</h2>
          <input
            type="text"
            placeholder="Laptop Brand"
            value={updateData.Laptop_Brand || ''}
            onChange={e => setUpdateData({ ...updateData, Laptop_Brand: e.target.value })}
          />
          <input
            type="text"
            placeholder="OS"
            value={updateData.OS || ''}
            onChange={e => setUpdateData({ ...updateData, OS: e.target.value })}
          />
          <input
            type="text"
            placeholder="Price"
            value={updateData.Price || ''}
            onChange={e => setUpdateData({ ...updateData, Price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Date of purchase"
            value={updateData.Date_of_Purchase || ''}
            onChange={e => setUpdateData({ ...updateData,Date_of_Purchase: e.target.value })}
          />
          {/* Repeat the same for other fields */}
          <button onClick={handleUpdate}>Update Data</button>
          <button onClick={handleDelete}>Delete Data</button>
      </div>
    )}
     <button onClick={() => setShowDatabase(!showDatabase)}>Show Database</button>

{showDatabase && (
  <div>
    <h2>All Data from Database</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Laptop Brand</th>
          <th>OS</th>
          <th>Price</th>
          <th>Date of Purchase</th>
          {/* Add more headers if needed */}
        </tr>
      </thead>
      <tbody>
        {allData.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.Laptop_Brand}</td>
            <td>{item.OS}</td>
            <td>{item.Price}</td>
            <td>{item.Date_of_Purchase}</td>
            {/* Add more columns if needed */}
          </tr>
        ))}
      </tbody>
    </table>
    <button onClick={generateCSV}>Download CSV</button>
  </div>
)}
  </div>
  );
}

export default Data;
