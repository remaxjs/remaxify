declare module 'sander';
declare module 'fs-readdir-recursive';
declare module '@babel/helper-module-imports';

declare namespace jest {
  interface Matchers<R, T> {
    toMatchOutput: (output: string) => R;
  }
}

interface OutputFile {
  filename: string;
  content: string;
}
