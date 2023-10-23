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



    /**
   * Create a new Analysis.
   * @param {Object} data - The data of the new workspace.
   * @returns {Promise<Object>} - The response data from the server.
   */

    static async translateFile(data) {
      try {
        const response = await request(
          `translate/file`,
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

  /**
   * Delete a translation by its ID.
   * @param {string} id - The ID of the translation to delete.
   * @returns {Promise<void>} - Resolves when the workspace is deleted successfully.
   */

  static async deleteTranslation(id) {
    try {
      await request(
        `delete/translation/history/${id}`,
        "PUT",
        {},
        true,
        false,
        false,
      );
    } catch (error) {
      throw error;
    }
  }


   /**
   * Delete a translation by its ID.
   * @param {string} id - The ID of the translation to delete.
   * @returns {Promise<void>} - Resolves when the workspace is deleted successfully.
   */

   static async bookMarkTranslation(id) {
    try {
      await request(
        `bookmark/translation/${id}`,
        "PUT",
        {},
        true,
        false,
        false,
      );
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Update a workspace by its ID.
   * @param {string} workspaceId - The ID of the workspace to update.
   * @param {Object} data - The updated data of the workspace.
   * @returns {Promise<Object>} - The response data from the server.
   */
  static async translate(data) {
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


  /**
   * Update a workspace by its ID.
   * @param {string} Id - The ID of the workspace to update.
   * @returns {Promise<Object>} - The response data from the server.
   */


  static async getTranslationsById(Id) {
    try {
      const response = await request(
        `translation/${Id}`,
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

  static async getTranslationsHistory(page=1) {
    try {
      const response = await request(
        `translation/user?page=${page}`,
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
export default TranslatorService;
