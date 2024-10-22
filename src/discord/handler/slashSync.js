import Discord from 'discord.js'

export default async (client, commands, options = { debug: false, guildId: null }) => {
  const log = (message) => options.debug && console.log(message);

  // Espera até o cliente estar pronto
  const ready = client.readyAt ? Promise.resolve() : new Promise(resolve => client.once('ready', resolve));
  await ready;

  try {
    // Busca os comandos atuais
    const currentCommands = await client.application.commands.fetch(options.guildId ? { guildId: options.guildId } : undefined);

    log(`Sincronizando comandos...`);
    log(`Atualmente ${currentCommands.size} comandos são registrados para o bot.`);

    // Criando novos comandos
    const newCommands = commands.filter(command => !currentCommands.some(c => c.name === command.name));
    for (const newCommand of newCommands) {
      try {
        await client.application.commands.create(newCommand, options.guildId);
        log(`Criado comando: ${newCommand.name}`);
      } catch (error) {
        log(`Erro ao criar comando ${newCommand.name}: ${error.message}`);
      }
    }

    log(`Criado ${newCommands.length} comandos!`);

    // Deletando comandos que não estão na nova lista
    const deletedCommands = currentCommands.filter(command => !commands.some(c => c.name === command.name));
    for (const deletedCommand of deletedCommands.values()) {
      try {
        await deletedCommand.delete();
        log(`Deletado comando: ${deletedCommand.name}`);
      } catch (error) {
        log(`Erro ao deletar comando ${deletedCommand.name}: ${error.message}`);
      }
    }

    log(`Deletado ${deletedCommands.size} comandos!`);

    // Atualizando comandos que já existem, mas podem ter sido modificados
    const updatedCommands = commands.filter(command => currentCommands.some(c => c.name === command.name));
    let updatedCommandCount = 0;

    for (const updatedCommand of updatedCommands) {
      const previousCommand = currentCommands.find(c => c.name === updatedCommand.name);
      let modified = false;

      // Comparando as propriedades relevantes
      if (previousCommand.description !== updatedCommand.description) modified = true;
      if (!Discord.ApplicationCommand.optionsEqual(previousCommand.options ?? [], updatedCommand.options ?? [])) modified = true;

      if (modified) {
        try {
          await previousCommand.edit(updatedCommand);
          updatedCommandCount++;
          log(`Atualizado comando: ${updatedCommand.name}`);
        } catch (error) {
          log(`Erro ao atualizar comando ${updatedCommand.name}: ${error.message}`);
        }
      }
    }

    log(`Atualizado ${updatedCommandCount} comandos!`);

    log(`Sincronização de comandos concluída!`);

    return {
      currentCommandCount: currentCommands.size,
      newCommandCount: newCommands.length,
      deletedCommandCount: deletedCommands.size,
      updatedCommandCount
    };

  } catch (error) {
    log(`Erro durante a sincronização de comandos: ${error.message}`);
    throw error; // Re-lança o erro para que o chamador possa lidar com ele
  }
};