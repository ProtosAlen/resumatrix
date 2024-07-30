// __tests__/example.test.tsx
import { render, screen } from '@testing-library/react';
import React from 'react';
import { expect, test } from 'vitest';

const HelloWorld = () => <div>Hello, world!</div>;

test('renders HelloWorld component', () => {
  render(<HelloWorld />);
  const linkElement = screen.getByText(/Hello, world!/i);
  expect(linkElement).toBeInTheDocument();
});
