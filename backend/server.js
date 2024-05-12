const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fliptripdb' 
})

app.use(session({
    secret: 'SECRET_KEY',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ?;";
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const user = results[0];
        if (password !== user.password) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        req.session.user = { username, isLoggedIn: true }
        return res.status(200).json({ message: 'Login successful' });
    });
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    const checkIfExistsQuery = "SELECT * FROM users WHERE username = ?";
    db.query(checkIfExistsQuery, [username], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const insertUserQuery = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
        const role = 'standard';
        db.query(insertUserQuery, [username, password, role], (err, results) => {
            if (err) {
                console.error('Error inserting user into database:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            return res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

app.get('/hotels', (req, res) => {
    const sql = "SELECT * FROM hotels;"
    db.query(sql, (err, data) => {
        if(err) {
            console.log('The was an error fetching the hotel data')
            return res.json(err)
        }
        return res.json(data)
    })
})

app.get('/hotels/:id', (req, res) => {
    const hotelId = req.params.id;
    const sql = "SELECT * FROM hotels WHERE id = ?;";
    db.query(sql, [hotelId], (err, data) => {
        if(err) {
            console.log('There was an error fetching the hotel data');
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if(data.length === 0) {
            return res.status(404).json({ error: 'Hotel not found' });
        }
        return res.json(data[0]);
    });
});

app.post('/hotels', (req, res) => {
    console.log(req)
    const { name, address, city, country, phone, email, website, rating, description } = req.body;
    const sql = "INSERT INTO hotels (name, address, city, country, phone, email, website, rating, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
    db.query(sql, [name, address, city, country, phone, email, website, rating, description], (err, result) => {
        if(err) {
            console.log('There was an error adding the hotel');
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(201).json({ message: 'Hotel added successfully', hotelId: result.insertId });
    });
});

app.put('/hotels/:id', (req, res) => {
    const hotelId = req.params.id;
    const { name, address, city, country, phone, email, website, rating, description } = req.body;
    const sql = "UPDATE hotels SET name = ?, address = ?, city = ?, country = ?, phone = ?, email = ?, website = ?, rating = ?, description = ? WHERE id = ?;";
    db.query(sql, [name, address, city, country, phone, email, website, rating, description, hotelId], (err, result) => {
        if(err) {
            console.log('There was an error updating the hotel');
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if(result.affectedRows === 0) {
            return res.status(404).json({ error: 'Hotel not found' });
        }
        return res.json({ message: 'Hotel updated successfully' });
    });
});


app.delete('/hotels/:id', (req, res) => {
    const hotelId = req.params.id;
    const sql = "DELETE FROM hotels WHERE id = ?;";
    db.query(sql, [hotelId], (err, result) => {
        if(err) {
            console.log('There was an error deleting the hotel');
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if(result.affectedRows === 0) {
            return res.status(404).json({ error: 'Hotel not found' });
        }
        return res.json({ message: 'Hotel deleted successfully' });
    });
});

app.listen(3001, () => {
    console.log('listening on port 3001')
})