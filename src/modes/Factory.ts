import { MODES } from '../constants.js';
import Logger from '../utils/logger.js';
import { IMode } from './Base.js';
import Playground from './Playground.js';
import Repl from './Repl.js';

export class ModeFactory {
  static createMode(modeType: string): IMode {
    switch (modeType) {
      case MODES.PLAYGROUND:
        return new Playground();
      case MODES.REPL:
        return new Repl();
      default:
        Logger.error('Invalid mode type');
        process.exit(1);
    }
  }
}
