export class Producto {


    // He reutilizado código y un backend que hice con Spring
    // De momento dejo el nombre 'producto' para no tardar mucho en la prueba
    // Con Producto hago referencia a la banda de rock 
    // Para una aplicación en la que vayan a trabajar más personas probablemente debería cambiar el nombre 'producto' por uno como 'banda' para que se entienda mejor

    id?: number;
    name: string;
    price: number;


    constructor(name: string, price: number) {
        this.name = name;
        this.price = price; 

    }
}


