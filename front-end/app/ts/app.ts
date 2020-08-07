import { NegociacaoController } from "./controllers/NegociacaoController";

const controller = new NegociacaoController();
//Usando jQuery
$(".form").submit(controller.adiciona.bind(controller));
$("#botao-importa").click(controller.importaDados.bind(controller));
