const messageCounts = new Map();

export const detectSpam = (message) => {
  const userId = message.author.id;
  const currentTime = Date.now();
  const messageCount = messageCounts.get(userId) || { count: 0, lastMessageTime: currentTime };

  if (currentTime - messageCount.lastMessageTime < 3000) { // 3 seconds threshold
    messageCount.count += 1;
    if (messageCount.count > 5) { // more than 5 messages in 3 seconds
      message.reply('Please slow down! You are sending messages too quickly.');
      return true; // Detected as spam
    }
  } else {
    messageCount.count = 1; // Reset count
  }

  messageCount.lastMessageTime = currentTime;
  messageCounts.set(userId, messageCount);
  return false; // Not spam
};
