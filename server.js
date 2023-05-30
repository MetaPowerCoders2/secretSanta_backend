const app = require('.');
require('dotenv').config();

const { PORT = 3005 } = process.env;

app.listen(PORT, () => {
  global.logger.info(`Walletpop are ready at http://localhost:${PORT}`);
});
