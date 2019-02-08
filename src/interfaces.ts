export interface ICommandHandler<T, K> {
    Validate?: (command: T) => void;
    Handle: (command: T) => K;
    Log?: () => void;
}

export interface IMediatorMiddleware {
    PreProcess: (request: any) => void;
    PostProcess: (request: any, response: any) => void;
}

// TODO: Proper types
type IHandler = Function;
type IRegisteredHandler = Function;

export interface IContainer {
    readonly handlers: { [id: string]: IHandler},
    readonly registeredHandlers: { [id: string]: IRegisteredHandler }
}