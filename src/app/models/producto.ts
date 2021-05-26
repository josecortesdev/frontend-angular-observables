export class Producto {  
    
    // Para no tardar mucho en hacer la prueba he reutilizado algo de código
    // Con Producto hago referencia a la banda de rock

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


