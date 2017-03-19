export namespace Container {
    let container: any = {};

    export function Register(message: string, callback: Function) {
        container[message] = callback;
    }

    export function Get(message): Function {
        if (container.hasOwnProperty(message)) {
            return container[message];
        }

        throw `Handler for '${message}' was not registered!`;
    }
}
