import { logarTempoDeExecucao } from "../helpers/decorators/index";
import { View } from "./View";

export class MensagemView extends View<string> {

    @logarTempoDeExecucao()
    update(mensagem: string): void {
        super.update(mensagem);
        setTimeout(() => super.emptyElement(), 3000);
    }

     template(mensagem: string): string {
        return `<p class="alert alert-info">${mensagem}</p>`;
    }
}