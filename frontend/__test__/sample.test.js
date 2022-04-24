function add(a, b) {
  const aNum = parseInt(a);
  const bNum = parseInt(b);
  return aNum + bNum;
}

describe('Same test 101', () => {
  it('Works as expected', () => {
    // We run our expect statements to see if test will pass
    expect(1).toEqual(1);
    const age = 100;
    expect(age).toEqual(100);
  });
  // it('Not works as expected', () => {
  //   expect(2).toEqual('2');
  // });
  it('Add two things together', () => {
    expect(1 + 1).toEqual(2);
  });
  it('Runs the add function properly', () => {
    expect(add(1, 2)).toBeGreaterThanOrEqual(3);
  });
  it('Can add strings of numbers together', () => {
    expect(add('1', '2')).toBe(3);
  });
});
