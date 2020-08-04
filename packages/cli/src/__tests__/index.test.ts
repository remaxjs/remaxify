import * as path from 'path';
import transform from '../index';
import { Platform } from '../constants';

describe('remaxify', () => {
  it('simple', () => {
    const outputContext = path.join(__dirname, './fixtures/simple/expected');

    const output = transform({
      platform: Platform.wechat,
      cwd: path.join(__dirname, './fixtures/simple/source'),
      output: outputContext,
      dry: true,
      rootDir: 'src',
    });

    expect(output).toMatchOutput(outputContext);
  });
});
