import * as nodemailer from 'nodemailer';
export class EmailService {
    public async sendActivationEmail(targetEmail: string, activationLink: string): Promise<void> {
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
            subject: 'Animal Shelter Your Activation Link',
            text: 'Animal Shelter: Thank you for registration! Here is your activation link: ' + activationLink,
            html: `<div style="text-align: center;">
                    <div style="width: 100%; background-color: green; padding: 5px">
                     <h1>Animal Shelter</h1>
                    </div>
                    <div>
                        <h2> Thank you for registration! Below is activation link for your account</h2>
                        <div style="border: 1px solid black; padding: 5px; margin-bottom: 10px;">
                            <h3>Activation link: </h3>
                            <h3><a href="${activationLink}">Click here</a></h3>
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

        return;
    }
}
