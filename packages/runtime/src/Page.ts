import * as React from 'react';

export default function Page(
  pageConfig: { [key: string]: any },
  render: () => React.ReactNode
): React.ComponentType {
  return class Page extends React.Component {
    constructor(props: any) {
      super(props);

      Object.keys(pageConfig).forEach(key => {
        if (typeof pageConfig[key] === 'function') {
          (this as any)[key] = pageConfig[key].bind(this);
          return;
        }

        (this as any)[key] = pageConfig[key];
      });

      this.state = pageConfig.data;
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
