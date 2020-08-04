export const type = 'Button';

export const props = [
  'id',
  'className',
  'style',
  /** 是否禁用 */
  'disabled',
  /** 指定按钮按下去的样式类。当 hover-class="none" 时，没有点击态效果 */
  'hoverClassName',
  /** 按住后多久出现点击态，单位毫秒 */
  'hoverStartTime',
  /** 手指松开后点击态保留时间，单位毫秒 */
  'hoverStayTime',
  /** 用于 form 组件，点击分别会触发 form 组件的 submit/reset 事件 */
  'type',
  'onTap',
];
