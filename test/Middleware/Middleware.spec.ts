import { expect } from "chai";
import { Handler, Mediator, IMediatorMiddleware, ICommandHandler } from "../../src";

let messages: string[] = [];

@Handler(MiddlewareHandler.Type)
class MiddlewareHandler implements ICommandHandler<string, string> {
    public static get Type():string { return "middleware"; }

    Log(): void { }

    Validate(payload: string): void {
        if (payload !== "foo bar") {
            throw Error("Unsupported");
        }
    }

    Handle(payload: string): string {
        messages.push("handler");
        return `msg: ${payload}`;
    }
}

class TestMiddlewareOne implements IMediatorMiddleware {
    public PreProcess(): void {
        messages.push("pre process from one");
    }

    public PostProcess(): void {
        messages.push("post process from one");
    }
}

class TestMiddlewareTwo implements IMediatorMiddleware {
    public messages: string[] = [];
    public PreProcess(request: any): void {
        messages.push("pre process from two");
    }

    public PostProcess(request: any, response: any): void {
        messages.push("post process from two");
    }
}

describe("Mediator", () => {
    var mediator : Mediator;

    beforeEach(() => {
        mediator = new Mediator();
        messages = [];
    });

    describe("Mediator", () => {
        it(`should run registered middleware`, () => {
            let testMiddleware: TestMiddlewareOne = new TestMiddlewareOne();

            mediator.Use(testMiddleware);
            mediator.Send(MiddlewareHandler.Type, "foo bar");

            expect(messages.length).to.equal(3);
            expect(messages[0]).to.equal("pre process from one");
            expect(messages[1]).to.equal("handler");
            expect(messages[2]).to.equal("post process from one");
        });

        it(`should run registered middleware in correct order`, () => {
            let testMiddlewareOne: TestMiddlewareOne = new TestMiddlewareOne();
            let testMiddlewareTwo: TestMiddlewareTwo = new TestMiddlewareTwo();

            mediator.Use(testMiddlewareOne);
            mediator.Use(testMiddlewareTwo);
            mediator.Send(MiddlewareHandler.Type, "foo bar");

            expect(messages.length).to.equal(5);
            expect(messages[0]).to.equal("pre process from one");
            expect(messages[1]).to.equal("pre process from two");
            expect(messages[2]).to.equal("handler");
            expect(messages[3]).to.equal("post process from two");
            expect(messages[4]).to.equal("post process from one");
        });
    });
});