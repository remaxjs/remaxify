import * as sander from 'sander';
import * as path from 'path';
import prettier from 'prettier';
import { options } from '../options';

export default function generate(code = '', filename: string): OutputFile {
  const ext = '.json';
  filename = path.join(options.rootDir, filename.replace(ext, '.config.js'));
  const content = prettier.format(`exports.${options.platform} = ${code}`, {
    parser: 'babel',
  });

  if (!options.dry) {
    sander.writeFile(options.output, filename, content);
  }

  return {
    filename,
    content,
  };
}
