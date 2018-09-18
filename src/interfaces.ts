export interface ICommandHandler<T, K> {
    Validate: (command: T) => void;
    Handle: (command: T) => K;
    Log: () => void;
}

export interface IQueryHandler<T, K> {
    Validate: (query: T) => void;
    Handle: (query: T) => K;
    Log: () => void;
}

export interface IMediatorMiddleware {
    PreProcess: (request: any) => void;
    PostProcess: (request: any, response: any) => void;
}