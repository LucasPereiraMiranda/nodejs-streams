// streams -> stdin = leitura
// stdout -> stream de saida
// process.stdin.pipe(process.stdout);

import { Readable } from 'node:stream';

class RandomNumberStream extends Readable {
  constructor(options) {
    super(options);
    this.index = 0;
  }

  _read() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    this.push(randomNumber.toString());
    this.index++;

    if (this.index >= 10) {
      this.push(null);
    }
  }
}

new RandomNumberStream();
