import { test, expect, type APIRequestContext } from '@playwright/test';

const BASE_URL = 'https://reqres.in/api';
const USER_ID = 2;

async function getUser(request: APIRequestContext, userId: number) {
  return request.get(`${BASE_URL}/users/${userId}`);
}

test.describe('ReqRes users CRUD API', () => {
  // GET: retrieve an existing user and verify the response body.
  test('GET retrieves a user', async ({ request }) => {
    const response = await getUser(request, USER_ID);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.data).toMatchObject({
      id: USER_ID,
      first_name: 'Janet',
    });
    expect(responseBody.data.email).toContain('@reqres.in');
  });

  // POST: create a user and verify the returned representation.
  test('POST creates a user', async ({ request }) => {
    const newUser = { name: 'ARutto', job: 'QA Engineer' };
    const response = await request.post(`${BASE_URL}/users`, { data: newUser });
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject(newUser);
    expect(responseBody.id).toBeTruthy();
    expect(responseBody.createdAt).toBeTruthy();
  });

  // PUT: update a user and verify the updated fields.
  test('PUT updates a user', async ({ request }) => {
    const updatedUser = { name: 'ARutto', job: 'Senior QA Engineer' };
    const response = await request.put(`${BASE_URL}/users/${USER_ID}`, {
      data: updatedUser,
    });
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject(updatedUser);
    expect(responseBody.updatedAt).toBeTruthy();
  });

  // DELETE: verify that a successful deletion has no response body.
  test('DELETE removes a user', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/users/${USER_ID}`);
    expect(response.status()).toBe(204);
    expect(await response.text()).toBe('');
  });

  // Negative case: an unknown user should return an empty 404 response.
  test('GET returns 404 for a non-existent user', async ({ request }) => {
    const response = await getUser(request, 9999);
    expect(response.status()).toBe(404);
    expect(await response.json()).toEqual({});
  });
});
