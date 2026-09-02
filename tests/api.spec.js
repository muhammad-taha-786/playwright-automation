import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api-testing-postman.vercel.app/api/v1';

let token;
let username;
let email;
let password = 'Test@12345';

test.describe.serial('Users API Automation', () => {

  // =====================================================
  // 1. REGISTER USER
  // POST /users/register
  // =====================================================
  test('1 - Register User', async ({ request }) => {

    const timestamp = Date.now();

    username = `taha${timestamp}`;
    email = `taha${timestamp}@gmail.com`;

    const response = await request.post(
      `${BASE_URL}/users/register`,
      {
        data: {
          fullname: 'Muhammad Taha',
          email: email,
          username: username,
          password: password
        }
      }
    );

    const responseBody = await response.json();

    console.log('REGISTER STATUS:', response.status());
    console.log('REGISTER RESPONSE:', responseBody);

    expect(response.status()).toBe(201);
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toBe('User registered Successfully');

    expect(responseBody.data.username).toBe(username);
    expect(responseBody.data.email).toBe(email);
    expect(responseBody.data.fullname).toBe('Muhammad Taha');

  });


  // =====================================================
  // 2. LOGIN USER
  // POST /users/login
  // =====================================================
  test('2 - Login User', async ({ request }) => {

    const response = await request.post(
      `${BASE_URL}/users/login`,
      {
        data: {
          username: username,
          email: email,
          password: password
        }
      }
    );

    const responseBody = await response.json();

    console.log('LOGIN STATUS:', response.status());
    console.log('LOGIN SUCCESS:', responseBody.success);
    console.log('LOGIN MESSAGE:', responseBody.message);

    expect(response.status()).toBe(200);
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toBe('User Logged in successfully');

    // Access token is inside data
    token = responseBody.data.accessToken;

    expect(token).toBeTruthy();

    expect(responseBody.data.user.username).toBe(username);
    expect(responseBody.data.user.email).toBe(email);

  });


  // =====================================================
  // 3. GET CURRENT USER
  // GET /users/current-user
  // =====================================================
  test('3 - Get Current User', async ({ request }) => {

    const response = await request.get(
      `${BASE_URL}/users/current-user`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const responseBody = await response.json();

    console.log('CURRENT USER STATUS:', response.status());
    console.log('CURRENT USER RESPONSE:', responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody.success).toBe(true);

  });


  // =====================================================
  // 4. UPDATE ACCOUNT
  // PATCH /users/update-account
  // =====================================================
  test('4 - Update Account', async ({ request }) => {

    const updatedFullname = 'Muhammad Taha Updated';

    const response = await request.patch(
      `${BASE_URL}/users/update-account`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },

        data: {
          fullname: updatedFullname,
          email: email
        }
      }
    );

    const responseBody = await response.json();

    console.log('UPDATE ACCOUNT STATUS:', response.status());
    console.log('UPDATE ACCOUNT RESPONSE:', responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody.success).toBe(true);

  });


  // =====================================================
  // 5. REPLACE ACCOUNT
  // PUT /users/replace-account
  // =====================================================
  test('5 - Replace Account', async ({ request }) => {

    const response = await request.put(
      `${BASE_URL}/users/replace-account`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },

        data: {
          fullname: 'Muhammad Taha Replace',
          email: email,
          username: username
        }
      }
    );

    const responseBody = await response.json();

    console.log('REPLACE ACCOUNT STATUS:', response.status());
    console.log('REPLACE ACCOUNT RESPONSE:', responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody.success).toBe(true);

  });


  // =====================================================
  // 6. GET USER BY USERNAME
  // GET /users/user/{username}
  // =====================================================
  test('6 - Get User By Username', async ({ request }) => {

    const response = await request.get(
      `${BASE_URL}/users/user/${username}`
    );

    const responseBody = await response.json();

    console.log('GET USER STATUS:', response.status());
    console.log('GET USER RESPONSE:', responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody.success).toBe(true);

  });


  // =====================================================
  // 7. GET ALL USERS
  // GET /users/all-users
  // =====================================================
  test('7 - Get All Users', async ({ request }) => {

    const response = await request.get(
      `${BASE_URL}/users/all-users`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const responseBody = await response.json();

    console.log('ALL USERS STATUS:', response.status());
    console.log('ALL USERS RESPONSE:', responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody.success).toBe(true);

  });


  // =====================================================
  // 8. CHANGE PASSWORD
  // POST /users/change-password
  // =====================================================
  test('8 - Change Password', async ({ request }) => {

    const newPassword = 'NewTest@12345';

    const response = await request.post(
      `${BASE_URL}/users/change-password`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },

        data: {
          oldPassword: password,
          newPassword: newPassword
        }
      }
    );

    const responseBody = await response.json();

    console.log('CHANGE PASSWORD STATUS:', response.status());
    console.log('CHANGE PASSWORD RESPONSE:', responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody.success).toBe(true);

    // Save new password
    password = newPassword;

  });


  // =====================================================
  // 9. LOGOUT USER
  // POST /users/logout
  // =====================================================
  test('9 - Logout User', async ({ request }) => {

    const response = await request.post(
      `${BASE_URL}/users/logout`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const responseBody = await response.json();

    console.log('LOGOUT STATUS:', response.status());
    console.log('LOGOUT RESPONSE:', responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody.success).toBe(true);

  });


  // =====================================================
  // 10. DELETE ACCOUNT
  // DELETE /users/delete-account
  // =====================================================
  test('10 - Delete Account', async ({ request }) => {

    const response = await request.delete(
      `${BASE_URL}/users/delete-account`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const responseBody = await response.json();

    console.log('DELETE ACCOUNT STATUS:', response.status());
    console.log('DELETE ACCOUNT RESPONSE:', responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody.success).toBe(true);

  });

});