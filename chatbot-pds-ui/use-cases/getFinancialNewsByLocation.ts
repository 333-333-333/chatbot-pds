import { LocationRepository, NewsRepository } from "@/repositories";

export class GetFinancialNewsByLocationUseCase {
  constructor(
    private locationRepository: LocationRepository,
    private newsRepository: NewsRepository
  ) { }

  async execute(location: string) {
    // Get the coordinates of the location
    const coordinates = await this.locationRepository.getCoordinates(location);

    if (!coordinates) {
      throw new Error("Location not found");
    }

    // Get the financial news based on the coordinates
    return await this.newsRepository.getFinancialNewsByCoordinates(coordinates);
  }
}
