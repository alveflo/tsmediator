import { BaseMediator } from "./baseMediator";
import { IMediatorMiddleware } from "./interfaces";

export class Mediator extends BaseMediator {
    private middlewares: IMediatorMiddleware[] = [];

    public Send(command: string, payload: any): any {
        return this.Process(command, payload);
    }

    public Request(query: string, payload: any): any {
        return this.Process(query, payload);
    }

    public RegisterMiddleware(middleware: IMediatorMiddleware): void {
        this.middlewares.push(middleware);
    }

    private Process(msg: string, payload: any): any {
        let handler: any = super.Resolve(msg);

        try {
            this.middlewares.forEach(m => m.PreProcess());
            handler.Validate(payload);
            this.middlewares.reverse().forEach(m => m.PostProcess());
        } catch (ex) {
            throw ex;
        }

        handler.Log();
        return handler.Handle(payload);
    }
}
