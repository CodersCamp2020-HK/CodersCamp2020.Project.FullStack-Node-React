import { WeatherService } from '@application/WeatherService';
import { Weather } from '@domain/Weather';
import { Controller, Get, Path, Route, Tags } from 'tsoa';
import { Inject } from 'typescript-ioc';

@Tags('Weather')
@Route('weather')
export class WeatherController extends Controller {
    @Inject
    private weatherService!: WeatherService;

    @Get('{date}')
    public getWeatherForDate(@Path() date: Date): Promise<Weather> {
        return this.weatherService.getByDate(date);
    }
}
