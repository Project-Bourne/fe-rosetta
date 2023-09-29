import { request2 } from "../hooks/api";

class AuthService {
//   static getUserViaAccessToken() {
//     throw new Error("Method not implemented.");
//   }
  /**
   * Create a new workspace.
   * @param {Object} docData - The data of the new workspace.
   * @returns {Promise<Object>} - The response data from the server.
   */

  static async getUserViaAccessToken() {
    try {
      const response = await request2(
        `token/user`,
        "GET",
        {},
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

// Export the Service class.
export default AuthService;
