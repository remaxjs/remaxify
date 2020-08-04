import * as sander from 'sander';
import { options } from '../options';

export default function generate(): OutputFile {
  const filename = 'remax.config.js';
  const content = `module.exports = {
  pxToRpx: false
};`;
  if (!options.dry) {
    sander.writeFile(options.output, filename, content);
  }

  return {
    filename,
    content,
  };
}
