import * as sander from 'sander';
import { options } from '../options';

export default function generate(): OutputFile {
  const filename = 'package.json';
  const content = `{
  "name": "remax-project",
  "private": true,
  "version": "1.0.0",
  "keywords": [],
  "scripts": {
    "dev": "remax build -w -t ",
    "build": "cross-env NODE_ENV=production remax build -t "
  },
  "dependencies": {
    "react": "^16.8.6",
    "react-dom": "^16.13.1",
    "remax": "^2.0.0"
  },
  "devDependencies": {
    "cross-env": "^6.0.3"
  }
}`;

  if (!options.dry) {
    sander.writeFile(options.output, filename, content);
  }

  return {
    filename,
    content,
  };
}
