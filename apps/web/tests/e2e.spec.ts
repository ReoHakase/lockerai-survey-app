import { test, expect } from '@playwright/test';

test('/', async ({ page }) => {
  // `/` ページにアクセス
  await page.goto('/');

  const suggestionLinks = await page.locator('main nav a').all(); // 使用例の提案リンク

  expect(suggestionLinks).toHaveLength(3);
});
