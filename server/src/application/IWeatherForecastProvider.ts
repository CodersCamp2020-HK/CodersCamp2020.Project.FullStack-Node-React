import { Weather } from '@domain/Weather';

abstract class IWeatherForecastProvider {
    abstract getForDate(date: Date): Promise<Weather>;
}

export { IWeatherForecastProvider };
