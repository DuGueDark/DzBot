const botInstances = [];

export const setBot = (messageId, bot) => {
  const existingBotIndex = botInstances.findIndex(botObj => botObj.messageId === messageId);

  if (existingBotIndex !== -1) {
    botInstances[existingBotIndex].bot = bot;
    return {
      status: 'updated',
      message: `Bot ID: ${messageId} foi atualizado.`,
      data: bot,
    }
  } else {
    botInstances.push({ messageId, bot });
    return {
      status: 'created',
      message: `Bot ID: ${messageId} foi adicionado.`,
      data: bot,
    }
  }
};

export const getBot = (messageId) => {
  const botObj = botInstances.find(botObj => botObj.messageId === messageId);

  if (!botObj) {
    return {
      status: 'not_found',
      message: `Nenhum bot encontrado com ID: ${messageId}.`,
      data: null,
    }
  }

  return {
    status: 'success',
    message: `Bot encontrado com o ID: ${messageId}.`,
    data: botObj.bot,
  }
  
};

export const removeBot = (messageId) => {
  const index = botInstances.findIndex(botObj => botObj.messageId === messageId);

  if (index !== -1) {
    botInstances.splice(index, 1);
    return {
      status: 'removed',
      message: `Bot ID: ${messageId} foi removido da lista.`,
      data: null,
    }
  } else {
    return {
      status: 'not_found',
      message: `Nenhum bot encontrado com ID: ${messageId}.`,
      data: null,
    }
  }
};

