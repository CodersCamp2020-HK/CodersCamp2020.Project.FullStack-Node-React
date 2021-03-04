/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Container, Scope } from 'typescript-ioc';
import { IWeatherForecastProvider } from './application/IWeatherForecastProvider';
import { WeatherForecastApi } from './infrastructure/WeatherForecastApi';
import { IWeatherHistoricalProvider } from './application/IWeatherHistoricalProvider';
import { WeatherHistoricalApi } from './infrastructure/WeatherHistoricalApi';
import { AnimalsService } from '@application/AnimalsService';
import { UsersService } from '@application/UsersService';
import { getConnection } from 'typeorm';
import { Animal } from '@infrastructure/postgres/Animal';
import { User } from '@infrastructure/postgres/User';
import { AnimalAdditionalInfo } from '@infrastructure/postgres/AnimalAdditionalInfo';
import { QuestionnaireService } from '@application/QuestionnaireService';
import { Questionnaire } from '@infrastructure/postgres/Questionnaire';

Container.bind(IWeatherForecastProvider).to(WeatherForecastApi).scope(Scope.Singleton);
Container.bind(IWeatherHistoricalProvider).to(WeatherHistoricalApi).scope(Scope.Singleton);
Container.bind(UsersService)
    .factory(() => new UsersService(getConnection().getRepository(User)))
    .scope(Scope.Local);
Container.bind(AnimalsService)
    .factory(
        () =>
            new AnimalsService(
                getConnection().getRepository(Animal),
                getConnection().getRepository(AnimalAdditionalInfo),
            ),
    )
    .scope(Scope.Local);

Container.bind(QuestionnaireService)
    .factory(() => new QuestionnaireService(getConnection().getRepository(Questionnaire)))
    .scope(Scope.Local);
