export const type = 'Input';

export const props = [
  'id',
  'className',
  'style',
  /** 输入框的初始内容 */
  'defaultValue',
  'value',
  'name',
  /** input 的类型 */
  'type',
  /** 是否是密码类型 */
  'password',
  /** 输入框为空时占位符 */
  'placeholder',
  'placeholderStyle',
  /** 是否禁用 */
  'disabled',
  /** 最大输入长度，设置为 -1 的时候不限制最大长度 */
  'maxLength',
  /** 获取焦点 */
  'focus',
  'onInput',
  'onConfirm',
  'onFocus',
  'onBlur',
];
