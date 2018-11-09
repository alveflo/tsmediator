///<reference path="../node_modules/@types/node/index.d.ts"/>
///<reference path="../node_modules/@types/chai/index.d.ts"/>
///<reference path="../node_modules/@types/mocha/index.d.ts"/>

import { ICommandHandler, Mediator } from "../lib/index";
import { Handler } from "../lib/index";
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
})