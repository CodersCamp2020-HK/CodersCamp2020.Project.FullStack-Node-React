import { IWeatherHistoricalProvider } from '@application/IWeatherHistoricalProvider';
import { Weather } from '@domain/Weather';

export class WeatherHistoricalApi extends IWeatherHistoricalProvider {
    getByDate(date: Date): Promise<Weather> {
        return Promise.resolve({ date, temperature: 10 });
    }
}
