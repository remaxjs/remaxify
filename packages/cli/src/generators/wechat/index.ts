import { SourceType } from '../../sourceType';
import wxs from './wxs';
import wxss from '../style';
import wxml from './wxml';
import Config from '../Config';
import App from '../App';
import Page from '../Page';
import Component from '../Component';
import { File } from '@babel/types';

function generate(
  type: SourceType,
  filename: string,
  { code, ast }: { code?: string; ast?: File }
): OutputFile {
  switch (type) {
    case SourceType.wxml:
      return wxml(ast, filename);
    case SourceType.wxs:
      return wxs(code, filename);
    case SourceType.wxss:
      return wxss(code, filename);
    case SourceType.Config:
      return Config(code, filename);
    case SourceType.App:
      return App(ast, filename);
    case SourceType.Page:
      return Page(ast, filename);
    case SourceType.Component:
      return Component(ast, filename);
  }

  throw new Error(`${type} 无法识别`);
}

export default generate;
