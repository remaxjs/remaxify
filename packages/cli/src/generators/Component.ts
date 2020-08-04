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

const REMAXIFY_COMPONENT = 'RemaxifyComponent';
const Component = SourceType.Component;

export default function generate(ast: File | undefined, filename: string): OutputFile {
  if (!ast) {
    throw new Error('Component 文件无法分析 ast');
  }

  filename = path.join(options.rootDir, filename);

  traverse(ast, {
    CallExpression(nodePath) {
      const { node } = nodePath;

      if (!t.isIdentifier(node.callee)) {
        return;
      }

      if (node.callee.name !== Component) {
        return;
      }

      const binding = nodePath.scope.getBinding(Component);

      if (binding) {
        return;
      }

      const appId = addNamed(nodePath, Component, RUNTIME_PACKAGE, {
        nameHint: REMAXIFY_COMPONENT,
      });
      nodePath.replaceWith(t.callExpression(appId, node.arguments));
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
