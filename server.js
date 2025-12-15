require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');

const app = express();

// ROUTES
const newsRoutes = require('./src/routes/newsRoutes');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes'); // <-- ADD THIS

const PORT = process.env.PORT || 3000;

app.use(express.json());

// MOUNT ROUTES
app.use('/news', newsRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);   // <-- AND THIS

app.get('/', (req, res) => res.send('News Aggregator API is running'));

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Failed to connect to DB', err);
    process.exit(1);
  });
