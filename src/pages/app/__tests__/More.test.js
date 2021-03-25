import React from 'react';
import renderer from 'react-test-renderer';
import More from '../more';

describe('more component',() => {
    it('renders correctly', () => {
        const more = renderer.create(<More  />).toJSON();
        expect(more).toMatchSnapshot();
    });
})