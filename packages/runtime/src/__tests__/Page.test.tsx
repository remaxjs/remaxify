import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import Page from '../Page';

describe('Page', () => {
  it('works', () => {
    const mockShow = jest.fn();
    const config: any = {
      data: {
        propA: 'A',
        propB: 'B',
      },

      onShow() {
        mockShow();
      },

      onTap() {
        this.setData({
          propA: 'AA',
          propB: 'BB',
        });
      },
    };
    const View = function ({ onTap, children }: any) {
      return React.createElement('view', { onTap, children });
    };

    function render(this: any) {
      return (
        <View onTap={this.onTap}>
          {this.state.propA}
          {this.state.propB}
        </View>
      );
    }
    const PageComponent = Page(config, render);

    const testRenderer = TestRenderer.create(<PageComponent />);

    expect(testRenderer.toJSON()).toMatchSnapshot();

    testRenderer.root.findByType('view').props.onTap();

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
