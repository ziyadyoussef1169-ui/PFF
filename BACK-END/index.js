const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');   
const dotenv = require('dotenv');
// Routes
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const registrationsRoutes = require('./routes/registrations');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// CORS configuration (allow Vite dev by default)
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [
        process.env.CORS_ORIGIN,
        'http://localhost:5173',
        'http://localhost:8080',
      ].filter(Boolean);
      // Allow non-browser requests (like curl/postman) with no origin
      if (!origin || allowed.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// Mount routes
app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/registrations', registrationsRoutes);

const PORT = process.env.PORT || 3000;

// Start server only after successful DB connection
async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

start();

app.get("/",(req, res) => {
    res.send("data");
});

// Example placeholder routes kept for reference; consider removing later
app.post("/users/new",(req,res) => {
    const { name,hobby } = req.body;
    res.send(`name: ${name}, hobby: ${hobby}`);
});

app.put("/user/:id",(req,res) => {
    const { id } = req.params;
    const { name,hobby } = req.body;
    res.send(`userId: ${id}, name: ${name}, hobby: ${hobby}`);
});

app.delete("/users/delete/:id",(req,res) => {
    const { id } = req.params;
    res.send(`userId: ${id} is deleted`);
});