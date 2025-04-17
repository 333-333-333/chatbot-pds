export class LocationApi {
  public async getLocation(longitude: number, latitude: number): Promise<any> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            "User-Agent": "chatbot-pds/1.0",
            Accept: "application/json",
          },
        },
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching location:", error);
      throw new Error("Failed to fetch location");
    }
  }
}
