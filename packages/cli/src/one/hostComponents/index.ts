import { HostComponent } from '@remax/types';
import * as Button from './Button';
import * as Form from './Form';
import * as Image from './Image';
import * as Input from './Input';
import * as Label from './Label';
import * as Text from './Text';
import * as Textarea from './Textarea';
import * as View from './View';
import * as WebView from './WebView';

const components = new Map<string, HostComponent>();

components.set(Button.type, Button);
components.set(Form.type, Form);
components.set(Image.type, Image);
components.set(Input.type, Input);
components.set(Label.type, Label);
components.set(Text.type, Text);
components.set(Textarea.type, Textarea);
components.set(View.type, View);
components.set(WebView.type, WebView);

export default components;
