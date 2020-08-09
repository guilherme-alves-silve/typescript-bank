import { logarInputOutput, logarTempoDeExecucao, domLazyInject, throttle } from "../helpers/decorators/index";
import { Negociacao, Negociacoes, NegociacaoParcial } from "../models/index";
import { NegociacoesView, MensagemView } from "../views/index";
import { NegociacaoService } from "../services/index";
import { imprime } from "../helpers/index";

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

    private _negociacaoService = new NegociacaoService();

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    @logarInputOutput()
    @logarTempoDeExecucao(true)
    adiciona(event: Event): void {

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

        if (this._negociacoes.adiciona(negociacao)) {
            imprime(negociacao, this._negociacoes);
            this._negociacoesView.update(this._negociacoes);
            this._mensagemView.update("Negociação adicionada com sucesso!");
        } else {
            this._mensagemView.update("Negociação já adicionada!");
        }
    }

    @throttle()
    importaDados() {

        this._negociacaoService.obterNegociacoes(res => {
                if (res.ok) {
                    return res;
                }

                throw new Error(res.statusText);
            })
            .then((negociacoesParaImportar: Negociacao[]) => {
                
                const negociacoesJaImportadas = this._negociacoes.paraArray();
                let importacoes: boolean[] = [];

                negociacoesParaImportar
                .filter(negociacao => !negociacoesJaImportadas.some(jaImportada => jaImportada.ehIgual(negociacao)))
                .forEach(negociacao => importacoes.push(this._negociacoes.adiciona(negociacao)));

                if (importacoes.some(importacao => importacao)) {
                    this._negociacoesView.update(this._negociacoes);
                } else {
                    this._mensagemView.update("Nenhuma nova importação foi realizada!");
                }
            });
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