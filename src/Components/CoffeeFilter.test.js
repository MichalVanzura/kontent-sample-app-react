import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { CoffeeFilter } from './CoffeeFilter'
import * as Store from '../Stores/Coffee'

const mockFilterToggleProcessing = jest.fn();
jest.mock('../Stores/Coffee', () => {
  return {
    CoffeeStore: {
      getProcessings: jest.fn().mockImplementation(() => [{
        codename: 'wet',
        name: 'Wet',
      }]),
      getProductStatuses: jest.fn().mockImplementation(() => [{
        codename: 'on-sale',
        name: 'On sale',
      }]),
      getFilter: jest.fn().mockImplementation(() => {
        return {
          processings: [],
          productStatuses: [],
          toggleProcessing: mockFilterToggleProcessing,
        }
      }),
      addChangeListener: jest.fn(),
      provideProcessings: jest.fn(),
      provideProductStatuses: jest.fn(),
      removeChangeListener: jest.fn(),
      unsubscribe: jest.fn(),
      setFilter: jest.fn(),
    }
  }
});

test('renders component without error', () => {
  renderComponent();
});

test('displayes correct data', () => {
  const { getByLabelText } = renderComponent();

  expect(Store.CoffeeStore.getProcessings).toHaveBeenCalled();

  expect(getByLabelText('Wet')).toBeInTheDocument();
  expect(getByLabelText('On sale')).toBeInTheDocument();
});

test('toggles filter when filter item is clicked', () => {
  const { getByLabelText } = renderComponent();

  fireEvent.click(getByLabelText('Wet'));

  expect(mockFilterToggleProcessing).toHaveBeenCalledWith('wet');
  expect(Store.CoffeeStore.setFilter).toHaveBeenCalled();
});

const renderComponent = () => {
  return render(
    <CoffeeFilter 
      t = { jest.fn() }
    />
  );
}
