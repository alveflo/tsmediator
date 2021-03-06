///<reference path="../node_modules/@types/node/index.d.ts"/>
///<reference path="../node_modules/@types/chai/index.d.ts"/>
///<reference path="../node_modules/@types/mocha/index.d.ts"/>

import { ICommandHandler, Mediator, Handler } from "../src";
import { expect } from "chai";

@Handler(CmdHandler.Type)
class CmdHandler implements ICommandHandler<string, string> {
    public static get Type():string { return "cmdMsg"; }

    Log(): void {}

    Validate(payload: string): void {
        if (payload !== "foo bar") {
            throw Error("Unsupported");
        }
    }

    Handle(payload: string): string {
        return `msg: ${payload}`;
    }
}

@Handler(CmdHandlerOptionalProps.Type)
class CmdHandlerOptionalProps implements ICommandHandler<string, string> {
    public static get Type():string { return "cmdMsgOptionalProps"; }

    Handle(payload: string): string {
        return `msg: optional props ${payload}`;
    }
}

describe("Mediator", () => {
    var mediator : Mediator;

    beforeEach(() => {
        mediator = new Mediator();
    });

    describe("CommandHandler", () => {
        it(`should return "msg: {message}" where message = "foo bar"`, () => {
            let result : string = mediator.Send(CmdHandler.Type, "foo bar");
            expect(result).to.equal("msg: foo bar");
        });

        it("should throw exception", () => {
            let thrown: boolean = false;
            try {
                mediator.Send(CmdHandler.Type, "baz");
            } catch (ex) {
                thrown = true;
            }
            expect(thrown).to.equal(true);
        });
    });

    describe("CommandHandlerOptionalProps", () => {
        it(`should return handle even if Log or Payload are not present`, () => {
            let result : string = mediator.Send(CmdHandlerOptionalProps.Type, "foo bar");
            expect(result).to.equal("msg: optional props foo bar");
        });
    });
    
})