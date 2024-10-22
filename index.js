import { connect } from './src/connect.js';
import { load } from './src/loader.js';
import './src/api/server.js'

async function startBot() {
  const client = await connect();
  await load(client);
}

startBot();

