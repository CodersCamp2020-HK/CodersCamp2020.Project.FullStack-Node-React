import {
    Controller,
    Get,
    Path,
    Route,
    Post,
    Body,
    Tags,
    Delete,
    Security,
    Response,
    SuccessResponse,
    Request,
} from 'tsoa';
import Calendar from '../../infrastructure/postgres/Calendar';
import { CalendarService, CalendarCreationParams } from '../../application/CalendarService';
import { Inject } from 'typescript-ioc';
import ApiError from '@infrastructure/ApiError';
import { ValidateErrorJSON } from '@application/UsersErrors';
import { IAuthUserInfoRequest, IUserInfo } from '@infrastructure/Auth';
import { request } from 'express';

@Tags('Calendar')
@Route('calendars')
export class CalendarController extends Controller {
    @Inject
    private calendarService!: CalendarService;

    /**
     * Retrieves all existing visit.
     */
    @Security('jwt', ['normal', 'volunteer', 'admin', 'employee'])
    @Response<Error>(500, 'Internal Server Error')
    @Response<ApiError>(404, 'Not Found')
    @SuccessResponse(200, 'ok')
    @Get()
    public async getAllVisits(): Promise<Calendar> {
        return this.calendarService.getAll();
    }

    /**
     * Supply the visitId from either and receive corresponding visit details.
     * @param visitId The visit's identifier
     */
    @Security('jwt', ['normal', 'volunteer', 'admin', 'employee'])
    @Response<Error>(500, 'Internal Server Error')
    @Response<ApiError>(404, 'Not Found')
    @SuccessResponse(200, 'ok')
    @Get('{visitId}')
    public async getVisit(@Path() visitId: number): Promise<Calendar> {
        return this.calendarService.get(visitId);
    }

    /**
     * Supply the unique visit time, aniaml ID and user ID and create unique visit.
     */
    @Security('jwt', ['normal', 'volunteer', 'admin', 'employee'])
    @Response<ApiError>(400, 'Bad Request')
    @Response<ApiError>(401, 'Unauthorized')
    @Response<Error>(500, 'Internal Server Error')
    @Response<ValidateErrorJSON>(422, 'Validation Failed')
    @Response<ApiError>(404, 'Not Found')
    @SuccessResponse(201, 'created')
    @Post()
    public async createVisit(
        @Body() requestBody: CalendarCreationParams,
        @Request() request: IAuthUserInfoRequest,
    ): Promise<void> {
        this.setStatus(201);
        this.calendarService.create(requestBody, request.user as IUserInfo);
    }

    /**
     * Supply the visitId and delete corresponding visit.
     * @param visitId The visit's identifier
     */
    @Security('jwt', ['normal', 'volunteer', 'admin', 'employee'])
    @Response<ApiError>(400, 'Bad Request')
    @Response<ApiError>(404, 'Not Found')
    @Response<ApiError>(401, 'Unauthorized')
    @Response<Error>(500, 'Internal Server Error')
    @Response<ValidateErrorJSON>(422, 'Validation Failed')
    @Delete('{visitId}')
    public async deleteVisit(@Path() visitId: number, @Request() request: IAuthUserInfoRequest): Promise<void> {
        this.setStatus(200);
        this.calendarService.delete(visitId, request.user as IUserInfo);
    }
}
