export const handleReaction = async (reaction, user) => {
  if (user.bot) return;

  // Exemplo: adicione lógica para gerenciar reações
  if (reaction.emoji.name === '✅') {
    // Ação para quando o emoji ✅ é utilizado
    console.log(`${user.tag} confirmed the message.`);
  } else if (reaction.emoji.name === '❌') {
    // Ação para quando o emoji ❌ é utilizado
    console.log(`${user.tag} rejected the message.`);
  }
};
