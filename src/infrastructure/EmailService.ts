import * as nodemailer from 'nodemailer';

interface Message {
    subject: string;
    text: string;
    html: string;
}

export class EmailService {
    public async sendEmail(targetEmail: string, { subject, text, html }: Message): Promise<void> {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
            throw new Error('Email sender does not exist');
        }
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        //FOR DEVELOPMENT
        // const testAccount = await nodemailer.createTestAccount();
        // const transporter = nodemailer.createTransport({
        //     host: 'smtp.ethereal.email',
        //     port: 587,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //         user: testAccount.user,
        //         pass: testAccount.pass,
        //     },
        //     tls: {
        //         rejectUnauthorized: false,
        //     },
        // });

        const info = await transporter.sendMail({
            from: 'Złapki shelter 🐈 <zlapkishelter@gmail.com>',
            to: targetEmail,
            subject,
            text,
            html,
        });

        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
}
