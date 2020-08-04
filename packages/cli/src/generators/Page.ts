import * as t from '@babel/types';
import { addNamed } from '@babel/helper-module-imports';
import generator from '@babel/generator';
import traverse from '@babel/traverse';
import prettier from 'prettier';
import * as sander from 'sander';
import * as path from 'path';
import { options } from '../options';
import { RUNTIME_PACKAGE } from '../constants';
import { File } from '@babel/types';
import { SourceType } from '../sourceType';

const REMAXIFY_PAGE = 'RemaxifyPage';
const Page = SourceType.Page;

export default function generate(ast: File | undefined, filename: string): OutputFile {
  if (!ast) {
    throw new Error('Page 文件无法分析 ast');
  }

  filename = path.join(options.rootDir, filename);

  traverse(ast, {
    CallExpression(nodePath) {
      const { node } = nodePath;

      if (!t.isIdentifier(node.callee)) {
        return;
      }

      if (node.callee.name !== Page) {
        return;
      }

      const binding = nodePath.scope.getBinding(Page);

      if (binding) {
        return;
      }

      const appId = addNamed(nodePath, Page, RUNTIME_PACKAGE, {
        nameHint: REMAXIFY_PAGE,
      });
      const renderId = addNamed(nodePath, 'render', './render', {
        nameHint: 'render',
      });
      nodePath.replaceWith(t.callExpression(appId, [...node.arguments, renderId]));
      nodePath.stop();
    },
  });

  const code = generator(ast).code;
  const content = prettier.format(code, {
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
