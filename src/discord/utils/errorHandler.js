import { getClient } from '../connect.js'

export const handleError = (error) => {
  const client = getClient()
 
  // const errorChannel = client.channels.cache.get('your-error-log-channel-id');
  //if (errorChannel) {
    //errorChannel.send(`An error occurred: ${error.message}`);
  //}

  console.log(`[ERROR] ${error.message}`);
};
