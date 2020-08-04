import * as t from '@babel/types';
import * as parser from '@babel/parser';
import * as path from 'path';
import traverse from '@babel/traverse';

export enum SourceType {
  App = 'App',
  Page = 'Page',
  Component = 'Component',
  Config = 'Config',
  wxs = 'wxs',
  js = 'js',
  wxss = 'wxss',
  wxml = 'wxml',
  unknown = 'unknown',
}

export default function parse(
  file: string,
  code: string
): [SourceType, t.File | undefined] {
  const ext = path.extname(file);

  if (ext === '.json') {
    return [SourceType.Config, undefined];
  }

  if (ext === '.wxs') {
    return [SourceType.wxs, undefined];
  }

  if (ext === '.wxml') {
    const ast = parser.parse(code, { plugins: ['jsx'] });
    return [SourceType.wxml, ast];
  }

  if (ext === '.wxss') {
    return [SourceType.wxss, undefined];
  }

  if (ext !== '.js') {
    return [SourceType.unknown, undefined];
  }

  let type = SourceType.js;

  const ast = parser.parse(code, { sourceType: 'module' });

  traverse(ast, {
    CallExpression(path) {
      const { node } = path;

      [SourceType.App, SourceType.Page, SourceType.Component].forEach(item => {
        if (!t.isIdentifier(node.callee)) {
          return;
        }
        if (node.callee.name === item) {
          const binding = path.scope.getBinding(item);

          if (!binding) {
            type = item;
            path.stop();
          }
        }
      });
    },
  });

  return [type, ast];
}
