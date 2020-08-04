export const type = 'Image';

export const props = [
  'id',
  'className',
  'style',
  /** 图片资源地址 */
  'src',
  /** 图片裁剪、缩放的模式 */
  'mode',
  'onLoad',
  /** 当错误发生时触发 */
  'onError',
  'onTap',
  'onTouchStart',
  'onTouchMove',
  'onTouchEnd',
  'onTouchCancel',
];
