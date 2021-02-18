import { Inject } from 'typescript-ioc';
import { IWeatherHistoricalProvider } from './IWeatherHistoricalProvider';
import { IWeatherForecastProvider } from './IWeatherForecastProvider';
import { Weather } from '@domain/Weather';

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
