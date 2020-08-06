export function logarTempoDeExecucao(emSegundos: boolean = false) {

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;

        descriptor.value = function(...args: any[]) {

            let unidade = 'ms';
            let divisor = 1;
            if (emSegundos) {
                unidade = 's';
                divisor = 1000;
            }

            console.log("************************");
            
            const begin = performance.now();
            const resultado = metodoOriginal.apply(this, args);
            const end = performance.now();

            console.log(`O tempo de execução do método ${propertyKey} é de ${(end - begin)/divisor}${unidade}`);
            return resultado;
        }

        return descriptor;
    }
}
