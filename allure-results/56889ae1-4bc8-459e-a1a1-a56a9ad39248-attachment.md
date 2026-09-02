# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\api.spec.js >> Get All users API Test
- Location: tests\api.spec.js:8:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  |  
  3  | const data = {
  4  |   "email": "string",
  5  |   "username": "string",
  6  |   "password": "string"
  7  | }
  8  | test('Get All users API Test', async ({request}) => {
  9  | const response = await request.post(
  10 |     'https://api-testing-postman.vercel.app/api/v1/users/login',
  11 |     {
  12 |     data: data
  13 |     }
  14 |  
  15 | );
  16 | console.log(await response.json());
> 17 | expect(response.status()).toBe(200);
     |                           ^ Error: expect(received).toBe(expected) // Object.is equality
  18 |  
  19 |   const tokenData = await response.json();
  20 |   const token = tokenData.token;
  21 |  
  22 |  const GETResponse = await request.get(
  23 |     `https://api-testing-postman.vercel.app/api/v1/users/current-user`,
  24 |     {
  25 |       headers: {
  26 |         Authorization: `Bearer ${token}`
  27 |       }
  28 |     }
  29 |   );
  30 |      console.log(GETResponse.status());
  31 |   expect(GETResponse.status()).toBe(200);
  32 |  
  33 |  
  34 | });
```