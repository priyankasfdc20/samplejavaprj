import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';

describe('Card', () => {
  it('renders', () => {
    expect(() => {
      shallow(<Card />);
    }).not.toThrow();
  });
});
