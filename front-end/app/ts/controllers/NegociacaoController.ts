import { logarInputOutput, logarTempoDeExecucao, domLazyInject } from "../helpers/decorators/index";
import { Negociacao, Negociacoes } from "../models/index";
import { NegociacoesView, MensagemView } from "../views/index";

export class NegociacaoController {

    @domLazyInject("#data")
    private _inputData: JQuery;

    @domLazyInject("#quantidade")
    private _inputQuantidade: JQuery;

    @domLazyInject("#valor")
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();

    private _negociacoesView = new NegociacoesView("#negociacoes-view", true);

    private _mensagemView = new MensagemView("#mensagem-view", true);

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @logarInputOutput()
    @logarTempoDeExecucao(true)
    adiciona(event: Event): void {

        event.preventDefault();

        const data = new Date(this._inputData.val().replace(/-/g, ","));
        if (!this._ehDiaUtil(data)) {
            this._mensagemView.update("Selecione um dia útil da semana por favor!");
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update("Negociação adicionada com sucesso!");
    }

    private _ehDiaUtil(data: Date) {
        return data.getDay() != DiaDaSemana.Domingo && data.getDay() != DiaDaSemana.Sabado;
    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}