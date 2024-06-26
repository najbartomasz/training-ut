import { Logger } from './logger';

const consoleLogger = { info: (message: string) => { console.log('Console:', message); }}
const wsLogger = { info: (message: string) => { console.log('wsLogger:', message); }}

const logger = new Logger([consoleLogger, wsLogger]);
logger.log('AAA');