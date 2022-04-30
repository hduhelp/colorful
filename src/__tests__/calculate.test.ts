import { CaculateColor, colorfulConfig } from '../index';

test('Test color', () => {
  const changeColor = (color: string) => {
    console.log(color);
  };
  let config: colorfulConfig = {
    start: '#1ac3af',
    end: '#1ac3e6',
    hex: true,
    st: 0.9,
    func: changeColor,
  };

  expect(CaculateColor(config)).toBe("rgb(26,195,225)");
});
