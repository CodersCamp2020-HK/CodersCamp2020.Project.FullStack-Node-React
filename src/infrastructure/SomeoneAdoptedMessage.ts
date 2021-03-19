export default class SomeoneAdoptedMessage {
    message: { subject: string; text: string; html: string };
    constructor(petName: string, adopterName: string, adopterSurname: string) {
        this.message = {
            subject: `Animal Shelter - Someone has adopted the selected pet: ${petName}`,
            text: `Animal Shelter: Someone has adopted the selected pet: ${petName}`,
            html: `<div style="text-align: center;">
                        <div style="width: 100%; background-color: green; padding: 5px">
                            <h1>Animal Shelter</h1>
                        </div>
                        <div>
                            <h2>Hello ${adopterName} ${adopterSurname} :)</h2>
                            <h3>Thank you for your willingness to adopt!</h3>
                            <p> Unfortunately, someone else has adopted ${petName} :(</p>
                            <p> However, we encourage you to visit shelter and choose other pet. There are many animals needing your love</p>
                            <p>Greetings, Animal Shelter!</p>
                        </div>
                        <div style="width: 100%; background-color: green; padding: 5px">
                            <h4>Animal Shelter &copy All right reserved </h4>
                        </div>
                    </div>`,
        };
    }
}
