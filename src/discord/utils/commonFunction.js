export const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

export const randomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export const getDaysBetweenDates = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000; // Horas * minutos * segundos * milissegundos
    return Math.round(Math.abs((date1 - date2) / oneDay));
}

export const getUserById = (client, userId) => {
    return client.users.fetch(userId)
        .then(user => user)
        .catch(() => null);
}

export const mentionUser = (userId) => {
    return `<@${userId}>`;
}

export const isFromBot = (message) => {
    return message.author.bot;
}

export const clearMessages = (channel, limit = 100) => {
    return channel.bulkDelete(limit, true)
        .catch(err => console.error('Failed to delete messages: ', err));
}

export const getAllMembers = (guild) => {
    return guild.members.fetch()
        .then(members => members)
        .catch(err => console.error('Failed to fetch members: ', err));
}

export const getChannelByName = (guild, channelName) => {
    return guild.channels.cache.find(channel => channel.name === channelName);
}

// Valida se um email está no formato correto
export const isValidEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// Verifica se um valor é um número
export const isNumber = (value) => {
  return !isNaN(value);
}

export const log = (message, level = 'info') => {
    const levels = {
        info: 'INFO',
        warn: 'WARN',
        error: 'ERROR'
    };
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${levels[level]}] ${message}`);
};

export const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
};

export const sumArray = (array) => {
    return array.reduce((acc, curr) => acc + curr, 0);
};

export const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatDate = (date) => {
    const day = (`0${date.getDate()}`).slice(-2);
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export const removeSpaces = (str) => {
    return str.replace(/\s+/g, '');
};

export const toSnakeCase = (str) => {
    return str
        .replace(/\s+/g, '_')
        .toLowerCase();
};
