import { Container, Scope } from 'typescript-ioc';
import { IWeatherForecastProvider } from './application/IWeatherForecastProvider';
import { WeatherForecastApi } from './infrastructure/WeatherForecastApi';
import { IWeatherHistoricalProvider } from './application/IWeatherHistoricalProvider';
import { WeatherHistoricalApi } from './infrastructure/WeatherHistoricalApi';

Container.bind(IWeatherForecastProvider).to(WeatherForecastApi).scope(Scope.Singleton);
Container.bind(IWeatherHistoricalProvider).to(WeatherHistoricalApi).scope(Scope.Singleton);
