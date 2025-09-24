import axios from "axios";

class UserClient {
  private baseUrl: string;

  constructor() {
    // Адрес Users Service, можно из .env
    this.baseUrl = process.env.USERS_SERVICE_URL || "http://users-service:5001/api/users";
  }

  async getUserById(userId: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/${userId}`);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching user:", error.response?.data || error.message);
      throw new Error("Failed to fetch user");
    }
  }

  async createUser(userData: any) {
    try {
      const response = await axios.post(this.baseUrl, userData);
      return response.data;
    } catch (error: any) {
      console.error("Error creating user:", error.response?.data || error.message);
      throw new Error("Failed to create user");
    }
  }
}

export const userClient = new UserClient();
