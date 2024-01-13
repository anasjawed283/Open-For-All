// function login() {
//     // Basic login functionality, you might want to implement authentication on the server side.
//     var username = document.getElementById('username').value;
//     var password = document.getElementById('password').value;

//     // For simplicity, let's assume the login is successful and show the product page.
//     showProductPage();
// }

// function showProductPage() {
//     document.getElementById('loginForm').style.display = 'none';
//     document.getElementById('productPage').style.display = 'block';
//     // You can fetch and display products dynamically here.
// }
// npm init -y
// npm install express mongoose bcrypt cors

// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const cors = require('cors');

// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/elixir_brands', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// // Define a user schema
// const userSchema = new mongoose.Schema({
//     username: String,
//     password: String,
// });

// const User = mongoose.model('User', userSchema);

// // Endpoint for user registration
// app.post('/register', async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         const user = new User({
//             username: req.body.username,
//             password: hashedPassword,
//         });
//         await user.save();
//         res.status(201).send('User registered successfully');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Endpoint for user login
// app.post('/login', async (req, res) => {
//     try {
//         const user = await User.findOne({ username: req.body.username });

//         if (user && await bcrypt.compare(req.body.password, user.password)) {
//             res.status(200).send('Login successful');
//         } else {
//             res.status(401).send('Invalid credentials');
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server listening at http://localhost:${port}`);
// });