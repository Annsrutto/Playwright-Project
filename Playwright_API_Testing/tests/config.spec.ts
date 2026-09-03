import { expect, test } from '@playwright/test';
import { environment } from '../env';

test('loads the API key configuration', () => {
  expect(environment.apiKey).toEqual(expect.any(String));
  expect(environment.apiKey.length).toBeGreaterThan(0);
});