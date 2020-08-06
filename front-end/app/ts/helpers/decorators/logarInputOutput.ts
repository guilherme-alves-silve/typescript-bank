export function logarInputOutput(imprimeInput: boolean = true, imprimeOutput = true) {

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;

        descriptor.value = function(...args: any[]) {

            if (imprimeInput) {
                console.log("************************");
                console.log(`Parâmetros passados para o método ${propertyKey}: ${JSON.stringify(args)}`);
            }

            const resultado = metodoOriginal.apply(this, args);

            if (imprimeOutput) {
                console.log(`O retorno do método ${propertyKey}: ${JSON.stringify(resultado)}`);
            }

            return resultado;
        }

        return descriptor;
    }
}