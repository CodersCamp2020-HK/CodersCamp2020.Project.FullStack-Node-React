import {
    ApiKey,
    EmailResetPassword,
    UserCreationParams,
    UserLoginParams,
    UserResetPasswordParams,
    UsersService,
    UserUpdateParams,
} from '@application/UsersService';
import ApiError from '@infrastructure/ApiError';
import { IAuthUserInfoRequest, IUserInfo } from '@infrastructure/Auth';
import User, { Email } from '@infrastructure/postgres/User';
import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Path,
    Post,
    Put,
    Res,
    Response,
    Request,
    Route,
    Security,
    SuccessResponse,
    Tags,
    TsoaResponse,
    Query,
} from 'tsoa';
import { Inject } from 'typescript-ioc';
import {
    InvalidEmailFormatError,
    PasswordRequirementsError,
    UniqueUserEmailError,
    ValidateErrorJSON,
} from '@application/UsersErrors';
import { Request as ExRequest } from 'express';
import { EmailService } from '@infrastructure/EmailService';
import { LinkType } from '@infrastructure/TemporaryUserActivationInfoStore';
import ActivationMessage from '@infrastructure/ActivationMessage';
import { AnimalSubmissionsService } from '@application/AnimalSubmissionsService';
import { AnimalFormStatus } from '@infrastructure/postgres/FormAnimalSubmission';
@Tags('Users')
@Route('users')
export class UsersController extends Controller {
    @Inject
    private usersService!: UsersService;

    @Inject
    private emailService!: EmailService;

    @Inject
    private animalSubmissionsService!: AnimalSubmissionsService;

    /**
     * Supply the unique user ID and update informations about him in database
     * @param userId Identyfy user by ID
     * @param requestBody Update informations about ('name', 'phone', 'surname')
     */
    @Security('jwt', ['normal', 'volunteer', 'admin', 'employee'])
    @Response<ApiError>(401, 'Unauthorized')
    //TODO: sprawdz czy user sobie
    @Response<ApiError>(404, 'User not found')
    @Response<User>(200, 'User updated')
    @Put('{userId}')
    public async updateUser(@Path() userId: number, @Body() requestBody: Partial<UserUpdateParams>): Promise<User> {
        this.setStatus(200);
        return this.usersService.update(userId, requestBody);
    }

    /**
     * Supply the unique user ID and get informations about him from database
     * @param userId Identyfy user by ID
     */
    @Security('jwt', ['normal', 'volunteer', 'admin', 'employee'])
    @Response<ApiError>(401, 'Unauthorized')
    //TODO user tylko sam sobie
    @Get('{userId}')
    public async getUser(@Path() userId: number): Promise<User> {
        return this.usersService.get(userId);
    }

    /**
     * Creating new user in datebase with unique ID.
     * @param requestBody User need to give his email and password
     * @param badRequestResponse Throws error when erver was unable to process the request
     */
    @Response<ValidateErrorJSON>(422, 'Validation Failed')
    @SuccessResponse('201', 'Created')
    @Post()
    public async createUser(
        @Body() requestBody: UserCreationParams,
        @Res() badRequestResponse: TsoaResponse<400, { reason: string }>,
        @Request() request: ExRequest,
    ): Promise<void> {
        try {
            const createdUser = await this.usersService.create(requestBody);

            await this.sendActivationLink(createdUser.id, request);

            this.setStatus(201);
        } catch (error) {
            if (
                error instanceof UniqueUserEmailError ||
                error instanceof PasswordRequirementsError ||
                error instanceof InvalidEmailFormatError
            ) {
                return badRequestResponse(400, { reason: error.message });
            } else {
                throw error;
            }
        }
    }

    /**
     * Get additional user ID for activation
     * @param generatedUUID additional user ID for activation user in datebase
     */
    @Get('activate/{generatedUUID}')
    @SuccessResponse('200', 'User Activated')
    @Response('404', 'Link is not valid or expired')
    public async activateUser(@Path() generatedUUID: string): Promise<void> {
        await this.usersService.activateUser(generatedUUID);
        this.setStatus(200);
    }

    /**
     * Send activation link to user with unique ID with information about
     * @param userId Unique ID of user
     * @param request Information from express
     */
    @Post('{userId}/sendActivationLink')
    @SuccessResponse('200', 'Sent')
    public async sendActivationLink(@Path() userId: number, @Request() request: ExRequest): Promise<void> {
        try {
            const ACTIVATION_PATH = request.get('host') + '/api/users/activate/';
            const createdUser = await this.usersService.get(userId);
            const personalUUID = await this.usersService.createUUID(userId, LinkType.activation);
            const message = new ActivationMessage(ACTIVATION_PATH + personalUUID).message;

            await this.emailService.sendEmail(createdUser.mail, message);

            this.setStatus(200);
            return;
        } catch (error) {
            throw error;
        }

        return;
    }

