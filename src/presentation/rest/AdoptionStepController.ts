import ApiError from '@infrastructure/ApiError';
import { Controller, Get, Response, Route, Security, SuccessResponse, Tags, Example, Query } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { DeepPartial } from 'typeorm';
import { AdoptionStepService } from '@application/AdoptionStepService';
import AdoptionStep from '@infrastructure/postgres/AdoptionStep';

@Tags('Adoption Steps')
@Route('adoption-steps')
export class AdoptionStepController extends Controller {
    @Inject
    private adoptionStepService!: AdoptionStepService;

    /**
     * Get all adoption steps
     * @param specie Get adoption steps for given specie
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
            name: 'Step 2: Lorem ipsum',
            number: 2,
            description: 'Step 2 description lorem ipsum',
        },
    ])
    @Get('')
    public async getAllAdoptionSteps(@Query() specie?: string): Promise<AdoptionStep[]> {
        return await this.adoptionStepService.getAllSteps(specie);
    }
}
