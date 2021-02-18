import { Inject } from 'typescript-ioc';
import { Weather } from '../domain/Weather';
import { IWeatherHistoricalProvider } from './IWeatherHistoricalProvider';
import { IWeatherForecastProvider } from './IWeatherForecastProvider';

export class WeatherService {
    @Inject
    private weatherHistoricalProvider!: IWeatherHistoricalProvider;

    @Inject
    private weatherForecastProvider!: IWeatherForecastProvider;

    getByDate(date: Date): Promise<Weather> {
        if (date > new Date()) {
            return this.weatherForecastProvider.getForDate(date);
        }

        return this.weatherHistoricalProvider.getByDate(date);
    }
}
