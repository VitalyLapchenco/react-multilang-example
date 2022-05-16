import { sum } from '@/utils/methods';

describe('methods', () => {
  it('sum', () => {
    const res = sum(1, 2);
    expect(res).toBe(3);
  });
});