    /**
     * Send an email to users that applied for unique pet
     * @param petName Send and email by pet name
     */
    @Security('jwt', ['admin', 'employee'])
    @Post('sendSomeoneAdoptedEmails')
    @Response('401', 'Unauthorized')
    @Response('400', 'Bad request')
    @SuccessResponse('201', ' Email sended') // Custom success response
    @Security('jwt', ['admin', 'employee'])
    public async sendSomeoneAdoptedEmails(@Query() petName: string): Promise<void> {
        const submissions = await this.animalSubmissionsService.getAllAnimalSubmissions({
            animalName: petName,
            status: AnimalFormStatus.REJECTED,
        });

        const adopters = submissions.map((submission) => {
            return submission.applicant;
        });

        await this.usersService.sendSomeoneAdoptedEmails(adopters, petName);
        this.setStatus(201);
    }

    /** Supply the unique user ID and delete user with corresponding id from database
     *  @param userId Unique ID of user
     */
    @Response('401', 'Unauthorized')
    @Response('404', 'User not found')
    @SuccessResponse('200', ' User deleted') // Custom success response
    @Security('jwt', ['admin', 'normal', 'volunteer', 'employee'])
    @Delete('{userId}')
    public async deleteUser(@Path() userId: number, @Request() request: IAuthUserInfoRequest): Promise<void> {
        this.setStatus(200);
        await this.usersService.delete(userId, request);
    }

    /**
     *
     * @param requestBody
     */
    @Response<ApiError>(400, 'Bad Request')
    @Post('auth')
    public async loginUser(@Body() requestBody: UserLoginParams): Promise<ApiKey> {
        this.setStatus(200);
        return this.usersService.login(requestBody);
    }

    /**
     * Supply the unique user ID and update user password with corresponding id from database
     * @param userId The user's identifier
     * @param password The user's password
     */
    @Security('jwt', ['admin', 'employee', 'normal', 'volunteer'])
    @Response<ApiError>(404, 'User not found')
    @SuccessResponse(200, 'OK')
    @Patch('{userId}')
    public async updateUserPassword(
        @Path() userId: number,
        @Body() password: UserResetPasswordParams,
        @Request() request: IAuthUserInfoRequest,
    ): Promise<void> {
        this.setStatus(200);
        return this.usersService.updatePassword(userId, password, request.user as IUserInfo);
    }

    /**
     * Supply the email address in body, then link to reset the password will be sent for that user
     * @param email User's email
     */
    @Response<ApiError>(404, 'User not found')
    @Response<ApiError>(400, 'Bad Request')
    @SuccessResponse('200', 'Email send')
    @Post('reset')
    public async sendResetPasswordMail(
        @Body() email: EmailResetPassword,
        @Request() request: ExRequest,
    ): Promise<void> {
        const ACTIVATION_PATH = request.get('host') + '/api/users/reset/';
        this.usersService.sendResetPasswordLink(email, ACTIVATION_PATH);
        this.setStatus(200);
    }

    /**
     * Supply the reset password linkto reset the password
     */
    @Response<ApiError>(404, 'User not found')
    @Response<ApiError>(400, 'Bad Request')
    @SuccessResponse('200', 'Password set')
    @Post('reset/{userResetUUID}')
    public async resetUserPassword(
        @Path() userResetUUID: string,
        @Body() newPassword: UserResetPasswordParams,
    ): Promise<void> {
        this.usersService.resetPassword(userResetUUID, newPassword);
        this.setStatus(200);
    }

    /**
     * Sending Confirmation message to
     * @param petName
     * @param adopterEmail
     */
    @Post('sendVisitConfirmationMessage')
    @Response('401', 'Unauthorized')
    @Response('400', 'Bad request')
    @SuccessResponse('201', ' Email sended') // Custom success response
    @Security('jwt', ['admin', 'employee'])
    public async sendVisitConfirmationEmail(@Query() petName: string, @Query() adopterEmail: Email): Promise<void> {
        //TODO:
        //Pobieranie użytkownika o podanym emailu
        const adopter = new User();
        (adopter.name = 'Jan'), (adopter.surname = 'Nowak'), (adopter.mail = adopterEmail);
        //CHANGE

        await this.usersService.sendVisitConfirmationMessage(adopter, petName);
        this.setStatus(201);
    }
}
