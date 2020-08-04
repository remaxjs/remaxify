import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import Component from '../Component';

describe('Component', () => {
  it('works', () => {
    const mockShow = jest.fn();
    const config: any = {
      data: {
        propA: 'A',
      },

      onShow(...params: any) {
        mockShow(...params);
      },

      onTap() {
        this.setData({
          propA: 'AA',
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
          {this.props.propB}
        </View>
      );
    }
    const CompComponent = Component(config, render);

    const testRenderer = TestRenderer.create(<CompComponent propB="B" />);
    expect(testRenderer.toJSON()).toMatchSnapshot();

    testRenderer.root.findByType('view').props.onTap();
    expect(testRenderer.toJSON()).toMatchSnapshot();

    const options = { optionA: 'A' };
    testRenderer.root.instance.onShow(options);
    expect(mockShow).toBeCalledWith(options);
  });
});
