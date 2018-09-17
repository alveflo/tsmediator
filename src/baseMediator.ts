import { Container } from "./container";

export abstract class BaseMediator {
    public abstract Send(command: string, payload: any): any;
    public abstract Request(query: string, payload: any): any;

    protected Resolve(command: string): Function {
        let handlerClass: any = Container.Get(command);
        let handler: any = new handlerClass();

        return handler;
    }
}
