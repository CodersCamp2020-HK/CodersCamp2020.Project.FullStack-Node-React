import ApiError from '@infrastructure/ApiError';
import { Controller, Get, Response, Route, Security, SuccessResponse, Tags, Example } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { DeepPartial } from 'typeorm';
import { AdoptionStepService } from '@application/AdoptionStepService';
import AdoptionStep from '@infrastructure/postgres/AdoptionStep';

@Tags('Adoption Steps')
@Route('adoption-steps')
export class VolunterHireStepsController extends Controller {
    @Inject
    private adoptionStepService!: AdoptionStepService;

    /**
     * Get all volunteer hire steps
     */
    @Security('jwt', ['normal', 'volunteer', 'admin', 'employee'])
    @Response<ApiError>(401, 'Unauthorized')
    @Response<ApiError>(404, 'Volunterr hire steps not found')
    @Response<ApiError>(400, 'Bad Request')
    @Response<Error>(500, 'Internal Server Error')
    @SuccessResponse(200, 'OK')
    @Example<DeepPartial<AdoptionStep>[]>([
        {
            name: 'Step 1: Lorem ipsum',
            number: 1,
            description: 'Step description lorem ipsum',
        },
        {
            name: 'Step 1: Lorem ipsum',
            number: 1,
            description: 'Step description lorem ipsum',
        },
    ])
    @Get('')
    public async getAll(): Promise<AdoptionStep[]> {
        return await this.adoptionStepService.getAll();
    }
}
