require('dotenv').config();

import { PORT } from './src/constants/env';
import { server } from './src/server';

server.listen(PORT, () => {
  console.log(`Server running at PORT:${PORT}`);
});
