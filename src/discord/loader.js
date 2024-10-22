import { eventsHandler } from './handler/events.js';
import { commandsHandler } from './handler/commands.js';
import { componentsHandler} from './handler/components.js'

import * as commonFunctions from './utils/commonFunction.js';

import * as componentsHelper from './utils/componentsHelper.js'

const exposeToGlobal = (module) => {
  Object.keys(module).forEach(func => {
      globalThis[func] = module[func];
  });
}

exposeToGlobal(commonFunctions)
exposeToGlobal(componentsHelper)

export const load = (client) => {
  eventsHandler(client);
  commandsHandler(client);
  componentsHandler(client);
};
