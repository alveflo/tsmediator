import { expect } from "chai";
import { Handler, Mediator, IMediatorMiddleware } from "../../lib/index";
import { ICommandHandler } from "../../lib";


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
        return `msg: ${payload}`;
    }
}

let messages: string[] = [];

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
    public PreProcess(): void {
        messages.push("pre process from two");
    }

    public PostProcess(): void {
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

            mediator.RegisterMiddleware(testMiddleware);
            mediator.Send(MiddlewareHandler.Type, "foo bar");

            expect(messages.length).to.equal(2);
            expect(messages[0]).to.equal("pre process from one");
            expect(messages[1]).to.equal("post process from one");
        });

        it(`should run registered middleware in correct order`, () => {
            let testMiddlewareOne: TestMiddlewareOne = new TestMiddlewareOne();
            let testMiddlewareTwo: TestMiddlewareTwo = new TestMiddlewareTwo();

            mediator.RegisterMiddleware(testMiddlewareOne);
            mediator.RegisterMiddleware(testMiddlewareTwo);
            mediator.Send(MiddlewareHandler.Type, "foo bar");

            expect(messages.length).to.equal(4);
            expect(messages[0]).to.equal("pre process from one");
            expect(messages[1]).to.equal("pre process from two");
            expect(messages[2]).to.equal("post process from two");
            expect(messages[3]).to.equal("post process from one");
        });
    });
});