import { randomUUID } from 'node:crypto';

export function createUniqueTestData() {
  const identifier = randomUUID().replaceAll('-', '');

  return {
    username: `qa_user_${identifier}`,
    email: `qa_${identifier}@example.test`,
    resourceName: `test-resource-${identifier}`,
  };
}