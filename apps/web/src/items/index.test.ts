import { describe, it, expect } from 'vitest';
import { getImageIds } from '.';

describe('getImageIds', () => {
  it('JSONファイルからラベルがついている画像のIDを全て取得できる', () => {
    expect(getImageIds()).matchSnapshot();
  });
});
