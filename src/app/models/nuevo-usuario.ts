export class NuevoUsuario {

    //variables

    nombre: string;
    password: string;
    confirmation: string;
    email: string;


    //constructor 

    constructor(nombre: string, password: string, confirmation: string, email: string, ) {
        this.nombre = nombre;
        this.password = password;
        this.confirmation = confirmation;
        this.email = email;
    }
}
