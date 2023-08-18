// streams -> stdin = leitura
// stdout -> stream de saida
// process.stdin.pipe(process.stdout);

import { Readable, Transform, Writable } from 'node:stream';

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

class FilterEvenNumbersStream extends Transform {
  _transform(chunk, encoding, callback) {
    const number = Number(chunk.toString());
    if (number % 2 === 0) {
      const buffer = Buffer.from(String(number));
      callback(null, buffer);
    } else {
      callback();
    }
  }
}

class MultiplyByFiveStream extends Writable {
  _write(chunk, encoding, callback) {
    const number = Number(chunk.toString());
    const result = number * 5;
    console.log(result);
    callback();
  }
}

new RandomNumberStream()
  .pipe(new FilterEvenNumbersStream())
  .pipe(new MultiplyByFiveStream());
