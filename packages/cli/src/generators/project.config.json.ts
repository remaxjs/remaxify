import * as sander from 'sander';
import { options } from '../options';

export default function generate(): OutputFile {
  const filename = 'project.config.json';
  const content = `{
  "miniprogramRoot": "dist/wechat",
  "setting": {
    "urlCheck": false,
    "es6": false,
    "postcss": true,
    "minified": true,
    "newFeature": true,
    "coverView": true,
    "autoAudits": false,
    "uglifyFileName": false,
    "checkInvalidKey": true,
    "checkSiteMap": true,
    "uploadWithSourceMap": true,
    "babelSetting": {
      "ignore": [],
      "disablePlugins": [],
      "outputPath": ""
    },
    "bundle": false
  },
  "compileType": "miniprogram",
  "simulatorType": "wechat",
  "simulatorPluginLibVersion": {},
  "condition": {}
}`;

  if (!options.dry) {
    sander.writeFile(options.output, filename, content);
  }

  return {
    filename,
    content,
  };
}
