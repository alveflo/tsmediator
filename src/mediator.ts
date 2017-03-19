import { BaseMediator } from "./baseMediator";

export class Mediator extends BaseMediator {
    public Send(command: string, payload: any) {
        return this.Process(command, payload);
    }

    public Request(query: string, payload: any) {
        return this.Process(query, payload);
    }

    private Process(msg: string, payload: any) {
        let handler: any = super.Resolve(msg);

        try {
            handler.Validate(payload);
        } catch (ex) {
            throw ex;
        }

        handler.Log();
        return handler.Handle(payload);
    }
}
