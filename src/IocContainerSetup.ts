/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Container, Scope } from 'typescript-ioc';
import { IWeatherForecastProvider } from './application/IWeatherForecastProvider';
import { WeatherForecastApi } from './infrastructure/WeatherForecastApi';
import { IWeatherHistoricalProvider } from './application/IWeatherHistoricalProvider';
import { WeatherHistoricalApi } from './infrastructure/WeatherHistoricalApi';
import { AnimalsService } from '@application/AnimalsService';
import { getConnection } from 'typeorm';
import { Animal } from '@infrastructure/postgres/Animal';
import { AnimalAdditionalInfo } from '@infrastructure/postgres/AnimalAdditionalInfo';
import { SurveyService } from '@application/SurveyService';
import { Questionnaire } from '@infrastructure/postgres/Survey';

Container.bind(IWeatherForecastProvider).to(WeatherForecastApi).scope(Scope.Singleton);
Container.bind(IWeatherHistoricalProvider).to(WeatherHistoricalApi).scope(Scope.Singleton);
Container.bind(AnimalsService)
    .factory(
        () =>
            new AnimalsService(
                getConnection().getRepository(Animal),
                getConnection().getRepository(AnimalAdditionalInfo),
            ),
    )
    .scope(Scope.Local);
Container.bind(SurveyService)
    .factory(() => new SurveyService(getConnection().getRepository(Questionnaire)))
    .scope(Scope.Local);
