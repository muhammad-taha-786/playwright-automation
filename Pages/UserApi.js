class UserApi {

  constructor(request) {

    this.request = request;

    this.baseURL =
      'https://api-testing-postman.vercel.app/api/v1';

    this.token = null;

  }


  // =====================================================
  // REGISTER
  // =====================================================

  async registerUser(userData) {

    return await this.request.post(
      `${this.baseURL}/users/register`,
      {
        data: userData
      }
    );

  }


  // =====================================================
  // LOGIN
  // =====================================================

  async loginUser(loginData) {

    const response =
      await this.request.post(
        `${this.baseURL}/users/login`,
        {
          data: loginData
        }
      );


    const responseBody =
      await response.json();


    // Save access token
    if (responseBody?.data?.accessToken) {

      this.token =
        responseBody.data.accessToken;

    }


    return response;

  }


  // =====================================================
  // AUTH HEADERS
  // =====================================================

  getAuthHeaders() {

    return {

      Authorization:
        `Bearer ${this.token}`

    };

  }


  // =====================================================
  // GET CURRENT USER
  // =====================================================

  async getCurrentUser() {

    return await this.request.get(
      `${this.baseURL}/users/current-user`,
      {
        headers: this.getAuthHeaders()
      }
    );

  }


  // =====================================================
  // UPDATE ACCOUNT
  // =====================================================

  async updateAccount(userData) {

    return await this.request.patch(
      `${this.baseURL}/users/update-account`,
      {
        headers: this.getAuthHeaders(),

        data: userData
      }
    );

  }


  // =====================================================
  // REPLACE ACCOUNT
  // =====================================================

  async replaceAccount(userData) {

    return await this.request.put(
      `${this.baseURL}/users/replace-account`,
      {
        headers: this.getAuthHeaders(),

        data: userData
      }
    );

  }


  // =====================================================
  // GET USER BY USERNAME
  // =====================================================

  async getUserByUsername(username) {

    return await this.request.get(
      `${this.baseURL}/users/user/${username}`
    );

  }


  // =====================================================
  // GET ALL USERS
  // =====================================================

  async getAllUsers() {

    return await this.request.get(
      `${this.baseURL}/users/all-users`,
      {
        headers: this.getAuthHeaders()
      }
    );

  }


  // =====================================================
  // CHANGE PASSWORD
  // =====================================================

  async changePassword(passwordData) {

    return await this.request.post(
      `${this.baseURL}/users/change-password`,
      {
        headers: this.getAuthHeaders(),

        data: passwordData
      }
    );

  }


  // =====================================================
  // LOGOUT
  // =====================================================

  async logoutUser() {

    return await this.request.post(
      `${this.baseURL}/users/logout`,
      {
        headers: this.getAuthHeaders()
      }
    );

  }


  // =====================================================
  // DELETE ACCOUNT
  // =====================================================

  async deleteAccount() {

    return await this.request.delete(
      `${this.baseURL}/users/delete-account`,
      {
        headers: this.getAuthHeaders()
      }
    );

  }

}


export default UserApi;