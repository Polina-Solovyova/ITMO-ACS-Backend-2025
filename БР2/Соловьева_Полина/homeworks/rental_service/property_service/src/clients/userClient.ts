import axios from "axios";

class UserClient {
  private baseUrl: string;
  private token: string;

  constructor() {
    this.baseUrl = process.env.USERS_SERVICE_URL || "http://users-service:5001/api/users";
    this.token = process.env.INTERNAL_SERVICE_TOKEN || "supersecretinternaltoken123";
  }

  async getUserById(userId: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/${userId}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error fetching user:", error.response?.data || error.message);
      throw new Error("Failed to fetch user");
    }
  }

}

export const userClient = new UserClient();

