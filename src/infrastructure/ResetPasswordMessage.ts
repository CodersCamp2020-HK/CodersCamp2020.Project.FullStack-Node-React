export default class ResetPasswordMessage {
    message: { subject: string; text: string; html: string };
    constructor(link: string) {
        this.message = {
            subject: 'Your Reset Password Link',
            text: `Animal Shelter: Here is your link to reset password: ${link}`,
            html: `<div style="text-align: center;">
                     <div style="width: 100%; background-color: green; padding: 5px">
                      <h1>Animal Shelter</h1>
                     </div>
                     <div>
                         <div style="border: 1px solid black; padding: 5px; margin-bottom: 10px;">
                             <h3>Activation link: </h3>
                             <h3><a href="${link}">Click here</a></h3>
                         </div>
                     </div>
                     <div style="width: 100%; background-color: green; padding: 5px">
                         <h4>Animal Shelter &copy All right reserved </h4>
                     </div>
                    </div>`,
        };
    }
}
