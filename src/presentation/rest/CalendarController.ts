import { Controller, Get, Path, Route, Post, Body, Tags, Delete, Security } from 'tsoa';
import Calendar from '../../infrastructure/postgres/Calendar';
import { CalendarService, CalendarCreationParams } from '../../application/CalendarService';
import { Inject } from 'typescript-ioc';

@Tags('Calendar')
@Route('calendars')
export class CalendarController extends Controller {
    @Inject
    private calendarService!: CalendarService;

    /**
     * Retrieves all existing visit.
     */
    @Security('jwt', ['normal', 'volunteer', 'admin', 'employee'])
    @Get()
    public async getAllVisits(): Promise<Calendar> {
        return this.calendarService.getAll();
    }

    /**
     * Supply the visitId from either and receive corresponding visit details.
     * @param visitId The visit's identifier
     */
    @Security('jwt', ['normal', 'volunteer', 'admin', 'employee'])
    @Get('{visitId}')
    public async getVisit(@Path() visitId: number): Promise<Calendar> {
        return this.calendarService.get(visitId);
    }

    /**
     * Supply the unique visit time, aniaml ID and user ID and create unique visit.
     */
    @Security('jwt', ['normal', 'volunteer', 'admin', 'employee'])
    //TODO: Uzytkownik tylko dla siebie moze
    @Post()
    public async createVisit(@Body() requestBody: CalendarCreationParams): Promise<void> {
        this.setStatus(201);
        this.calendarService.create(requestBody);
    }

    /**
     * Supply the visitId and delete corresponding visit.
     * @param visitId The visit's identifier
     */
    @Security('jwt', ['normal', 'volunteer', 'admin', 'employee'])
    @Delete('{visitId}')
    //TODO: Uzytkownik tylko dla siebie moze
    public async deleteVisit(@Path() visitId: number): Promise<void> {
        this.setStatus(200);
        this.calendarService.delete(visitId);
    }
}
