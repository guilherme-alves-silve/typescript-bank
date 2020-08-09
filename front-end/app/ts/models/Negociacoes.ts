import { Imprimivel } from "./Imprimivel";
import { Negociacao } from "./Negociacao";

export class Negociacoes implements Imprimivel {

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
}