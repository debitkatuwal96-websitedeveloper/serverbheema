// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const morgan = require('morgan');
// const errorHandler = require('./middleware/errorHandler');

// // Routes
// // const studentRoutes = require('./routes/studentRoutes');
// // const clientRoutes = require('./routes/clientRoutes');

// const app = express();
// connectDB();


// app.use(express.urlencoded({ extended: true }));


// // Middlewares
// app.use(cors());
// app.use(helmet());
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));
// app.use(morgan('dev'));

// // Rate limiting (100 requests per 15 min)
// const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
// app.use(limiter);

// // API Routes
// app.use('/api/students', require('./routes/studentRoutes'));
// app.use('/api/clients', require('./routes/clientRoutes'));

// // Error handler
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));



// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const morgan = require('morgan');
// const errorHandler = require('./middleware/errorHandler');

// // Routes
// const studentRoutes = require('./routes/studentRoutes');
// const clientRoutes = require('./routes/clientRoutes');

// const app = express();
// connectDB();

// // CORS configuration with frontend port
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'https://newlookcompany.netlify.app/', // Frontend port
//   credentials: true
// }));

// // Other middlewares
// app.use(helmet());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static('uploads'));
// app.use(morgan('dev'));

// // Rate limiting (100 requests per 15 min)
// const limiter = rateLimit({ 
//   windowMs: 15 * 60 * 1000, 
//   max: 100 
// });
// app.use(limiter);

// // API Routes
// app.use('/api/students', studentRoutes);
// app.use('/api/clients', clientRoutes);

// // Error handler
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));



// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

// Routes
const studentRoutes = require('./routes/studentRoutes');
const clientRoutes = require('./routes/clientRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://newlookcompany.netlify.app',
  credentials: true
}));

// Security & logging middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder
app.use('/uploads', express.static('uploads'));

// Rate limiting (100 requests per 15 minutes)
const limiter = rateLimit({ 
  windowMs: 15 * 60 * 1000,
  max: 100 
});
app.use(limiter);

// Health check route (Render requirement)
app.get('/', (req, res) => res.send('API is running'));

// API routes
app.use('/api/students', studentRoutes);
app.use('/api/clients', clientRoutes);

// Error handler
app.use(errorHandler);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
