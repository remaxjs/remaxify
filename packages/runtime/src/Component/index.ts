import * as React from 'react';

export default function Component<P = any, S = any>(
  componentConfig: { [key]: string },
  render: () => void
): React.ComponentType<P, S> {
  return class Component extends React.Component<P, S> {
    constructor(props: any) {
      super(props);

      Object.keys(componentConfig).forEach(key => {
        if (typeof componentConfig[key] === 'function') {
          (this as any)[key] = componentConfig[key].bind(this);
          return;
        }

        (this as any)[key] = componentConfig[key];
      });

      this.state = componentConfig.data;
    }

    public data = this.state;

    public setData(payload: any, callback?: () => void) {
      return this.setState(payload, callback);
    }

    public render() {
      return render.bind(this)();
    }
  };
}
