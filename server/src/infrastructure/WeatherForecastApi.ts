import { IWeatherForecastProvider } from '../application/IWeatherForecastProvider';
import { Weather } from '../domain/Weather';

export class WeatherForecastApi extends IWeatherForecastProvider {
    getForDate(date: Date): Promise<Weather> {
        return Promise.resolve({ date, temperature: Math.trunc(Math.random() * 20), description: 'windy' });
    }
}
