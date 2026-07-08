import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { StatusBadge, statusClass } from './StatusBadge';

describe('StatusBadge', () => {
  test('maps workflow states to semantic colors', () => {
    expect(statusClass('approved')).toBe('green');
    expect(statusClass('new')).toBe('amber');
    expect(statusClass('rejected')).toBe('red');
    expect(statusClass('replied')).toBe('blue');
  });

  test('renders normalized status text', () => {
    render(<StatusBadge status="in_progress" />);
    expect(screen.getByText('in progress')).toHaveClass('amber');
  });
});
