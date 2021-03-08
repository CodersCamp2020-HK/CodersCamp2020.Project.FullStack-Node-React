import * as nodemailer from 'nodemailer';

//Example usage await this.emailService.sendActivationEmail('sidney.kshlerin17@ethereal.email', request.get('host') + '/api/users/activate/' + generatedUUID);
export class EmailService {
    public async sendResetPasswordLink(targetEmail: string, activationLink: string): Promise<void> {
        const path =
            process.env.NODE_ENV === 'production'
                ? 'https://coders-camp-schronisko.herokuapp.com/api/users/reset/'
                : 'http://localhost:8000/api/users/reset/';
        //FOR PRODUCTION
        // if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSOWRD) {
        //     throw new Error('Email sender does not exist');
        // }
        // const transporter = nodemailer.createTransport({
        //     service: 'SendGrid',
        //     auth: {
        //         user: process.env.EMAIL_USER,
        //         pass: process.env.EMAIL_PASSWORD,
        //     },
        // });

        //FOR DEVELOPMENT
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const info = await transporter.sendMail({
            from: 'Animal shelter 🐈 <activation@animal-shelter.com>',
            to: targetEmail,
            subject: 'Your Reset Password Link',
            text: `Animal Shelter: Here is your link to reset password: ${path + activationLink}`,
            html: `<div style="text-align: center;">
                    <div style="width: 100%; background-color: green; padding: 5px">
                     <h1>Animal Shelter</h1>
                    </div>
                    <div>
                        <div style="border: 1px solid black; padding: 5px; margin-bottom: 10px;">
                            <h3>Activation link: </h3>
                            <h3><a href="${path + activationLink}">Click here</a></h3>
                        </div>
                    </div>
                    <div style="width: 100%; background-color: green; padding: 5px">
                        <h4>Animal Shelter &copy All right reserved </h4>
                    </div>
                   </div>`,
        });

        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
}
