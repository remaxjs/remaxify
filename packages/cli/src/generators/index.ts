import wechatCreator from './wechat';
import { Platform } from '../constants';
import { SourceType } from '../sourceType';
import { File } from '@babel/types';
import { options } from '../options';
import remaxConfig from './remax.config';
import packageJson from './package.json';
import projectConfigJson from './project.config.json';
import appJson from './app.json';
import miniProjectJson from './mini.project.json';

export interface Generator {
  create(
    type: SourceType,
    filename: string,
    { code, ast }: { code?: string; ast?: File }
  ): OutputFile;
  remaxConfig(): OutputFile;
  packageJson(): OutputFile;
  appJson(): OutputFile;
  projectConfigJson(): OutputFile;
  miniProjectJson(): OutputFile;
}

function getCreator() {
  switch (options.platform) {
    case Platform.wechat:
      return wechatCreator;
  }
}

export default function createGenerator(): Generator {
  return {
    create: getCreator(),
    remaxConfig,
    packageJson,
    appJson,
    projectConfigJson,
    miniProjectJson,
  };
}
