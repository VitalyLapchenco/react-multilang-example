import React from 'react';
import { shallow } from 'enzyme';
import { WrappedApp as App } from '../App';

const app = shallow(<App />);
test('app', () => {
  const div = app.find('div');
  expect(div.length).toBe(1);
  expect(app).toMatchSnapshot();
});
