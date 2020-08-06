export class Negociacao {

    constructor(
        readonly data: Date, 
        readonly quantidade: number, 
        readonly valor: number
    ) {
        //ignorar
    }

    get volume() {
        return this.quantidade * this.valor;
    }
}
