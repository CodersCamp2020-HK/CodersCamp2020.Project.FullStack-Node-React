import { Controller, Get, Path, Route, Post, Body, Tags } from 'tsoa';
import { Calendar } from '../../infrastructure/postgres/Calendar';
import { CalendarService, CalendarCreationParams } from '../../application/CalendarService';
import { Inject } from 'typescript-ioc';

@Tags('Calendar')
@Route('calendars')
export class CalendarController extends Controller {
    @Inject
    private calendarService!: CalendarService;

    /**
     * Retrieves the details of an existing visit.
     * Supply the unique visit time from either and receive corresponding visit details.
     */
    @Get()
    public async getAllVisits(): Promise<Calendar> {
        return this.calendarService.getAll();
    }

    /**
     * Retrieves the details of an existing visit.
     * Supply the unique visit time from either and receive corresponding visit details.
     */
    @Get('{time}')
    public async getVisit(@Path() time: Date): Promise<Calendar> {
        return this.calendarService.get(time);
    }

    @Post()
    public async createVisit(@Body() requestBody: CalendarCreationParams): Promise<void> {
        this.setStatus(201);
        this.calendarService.create(requestBody);
    }
}
