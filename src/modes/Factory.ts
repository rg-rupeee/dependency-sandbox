import { MODES } from '../constants.js';
import Logger from '../utils/logger.js';
import { IConfig, IMode } from './Base.js';
import Playground from './Playground.js';
import Repl from './Repl.js';



export class ModeFactory {
  static createMode(config: IConfig): IMode {
    switch (config.mode) {
      case MODES.PLAYGROUND:
        return new Playground({ path: config.path });
      case MODES.REPL:
        return new Repl({ path: config.path });
      default:
        Logger.error('Invalid mode type');
        process.exit(1);
    }
  }
}
