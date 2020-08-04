import * as path from 'path';
import { HostComponent } from '@remax/types';
import { Platform } from './constants';

export interface Options {
  platform: Platform;
  dry?: boolean;
  output: string;
  rootDir: string;
  cwd: string;
}

export let options: Options = {
  platform: Platform.wechat,
  dry: false,
  cwd: process.cwd(),
  output: path.join(process.cwd(), 'remax-project'),
  rootDir: 'src',
};

export let platformHostComponents = new Map<string, HostComponent>();

function reverseMap(obj: any) {
  return Object.keys(obj).reduce<{ [key: string]: string }>((acc, key) => {
    const value = acc[key];
    acc[value] = key;
    return acc;
  }, {});
}

const aliasMap: { [key: string]: Record<string, string> } = {};

export function aliasProp(type: string, prop: string) {
  if (aliasMap[type]) {
    return aliasMap[type][prop];
  }

  switch (options.platform) {
    case Platform.wechat: {
      const map = reverseMap(require(`@remax/wechat/cjs/hostComponents/${type}/node`));
      aliasMap[type] = map;

      return aliasMap[type][prop];
    }
  }
}

export function initial(newOptions: Options) {
  options = {
    ...options,
    ...newOptions,
  };

  switch (options.platform) {
    case Platform.wechat: {
      platformHostComponents = require('@remax/wechat/cjs/hostComponents/node');
    }
  }
}
