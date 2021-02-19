import { Weather } from '@domain/Weather';

abstract class IWeatherHistoricalProvider {
    abstract getByDate(date: Date): Promise<Weather>;
}

export { IWeatherHistoricalProvider };
