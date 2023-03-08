/* eslint-disable no-console */
const app = require('./app');

const PORT = parseInt(process.env.PORT || '3001', 10);

init();

async function init() {
  try {
    app.listen(PORT, () => {
      console.log(`Express App Listening on Port ${PORT}`);
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
