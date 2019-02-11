import { IContainer, ICommandHandler } from "./interfaces";

export namespace Container {
    const container: IContainer = {
        handlers: {},
        registeredHandlers: {}
    };

    export function Register(message: string, callback: Function): void {
        container.handlers[message] = callback;
    }

    export function Get(message: string): Function {
        if (container.handlers.hasOwnProperty(message)) {
            return container.handlers[message];
        }

        throw `Handler for '${message}' was not registered!`;
    }

    // TODO: Receive ICommandHandler
    export function RegisterHandler<T>(handler: { new (): T }): void {
        container.registeredHandlers[handler.prototype.name] = handler;
    }
}
