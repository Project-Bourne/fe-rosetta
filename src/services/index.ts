import { request } from "@/hooks/api";

class globalService {
  /**
   * get all users.
   * @returns {Promise<Object>} - The response data from the server.
   */

  async getUsers() {
    try {
      const response = await request(
        "user/users",
        "GET",
        {},
        true,
        false,
        false,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

// Export the Service class.
export default globalService;
