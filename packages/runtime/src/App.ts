import * as React from 'react';

export default function App(appConfig: { [key: string]: any }): React.ComponentType {
  return class App extends React.Component {
    constructor(props: any) {
      super(props);

      Object.keys(appConfig).forEach(key => {
        if (typeof appConfig[key] === 'function') {
          (this as any)[key] = appConfig[key].bind(this);
          return;
        }

        (this as any)[key] = appConfig[key];
      });
    }

    public render() {
      return this.props.children;
    }
  };
}
