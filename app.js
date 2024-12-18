const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const itemRoutes = require('./routes/itemRoutes');
const logger = require('./utils/logger');
const sequelize = require('./config/db');  // Import sequelize instance
const cors = require('cors');


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/v1', itemRoutes);

// Sync Sequelize models with the database
sequelize.sync({ alter: true }) // or use { force: true } in development
  .then(() => {
    logger.info('Database synchronized successfully.');
  })
  .catch((error) => {
    logger.error('Error syncing database: ' + error.message);
  });

// Start server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
