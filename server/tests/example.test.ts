import { WeatherForecastApi } from '@infrastructure/WeatherForecastApi';

describe('Name of the group', () => {
    test('should ', async () => {
        const api = new WeatherForecastApi();
        const weather = await api.getForDate(new Date());
        expect(weather.description).toBe('windy');
    });
});
