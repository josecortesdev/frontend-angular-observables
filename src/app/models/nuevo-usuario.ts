export class NuevoUsuario {

    //variables

    name: string;
    password: string;
    password_confirmation: string;
    email: string;


    //constructor 

    constructor(name: string, password: string, password_confirmation: string, email: string, ) {
        this.name = name;
        this.password = password;
        this.password_confirmation = password_confirmation;
        this.email = email;
    }
}
