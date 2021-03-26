import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MenuOption from '../components/MenuOption';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('menuOption component', () => {
  it('renders correctly', () => {
    const menuOption = renderer.create(<MenuOption />).toJSON();
    expect(menuOption).toMatchSnapshot();
  });

  it('is a button', () => {
    const { container } = render(<MenuOption />);
    expect(container.firstChild.nodeName).toBe('BUTTON');
  });

  describe('when menuOption is clicked', () => {
    it('redirects to /app if it is MenuOption(New)', () => {
      const { getByRole } = render(
        <MemoryRouter>
          <MenuOption page="new" />
        </MemoryRouter>,
      );
      fireEvent.click(getByRole('button'));
      expect(mockHistoryPush).toHaveBeenCalledWith('/app/');
    });

    it('redirects to /app/history if it is MenuOption(History)', () => {
      const { getByRole } = render(
        <MemoryRouter>
          <MenuOption page="history" />
        </MemoryRouter>,
      );
      fireEvent.click(getByRole('button'));
      expect(mockHistoryPush).toHaveBeenCalledWith('/app/history');
    });

    it('redirects to /app/progress if it is MenuOption(Progress)', () => {
      const { getByRole } = render(
        <MemoryRouter>
          <MenuOption page="progress" />
        </MemoryRouter>,
      );
      fireEvent.click(getByRole('button'));
      expect(mockHistoryPush).toHaveBeenCalledWith('/app/progress');
    });

    it('redirects to /app/more if it is MenuOption(More)', () => {
      const { getByRole } = render(
        <MemoryRouter>
          <MenuOption page="more" />
        </MemoryRouter>,
      );
      fireEvent.click(getByRole('button'));
      expect(mockHistoryPush).toHaveBeenCalledWith('/app/more');
    });
  });
});
