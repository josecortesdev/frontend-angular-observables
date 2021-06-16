export class NuevoUsuario {


    name: string;
    password: string;
    password_confirmation: string;
    email: string;



    constructor(name: string, password: string, password_confirmation: string, email: string, ) {
        this.name = name;
        this.password = password;
        this.password_confirmation = password_confirmation;
        this.email = email;
    }
}
