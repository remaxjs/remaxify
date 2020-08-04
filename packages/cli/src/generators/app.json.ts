import * as sander from 'sander';
import { options } from '../options';

export default function generate(): OutputFile {
  const filename = 'app.json';
  const content = `{}`;

  if (!options.dry) {
    sander.writeFile(options.output, filename, content);
  }

  return {
    filename,
    content,
  };
}
