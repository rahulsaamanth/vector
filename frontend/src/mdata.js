import React, { useState,useEffect } from 'react';
import axios from 'axios';


function Mdata() {
    const [id, setId] = useState('');
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({Mobile_Brand: '',
  series: '',
  Price: '',
  Date_of_Purchase: ''},); 

  const generateCSV = () => {
    const csvContent = [
      'ID,Mobile Brand,Series,Price,Date of Purchase',
      ...allData.map(item => (
        `${item.id},"${item.Mobile_Brand}","${item.series}",${item.Price},"${item.Date_of_Purchase}"`
      ))
    ].join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.csv'; // You can customize the filename here
    link.click();
  };

  const [showDatabase, setShowDatabase] = useState(false);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    if (showDatabase) {
      fetchAllData();
    }
  }, [showDatabase]);

  const fetchAllData = () => {
    axios.get('/api/mdata')
      .then(response => {
        setAllData(response.data);
      })
      .catch(error => {
        console.error('Error fetching all data:', error);
      });
  };

  const fetchData = () => {
    axios.get(`/api/mdata/${id}`)
      .then(response => {
        setData(response.data);
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDelete = () => {
    axios.delete(`/api/mdata/${id}`)
      .then(() => {
        console.log('Data deleted successfully');
        setData([]); // Clear the fetched data after deletion
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  };

  const handleUpdate = () => {
    axios.put(`/api/mdata/${id}`, updateData) // Assuming you have a PUT route for updating
      .then(() => {
        console.log('Data updated successfully');
        fetchData(); // Refetch data after update
        setUpdateData({
          Mobile_Brand: '',
          series: '',
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
        <p>{data.Mobile_Brand}</p>
        <p>{data.series}</p>
        <p>{data.Price}</p>
        <p>{data.Date_of_Purchase}</p>
        {/* Update Form */}
        <h2>Update Data</h2>
          <input
            type="text"
            placeholder="Mobile Brand"
            value={updateData.Mobile_Brand || ''}
            onChange={e => setUpdateData({ ...updateData, Mobile_Brand: e.target.value })}
          />
          <input
            type="text"
            placeholder="series"
            value={updateData.series || ''}
            onChange={e => setUpdateData({ ...updateData, series: e.target.value })}
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
          <th>Mobile Brand</th>
          <th>Series</th>
          <th>Price</th>
          <th>Date of Purchase</th>
          {/* Add more headers if needed */}
        </tr>
      </thead>
      <tbody>
        {allData.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.Mobile_Brand}</td>
            <td>{item.series}</td>
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

export default Mdata;
