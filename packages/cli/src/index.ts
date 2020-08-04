import * as fs from 'fs';
import * as path from 'path';
import glob from 'glob';
import parse from './sourceType';
import createGenerator, { Generator } from './generators';
import { initial as initialOptions, options, Options } from './options';

function getSourceFiles(context: string) {
  return glob
    .sync(path.join(context, '**/*'), { dot: false })
    .filter(file => !fs.statSync(file).isDirectory());
}

function generateFiles(generator: Generator, files: string[]) {
  return files.map(file => {
    const code = fs.readFileSync(file).toString();
    const [sourceType, ast] = parse(file, code);
    const filename = file.replace(path.resolve(options.cwd) + '/', '');

    return generator.create(sourceType, filename, { code, ast });
  });
}

export default function transform(config: Options) {
  initialOptions(config);

  const generator = createGenerator();
  const files = getSourceFiles(options.cwd);
  const output: OutputFile[] = [];

  output.push(...generateFiles(generator, files));
  output.push(generator.remaxConfig());
  output.push(generator.packageJson());
  output.push(generator.appJson());
  output.push(generator.projectConfigJson());
  output.push(generator.miniProjectJson());

  return output;
}
