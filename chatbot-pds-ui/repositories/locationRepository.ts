import { Location, LocationCoordinates } from '@/interfaces';

export class LocationRepository {
    // These two methods are placeholders, to be filled in when this module is merged
    public async getLocationCoordinates(): Promise<LocationCoordinates | null> {
        return {
            latitude: -38.73965,
            longitude: -72.59842
        };
    }

    public async getLocation(): Promise<Location | null> {
        return {
            city: 'Temuco',
            countryCode: 'cl',
        };
    }
}
