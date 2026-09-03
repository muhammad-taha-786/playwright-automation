import { test, expect, request } from '@playwright/test';
import UserApi from '../Pages/UserApi.js';


const BASE_URL = 'https://api-testing-postman.vercel.app/api/v1';


let apiContext;
let userApi;

let username;
let email;
let password = 'Test@12345';


test.describe.serial('Users API Automation', () => {


  // =====================================================
  // BEFORE ALL TESTS
  // =====================================================

  test.beforeAll(async () => {

    // Create API request context manually
    apiContext = await request.newContext({
      baseURL: BASE_URL
    });

    // Create User API POM
    userApi = new UserApi(apiContext);

  });


  // =====================================================
  // AFTER ALL TESTS
  // =====================================================

  test.afterAll(async () => {

    // Dispose API context
    await apiContext.dispose();

  });


  // =====================================================
  // 1. REGISTER USER
  // =====================================================

  test('1 - Register User', async () => {

    const timestamp = Date.now();

    username = `taha${timestamp}`;
    email = `taha${timestamp}@gmail.com`;


    const response = await userApi.registerUser({

      fullname: 'Muhammad Taha',

      email: email,

      username: username,

      password: password

    });


    const responseBody = await response.json();


    console.log('REGISTER STATUS:', response.status());

    console.log(
      'REGISTER RESPONSE:',
      responseBody
    );


    expect(response.status()).toBe(201);

    expect(responseBody.success).toBe(true);

    expect(responseBody.message)
      .toBe('User registered Successfully');


    expect(responseBody.data.username)
      .toBe(username);

    expect(responseBody.data.email)
      .toBe(email);

    expect(responseBody.data.fullname)
      .toBe('Muhammad Taha');

  });


  // =====================================================
  // 2. LOGIN USER
  // =====================================================

  test('2 - Login User', async () => {

    const response = await userApi.loginUser({

      username: username,

      email: email,

      password: password

    });


    const responseBody = await response.json();


    console.log('LOGIN STATUS:', response.status());

    console.log(
      'LOGIN SUCCESS:',
      responseBody.success
    );

    console.log(
      'LOGIN MESSAGE:',
      responseBody.message
    );


    expect(response.status()).toBe(200);

    expect(responseBody.success).toBe(true);

    expect(responseBody.message)
      .toBe('User Logged in successfully');


    expect(responseBody.data.accessToken)
      .toBeTruthy();


    expect(responseBody.data.user.username)
      .toBe(username);

    expect(responseBody.data.user.email)
      .toBe(email);

  });


  // =====================================================
  // 3. GET CURRENT USER
  // =====================================================

  test('3 - Get Current User', async () => {

    const response =
      await userApi.getCurrentUser();


    const responseBody =
      await response.json();


    console.log(
      'CURRENT USER STATUS:',
      response.status()
    );

    console.log(
      'CURRENT USER RESPONSE:',
      responseBody
    );


    expect(response.status()).toBe(200);

    expect(responseBody.success).toBe(true);

  });


  // =====================================================
  // 4. UPDATE ACCOUNT
  // =====================================================

  test('4 - Update Account', async () => {

    const updatedFullname =
      'Muhammad Taha Updated';


    const response =
      await userApi.updateAccount({

        fullname: updatedFullname,

        email: email

      });


    const responseBody =
      await response.json();


    console.log(
      'UPDATE ACCOUNT STATUS:',
      response.status()
    );

    console.log(
      'UPDATE ACCOUNT RESPONSE:',
      responseBody
    );


    expect(response.status()).toBe(200);

    expect(responseBody.success).toBe(true);

  });


  // =====================================================
  // 5. REPLACE ACCOUNT
  // =====================================================

  test('5 - Replace Account', async () => {

    const response =
      await userApi.replaceAccount({

        fullname: 'Muhammad Taha Replace',

        email: email,

        username: username

      });


    const responseBody =
      await response.json();


    console.log(
      'REPLACE ACCOUNT STATUS:',
      response.status()
    );

    console.log(
      'REPLACE ACCOUNT RESPONSE:',
      responseBody
    );


    expect(response.status()).toBe(200);

    expect(responseBody.success).toBe(true);

  });


  // =====================================================
  // 6. GET USER BY USERNAME
  // =====================================================

  test('6 - Get User By Username', async () => {

    const response =
      await userApi.getUserByUsername(username);


    const responseBody =
      await response.json();


    console.log(
      'GET USER STATUS:',
      response.status()
    );

    console.log(
      'GET USER RESPONSE:',
      responseBody
    );


    expect(response.status()).toBe(200);

    expect(responseBody.success).toBe(true);

  });


  // =====================================================
  // 7. GET ALL USERS
  // =====================================================

  test('7 - Get All Users', async () => {

    const response =
      await userApi.getAllUsers();


    const responseBody =
      await response.json();


    console.log(
      'ALL USERS STATUS:',
      response.status()
    );

    console.log(
      'ALL USERS RESPONSE:',
      responseBody
    );


    expect(response.status()).toBe(200);

    expect(responseBody.success).toBe(true);

  });


  // =====================================================
  // 8. CHANGE PASSWORD
  // =====================================================

  test('8 - Change Password', async () => {

    const newPassword =
      'NewTest@12345';


    const response =
      await userApi.changePassword({

        oldPassword: password,

        newPassword: newPassword

      });


    const responseBody =
      await response.json();


    console.log(
      'CHANGE PASSWORD STATUS:',
      response.status()
    );

    console.log(
      'CHANGE PASSWORD RESPONSE:',
      responseBody
    );


    expect(response.status()).toBe(200);

    expect(responseBody.success).toBe(true);


    // Save new password
    password = newPassword;

  });


  // =====================================================
  // 9. LOGOUT USER
  // =====================================================

  test('9 - Logout User', async () => {

    const response =
      await userApi.logoutUser();


    const responseBody =
      await response.json();


    console.log(
      'LOGOUT STATUS:',
      response.status()
    );

    console.log(
      'LOGOUT RESPONSE:',
      responseBody
    );


    expect(response.status()).toBe(200);

    expect(responseBody.success).toBe(true);

  });


  // =====================================================
  // 10. DELETE ACCOUNT
  // =====================================================

  test('10 - Delete Account', async () => {

    const response =
      await userApi.deleteAccount();


    const responseBody =
      await response.json();


    console.log(
      'DELETE ACCOUNT STATUS:',
      response.status()
    );

    console.log(
      'DELETE ACCOUNT RESPONSE:',
      responseBody
    );


    expect(response.status()).toBe(200);

    expect(responseBody.success).toBe(true);

  });


});