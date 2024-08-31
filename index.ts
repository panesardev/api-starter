require('dotenv').config();

import { server } from './src/server';

const PORT = Number(process.env.port) || 3000;

server.listen(PORT, () => {
  console.log(`Server running at PORT:${PORT}`);
});
