import { formatStack, originalFilename } from './logger';

describe('Logger', () => {
  describe('formatStack function', () => {
    it('find source and replace', async () => {
      const sourceMapConsumer = new Map();

      sourceMapConsumer.set('main.f8bc0cfcbcb2b8cf9fc1.js', {
        originalPositionFor: obj => ({
          source: 'main.js',
          line: obj.line + 10,
          column: obj.column + 20,
          name: 'main',
        }),
      });

      const result = formatStack(
        'nonono@https://make.org/js/main.f8bc0cfcbcb2b8cf9fc1.js:1:2 xxxxx',
        sourceMapConsumer
      );

      expect(result).toEqual(
        'nonono@https://make.org/js@main|main.js:11:22 xxxxx'
      );
    });
  });

  describe('originalFilename function', () => {
    it('get original filename from hashed filename', async () => {
      expect(originalFilename('test.hash.js')).toEqual('test.js');
      expect(originalFilename('name.part.1-23lkj+.js')).toEqual('name.part.js');
      expect(originalFilename('toto.tata.hash.js')).toEqual('toto.tata.js');
    });
  });
});
