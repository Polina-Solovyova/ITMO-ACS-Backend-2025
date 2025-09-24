import axios from "axios";

class PropertyClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.PROPERTY_SERVICE_URL || "http://property-service:5002/api/properties";
  }

  async getPropertyById(id: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching property:", error.response?.data || error.message);
      throw new Error("Failed to fetch property");
    }
  }
}

export const propertyClient = new PropertyClient();
