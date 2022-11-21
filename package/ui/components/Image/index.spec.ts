import { getSrcValues } from '.';

describe('Get src values', () => {
  it('not use image flow', () => {
    const data = getSrcValues(
      false,
      'http://image1.jpg',
      undefined,
      undefined,
      false
    );
    expect(data.src1x).toEqual('http://image1.jpg');
    expect(data.placeHolder).toEqual(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAQAAAAHUWYVAAABKklEQVR42u3RMQEAAAjDMObfLQbABAdHKqFJT+lRAQJEQIAICBABASIgQAREQIAICBABASIgQAREQIAICBABASIgQAREQIAICBABASIgQAREQIAICBABASIgQAREQIAICBABASIgQAREQIAICBABASIgQAREQIAICBABASIgQAREQIAICBABASIgQAREQIAICBABASIgQAQEiAlABASIgAARECACAkRABASIgAARECACAkRABASIgAARECACAkRABASIgAARECACAkRABASIgAARECACAkRABASIgAARECACAkRABASIgAARECACAkRABASIgAARECACAkRABASIgAARECACAkRAgAABIiBABASIgAARECACIiBABASIgAARECACIiBABASILluohIUgz8ZhMAAAAABJRU5ErkJggg=='
    );
    expect(data.src2x).toEqual(undefined);
  });
  it('use image flow without width or height', () => {
    const data = getSrcValues(
      true,
      'http://image1.jpg',
      undefined,
      undefined,
      false
    );
    expect(data.src1x).toEqual('http://image1.jpg');
    expect(data.placeHolder).toEqual('http://image1.jpg?zoom=0.1');
    expect(data.src2x).toEqual(undefined);
  });
  it('use image flow with width and without height', () => {
    const data = getSrcValues(true, 'http://image1.jpg', 13, undefined, false);
    expect(data.src1x).toEqual('http://image1.jpg?w=13&h=&mode=pad');
    expect(data.src2x).toEqual('http://image1.jpg?w=26&h=&mode=pad');
    expect(data.src3x).toEqual('http://image1.jpg?w=39&h=&mode=pad');
    expect(data.placeHolder).toEqual(
      'http://image1.jpg?w=13&h=&mode=pad&zoom=0.1'
    );
  });
  it('use image flow with height and without width', () => {
    const data = getSrcValues(true, 'http://image1.jpg', undefined, 13, false);
    expect(data.src1x).toEqual('http://image1.jpg?w=&h=13&mode=pad');
    expect(data.src2x).toEqual('http://image1.jpg?w=&h=26&mode=pad');
    expect(data.src3x).toEqual('http://image1.jpg?w=&h=39&mode=pad');
    expect(data.placeHolder).toEqual(
      'http://image1.jpg?w=&h=13&mode=pad&zoom=0.1'
    );
  });
  it('use image flow with height and width', () => {
    const data = getSrcValues(true, 'http://image1.jpg', 3, 13, false);
    expect(data.src1x).toEqual('http://image1.jpg?w=3&h=13&mode=pad');
    expect(data.src2x).toEqual('http://image1.jpg?w=6&h=26&mode=pad');
    expect(data.src3x).toEqual('http://image1.jpg?w=9&h=39&mode=pad');
    expect(data.placeHolder).toEqual(
      'http://image1.jpg?w=3&h=13&mode=pad&zoom=0.1'
    );
  });
  it('use image flow with height width and crop', () => {
    const data = getSrcValues(true, 'http://image1.jpg', 3, 13, true);
    expect(data.src1x).toEqual('http://image1.jpg?w=3&h=13&mode=crop');
    expect(data.src2x).toEqual('http://image1.jpg?w=6&h=26&mode=crop');
    expect(data.src3x).toEqual('http://image1.jpg?w=9&h=39&mode=crop');
    expect(data.placeHolder).toEqual(
      'http://image1.jpg?w=3&h=13&mode=crop&zoom=0.1'
    );
  });
  it('use image flow with format not supported', () => {
    const data = getSrcValues(true, 'http://image1.svg', 3, 13, false);
    expect(data.src1x).toEqual('http://image1.svg');
    expect(data.src2x).toEqual(undefined);
    expect(data.src3x).toEqual(undefined);
    expect(data.placeHolder).toEqual('http://image1.svg?zoom=0.1');
  });
});
