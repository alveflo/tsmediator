export interface ICommandHandler<T, K> {
    Validate: (command: T) => void;
    Handle: (command: T) => K;
    Log: () => void;
}

export interface IMediatorMiddleware {
    PreProcess: (request: any) => void;
    PostProcess: (request: any, response: any) => void;
}