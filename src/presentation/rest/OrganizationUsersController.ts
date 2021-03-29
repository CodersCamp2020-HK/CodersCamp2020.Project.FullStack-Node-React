import ApiError from '@infrastructure/ApiError';
import { Controller, Get, Response, Route, Security, SuccessResponse, Tags, Example, Query } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { DeepPartial } from 'typeorm';
import OrganizationUser, { UserType } from '@infrastructure/postgres/OrganizationUser';

@Tags('Organization Users')
@Route('organization-users')
export class OrganizationUsersController extends Controller {
    @Inject
    private organizationUsersService!: OrganizationUsersService;

    /**
     * Get all organization users
     * @param role Find users by role
     */
    @Security('jwt', ['admin', 'employee'])
    @Response<ApiError>(401, 'Unauthorized')
    @Response<ApiError>(404, 'Organization users not found')
    @Response<ApiError>(400, 'Bad Request')
    @Response<Error>(500, 'Internal Server Error')
    @SuccessResponse(200, 'OK')
    @Example<DeepPartial<OrganizationUser>[]>([
        {
            organization: {
                id: 1,
                name: 'Braterska Łapa',
            },
            user: {
                id: 1,
                name: 'Jan',
                surname: 'Kowalski',
                registrationDate: '2021-01-11',
            },
            role: UserType.ADMIN,
        },
        {
            organization: {
                id: 1,
                name: 'Braterska Łapa',
            },
            user: {
                id: 2,
                name: 'Adam',
                surname: 'Nowak',
                registrationDate: '2021-01-15',
            },
            role: UserType.EMPLOYEE,
        },
    ])
    @Get('')
    public async getAllOrganizationUsers(@Query() role?: string): Promise<OrganizationUser[]> {
        return await this.organizationUsersService.getAllSteps(role);
    }
}
