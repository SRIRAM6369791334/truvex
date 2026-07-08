import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { SearchToolbar } from './SearchToolbar';

describe('SearchToolbar', () => {
  test('reports search changes', () => {
    const onChange = vi.fn();
    render(<SearchToolbar onChange={onChange} placeholder="Search services" value="" />);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'steel' } });
    expect(onChange).toHaveBeenCalledWith('steel');
  });
});
