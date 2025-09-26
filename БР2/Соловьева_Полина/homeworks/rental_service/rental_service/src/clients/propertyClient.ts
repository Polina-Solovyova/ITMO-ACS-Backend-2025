import axios from "axios";

class PropertyClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl =
      process.env.PROPERTY_SERVICE_URL ||
      "http://property-service:5002/api/properties";
  }

  async getPropertyById(id: string, token: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error fetching property:", error.response?.data || error.message);
      throw new Error("Failed to fetch property");
    }
  }

  async createProperty(data: any, token: string) {
    try {
      const response = await axios.post(this.baseUrl, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error creating property:", error.response?.data || error.message);
      throw new Error("Failed to create property");
    }
  }

  async updateProperty(id: string, data: any, token: string) {
    try {
      const response = await axios.put(`${this.baseUrl}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error updating property:", error.response?.data || error.message);
      throw new Error("Failed to update property");
    }
  }

  async deleteProperty(id: string, token: string) {
    try {
      const response = await axios.delete(`${this.baseUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error deleting property:", error.response?.data || error.message);
      throw new Error("Failed to delete property");
    }
  }
}

export const propertyClient = new PropertyClient();
