import { request } from "@/hooks/api";

class TranslatorService {
  /**
   * Create a new workspace.
   * @param {Object} data - The data of the new workspace.
   * @returns {Promise<Object>} - The response data from the server.
   */

  async createTranslations(data) {
    try {
      const response = await request(
        `translate/`,
        "POST",
        data,
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // /**
  //  * Delete a workspace by its ID.
  //  * @param {string} workspaceId - The ID of the workspace to delete.
  //  * @returns {Promise<void>} - Resolves when the workspace is deleted successfully.
  //  */

  // async deleteWorkspace(workspaceId) {
  //   try {
  //     await request(
  //       `/workspaces/${workspaceId}`,
  //       "DELETE",
  //       {},
  //       true,
  //       false,
  //       false,
  //     );
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // /**
  //  * Update a workspace by its ID.
  //  * @param {string} workspaceId - The ID of the workspace to update.
  //  * @param {Object} updatedData - The updated data of the workspace.
  //  * @returns {Promise<Object>} - The response data from the server.
  //  */
  // async updateWorkspace(workspaceId, updatedData) {
  //   try {
  //     const response = await request(
  //       `/space/${workspaceId}`,
  //       "PATCH",
  //       updatedData,
  //       true,
  //       false,
  //       false,
  //     );
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // }


  /**
   * Update a workspace by its ID.
   * @param {string} Id - The ID of the workspace to update.
   * @returns {Promise<Object>} - The response data from the server.
   */


  async getTranslationsById(Id) {
    try {
      const response = await request(
        `collab/${Id}/collabs`,
        "GET",
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Get a workspace by its ID.
   * @param {string} - The ID of the workspace to get.
   * @returns {Promise<Object>} - The response data from the server.
   */

  async getTranslations() {
    try {
      const response = await request(
        `translations`,
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
export default TranslatorService;
