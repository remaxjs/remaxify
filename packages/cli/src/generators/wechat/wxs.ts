import * as sander from 'sander';
import * as path from 'path';
import { options } from '../../options';

export default function generate(code = '', filename: string): OutputFile {
  const ext = '.wxs';
  filename = path.join(options.rootDir, filename.replace(ext, '.wxs.js'));

  if (!options.dry) {
    sander.writeFile(options.output, filename, code);
  }

  return {
    filename,
    content: code,
  };
}
