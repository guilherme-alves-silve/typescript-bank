const HalfSecond = 500;

export function throttle(delay: number = HalfSecond) {

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;

        let timer = 0;
        descriptor.value = function(...args: any[]) {
            if (event) {
                event.preventDefault();
            }

            clearTimeout(timer);
            timer = setTimeout(() => metodoOriginal.apply(this, args), delay);
        }

        return descriptor;
    }
}