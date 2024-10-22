import { getUserBalance, addFunds, subtractFunds } from '../../../database/economy.js';

export default {
  name: 'economy',
  description: 'Check your balance or transfer money',
  run: async ({ client, message, args }) => {
    const action = args[0];
    const amount = parseInt(args[1]);

    const balance = await getUserBalance(message.author.id);

    if (action === 'check') {
      message.channel.send(`Your current balance is: $${balance}`);
    } else if (action === 'give') {
      if (!amount || isNaN(amount) || amount <= 0) return message.reply('Please specify a valid amount to give.');
      await addFunds(message.author.id, amount);
      message.channel.send(`You have given $${amount}. Your new balance is: $${balance + amount}`);
    } else if (action === 'take') {
      if (!amount || isNaN(amount) || amount <= 0) return message.reply('Please specify a valid amount to take.');
      if (balance < amount) return message.reply('You do not have enough funds.');
      await subtractFunds(message.author.id, amount);
      message.channel.send(`You have taken $${amount}. Your new balance is: $${balance - amount}`);
    } else {
      message.reply('Usage: !economy check | !economy give <amount> | !economy take <amount>');
    }
  }
};
