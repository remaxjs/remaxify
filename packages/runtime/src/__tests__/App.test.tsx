import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import App from '../App';

describe('App', () => {
  it('works', () => {
    const mockShow = jest.fn();
    const config: any = {
      onShow(...params: any) {
        mockShow(...params);
      },
      globalData: {
        data: 'data',
      },
    };

    const AppComponent = App(config);

    const testRenderer = TestRenderer.create(
      <AppComponent>
        <view>app</view>
      </AppComponent>
    );
    expect(testRenderer.toJSON()).toMatchSnapshot();

    const options = { optionA: 'A' };
    testRenderer.root.instance.onShow(options);
    expect(mockShow).toBeCalledWith(options);
    expect(testRenderer.root.instance.globalData.data).toBe('data');
  });
});
