// Main application entry point
const app = require('./src/app');
const config = require('./src/config');

// Start the server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`Animal API is ready to use!`);
});