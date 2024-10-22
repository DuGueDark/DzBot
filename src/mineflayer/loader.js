import { eventsHandler } from './handler/events.js'

export const load = (bot) => {
  eventsHandler(bot)
}