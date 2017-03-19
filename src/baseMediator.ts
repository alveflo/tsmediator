import { Container } from "./container";

export abstract class BaseMediator {
    public abstract Send(command: string, payload: any);
    public abstract Request(query: string, payload: any);

    protected Resolve(command: string): Function {
        let handlerClass: any = Container.Get(command);
        let handler = new handlerClass();

        return handler;
    }
}
