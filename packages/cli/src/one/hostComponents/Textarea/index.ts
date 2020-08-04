export const type = 'Textarea';

export const props = [
  'id',
  'className',
  'style',
  'name',
  'value',
  'defaultValue',
  'placeholder',
  'placeholderStyle',
  'disabled',
  /** 最大输入长度，设置为 -1 的时候不限制最大长度 */
  'maxLength',
  'focus',
  /** 是否自动增高，设置auto-height时，style.height不生效 */
  'autoHeight',
];
