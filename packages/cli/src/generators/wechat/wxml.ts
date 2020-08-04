import * as t from '@babel/types';
import generator from '@babel/generator';
import prettier from 'prettier';
import * as sander from 'sander';
import * as path from 'path';
import { File } from '@babel/types';
import traverse from '@babel/traverse';
import { camelCase, capitalize } from 'lodash';
import { options, platformHostComponents, aliasProp } from '../../options';
import oneHostComponents from '../../one/hostComponents';

function getComponentName(tagName: string) {
  return capitalize(camelCase(tagName));
}

type ComponentSource = 'fragment' | 'one' | 'platform' | 'unknown';

function getComponentSource(componentName: string): ComponentSource {
  if (componentName === 'Block') {
    return 'fragment';
  }

  if (oneHostComponents.has(componentName)) {
    return 'one';
  }

  if (platformHostComponents.has(componentName)) {
    return 'platform';
  }

  return 'unknown';
}

function isHostComponent(source: ComponentSource) {
  return source === 'one' || source === 'platform';
}

function transformToHostComponent(type: string, node: t.JSXElement) {
  const opening = node.openingElement.name as t.JSXIdentifier;
  const closing = node.closingElement?.name as t.JSXIdentifier;
  const attributes = node.openingElement.attributes;

  opening.name = type;
  if (closing) {
    closing.name = type;
  }

  node.openingElement.attributes = attributes.map(attr => {
    // 不存在这种情况
    if (!t.isJSXAttribute(attr)) {
      return attr;
    }

    if (t.isJSXIdentifier(attr.name)) {
      attr.name.name = aliasProp(type, attr.name.name);
    }

    return attr;
  });
}

function generateImports(components: Array<{ source: ComponentSource; type: string }>) {
  let oneImports = components
    .filter(c => c.source === 'one')
    .map(c => c.type)
    .join(', ');
  oneImports = oneImports ? `import { ${oneImports} } from 'remax/one';\n` : '';

  let platformImports = components
    .filter(c => c.source === 'platform')
    .map(c => c.type)
    .join(', ');
  platformImports = platformImports
    ? `import { ${platformImports} } from 'remax/${options.platform}';\n`
    : '';

  const fragmentImport = components.find(c => c.source === 'fragment')
    ? `import { Fragment } from 'react';\n`
    : '';

  let componentsImports = components
    .filter(c => c.source === 'unknown')
    .map(c => c.type)
    .join(', ');
  componentsImports = componentsImports
    ? `import { ${componentsImports} } from '@/components';\n`
    : '';

  return `${fragmentImport}${platformImports}${oneImports}${componentsImports}`;
}

export default function generate(ast: File | undefined, filename: string): OutputFile {
  if (!ast) {
    throw new Error('App 文件无法分析 ast');
  }

  const ext = path.extname(filename);
  filename = path.join(options.rootDir, filename.replace(ext, '.render.js'));
  const remaxComponents: Array<{ source: ComponentSource; type: string }> = [];

  traverse(ast, {
    JSXElement(path) {
      const tagName = (path.node.openingElement.name as t.JSXIdentifier).name;
      const componentName = getComponentName(tagName);
      const componentSource = getComponentSource(componentName);

      remaxComponents.push({
        type: componentName,
        source: componentSource,
      });

      if (isHostComponent(componentSource)) {
        transformToHostComponent(componentName, path.node);
      }
    },
  });

  const code = generator(ast).code;
  const importCode = generateImports(remaxComponents);
  const content = prettier.format(
    `${importCode}
export default function render() {
  return ${code}
}`,
    { parser: 'babel' }
  );

  if (!options.dry) {
    sander.writeFile(options.output, filename, content);
  }

  return {
    filename,
    content,
  };
}
