import { Imprimivel } from "./Imprimivel";
import { Objeto } from "./Objeto";
import { Negociacao } from "./Negociacao";

export class Negociacoes implements Objeto<Negociacoes> {

    private _negociacoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao): boolean {

        let jaAdicionado = this._negociacoes.some(adicionado => adicionado.ehIgual(negociacao));
        if (!jaAdicionado) {
            this._negociacoes.push(negociacao);
            return true;
        }

        return false;
    }

    paraArray(): Negociacao[] {

        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    paraTexto(): void {
        console.log('-- paraTexto --');
        console.log(JSON.stringify(this._negociacoes));
    }

    ehIgual(negociacoes: Negociacoes) {
        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes._negociacoes);
    }
}