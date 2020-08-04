import * as sander from 'sander';
import { options } from '../options';

export default function generate(): OutputFile {
  const filename = 'mini.project.json';
  const content = `{
  "miniprogramRoot": "dist/ali",
  "scripts": {
    "beforeCompile": "npm run dev -- ali",
    "beforePreview": "npm run build -- ali",
    "beforeUpload": "npm run build -- ali"
  },
  "exclude": [
    "src/**",
    "node_modules",
    "node_modules/**",
    "babel.config.js",
    "package-lock.json",
    "project.config.json",
    "package.json",
    "remax.config.js",
    "app.json"
  ],
  "precompileWatch": {
    "selfWatch": true,
    "restart": true,
    "exclude": ["dist/**", "*.md"],
    "ignoreBuiltInExts": false
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
