import { BaseMediator } from "./baseMediator";
import { IMediatorMiddleware } from "./interfaces";

export class Mediator extends BaseMediator {
    private middlewares: IMediatorMiddleware[] = [];

    public Send(command: string, payload: any): any {
        return this.Process(command, payload);
    }

    public Use(middleware: IMediatorMiddleware): void {
        this.middlewares.push(middleware);
    }

    private Process(msg: string, payload: any): any {
        let handler: any = super.Resolve(msg);
        this.middlewares.forEach(m => m.PreProcess(payload));

        try {
            if(handler.Validate)
                handler.Validate(payload);
        } catch (ex) {
            throw ex;
        }

        if(handler.Log)
            handler.Log();
        
        let response: any = handler.Handle(payload);
        this.middlewares.reverse().forEach(m => m.PostProcess(payload, response));
        return response;
    }
}
