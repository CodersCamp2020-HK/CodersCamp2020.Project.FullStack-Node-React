import { AnimalSubmissionsService, FormStatus } from '@application/AnimalSubmissionsService';
import ApiError from '@infrastructure/ApiError';
import FormAnimalSubmission from '@infrastructure/postgres/FormAnimalSubmission';
import { Get, Query, Route, Tags, Response } from 'tsoa';
import { Inject } from 'typescript-ioc';

@Tags('Submissions')
@Route('submissions')
export class AnimalSubmissionsController {
    @Inject
    private submissionService!: AnimalSubmissionsService;

    @Response<ApiError>(404, 'Submissions Not Found')
    @Get()
    public async getAllAnimalSubmissions(
        @Query() status?: FormStatus,
        @Query() date?: Date,
        @Query() specie?: string,
    ): Promise<FormAnimalSubmission[]> {
        return this.submissionService.getAllAnimalSubmissions({ status, date, specie });
    }
}
