export default class ActivationMessage {
    message: { subject: string; text: string; html: string };
    constructor(link: string) {
        this.message = {
            subject: 'Animal Shelter Account Activation',
            text: `Animal Shelter: Thank you for registration! Here is your activation link: ${link}`,
            html: `<div style="text-align: center;">
                        <div style="width: 100%; background-color: green; padding: 5px">
                            <h1>Animal Shelter</h1>
                        </div>
                        <div>
                            <h2> Thank you for registration! Below is activation link for your account</h2>
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
