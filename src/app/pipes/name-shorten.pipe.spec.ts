import { NameShortenPipe } from './name-shorten.pipe';

describe('NameShortenPipe', () => {
  it('create an instance', () => {
    const pipe = new NameShortenPipe();
    expect(pipe).toBeTruthy();
  });
});
