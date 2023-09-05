const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3001;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'vector',
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});

app.use(express.json());

app.post('/addHomePageData', (req, res) => {
  const { uid, title, desc, dedline } = req.body;
  const query = 'INSERT INTO laptop (Laptop_Brand, OS, Price, Date_of_Purchase) VALUES (?, ?, ?, ?)';
  db.query(query, [uid, title, desc, dedline], (err, result) => {
    if (err) {
      console.error('Error adding data:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(200).json({ message: 'Data added successfully' });
    }
  });
});

app.post('/aboutdata', (req, res) => {
  const { uid, title, desc, dedline } = req.body;
  const query = 'INSERT INTO mobile (Mobile_Brand, Series, Price, Date_of_Purchase) VALUES (?, ?, ?, ?)';
  db.query(query, [uid, title, desc, dedline], (err, result) => {
    if (err) {
      console.error('Error adding data:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(200).json({ message: 'Data added successfully' });
    }
  });
});

app.get('/api/data/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM laptop WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error fetching data' });
      } else {
        res.json(result[0]); 
      }
    });
  });

  app.delete('/api/data/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM laptop WHERE id = ?', [id], (error, results) => {
      if (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ error: 'Error deleting data' });
      } else {
        console.log('Data deleted successfully');
        res.status(200).json({ message: 'Data deleted successfully' });
      }
    });
  });

  app.put('/api/data/:id', (req, res) => {
    const id = req.params.id;
    const updateData = req.body; 
  
    const updateQuery = `UPDATE laptop SET ? WHERE id = ?`;
  
    db.query(updateQuery, [updateData, id], (error, results) => {
      if (error) {
        console.error('Error updating data:', error);
        res.status(500).send('Error updating data');
      } else {
        console.log('Data updated successfully');
        res.send('Data updated successfully');
      }
    });
  });
  

  app.get('/api/mdata/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM mobile WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error fetching data' });
      } else {
        res.json(result[0]); 
      }
    });
  });

  app.delete('/api/mdata/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM mobile WHERE id = ?', [id], (error, results) => {
      if (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ error: 'Error deleting data' });
      } else {
        console.log('Data deleted successfully');
        res.status(200).json({ message: 'Data deleted successfully' });
      }
    });
  });

  app.put('/api/mdata/:id', (req, res) => {
    const id = req.params.id;
    const updateData = req.body; 
  
    const updateQuery = `UPDATE mobile SET ? WHERE id = ?`;
  
    db.query(updateQuery, [updateData, id], (error, results) => {
      if (error) {
        console.error('Error updating data:', error);
        res.status(500).send('Error updating data');
      } else {
        console.log('Data updated successfully');
        res.send('Data updated successfully');
      }
    });
  });


  app.get('/api/data', (req, res) => {
    const query = 'SELECT * FROM laptop'; 
  
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/api/mdata', (req, res) => {
    const query = 'SELECT * FROM mobile'; 
  
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
      } else {
        res.json(results);
      }
    });
  });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
