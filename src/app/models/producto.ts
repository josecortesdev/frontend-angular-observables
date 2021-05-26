export class Producto {


    // He reutilizado código y un backend que hice con Spring
    // De momento dejo el nombre 'producto' para no tardar mucho en la prueba
    // Con Producto hago referencia a la banda de rock 
    // Para una aplicación en la que vayan a trabajar más personas probablemente debería cambiar el nombre 'producto' por uno como 'banda' para que se entienda mejor

    id?: number;
    nombre: string;
    origen: string;
    ticker: string;  // es el id del vídeo de Youtube
    age: number;
    idcartera: string;

    constructor(nombre: string, origen: string, ticker: string, age: number, idcartera: string) {
        this.nombre = nombre;
        this.origen = origen;
        this.ticker = ticker; // es el id del vídeo de Youtube
        this.age = age;
        this.idcartera = idcartera;
    }
}


