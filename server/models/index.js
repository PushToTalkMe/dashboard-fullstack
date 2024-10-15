import { Publisher } from './publisher.js';
import { Boardgame } from './boardgame.js';

Publisher.associate({ Boardgame });
Boardgame.associate({ Publisher });

export { Publisher, Boardgame };
