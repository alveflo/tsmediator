import { ICommandHandler, IQueryHandler, Mediator } from '../src/index';
import { Handler } from '../src/index';
import { expect } from 'chai';

@Handler(CmdHandler.Type)
class CmdHandler implements ICommandHandler<string, string> {
    public static get Type():string { return "cmdMsg"; }

    Log() {}

    Validate(payload: string) {
        if (payload !== 'foo bar') {
            throw Error('Unsupported');
        }
    }

    Handle(payload: string) {
        return `msg: ${payload}`;
    }
}    

@Handler(QueryHandler.Type)
class QueryHandler implements ICommandHandler<string, string> {
    public static get Type():string { return "queryMsg"; }

    Log() {}

    Validate(payload: string) {
        if (payload !== 'foo bar') {
            throw Error('Unsupported');
        }
    }

    Handle(payload: string) {
        return `msg: ${payload}`;
    }
}    

describe('Mediator', () => {
    var mediator : Mediator;

    beforeEach(() => {
        mediator = new Mediator();
    });

    describe('CommandHandler', () => {
        it('should return "msg: {message}" where message = "foo bar"', () => {
            let result : string = mediator.Send(CmdHandler.Type, 'foo bar');
            expect(result).to.equal('msg: foo bar');
        });

        it('should throw exception', () => {
            let thrown: boolean = false;
            try {
                mediator.Send(CmdHandler.Type, 'baz');
            } catch (ex) {
                thrown = true;
            }
            expect(thrown).to.equal(true);
        });
    });

    describe('QueryHandler', () => {
        it('should return "msg: {message}" where message = "foo bar"', () => {
            let result : string = mediator.Request(QueryHandler.Type, 'foo bar');
            expect(result).to.equal('msg: foo bar');
        });

        it('should throw exception', () => {
            let thrown: boolean = false;
            try {
                mediator.Request(QueryHandler.Type, 'baz')
            } catch (ex) {
                thrown = true;
            }
            expect(thrown).to.equal(true);
        });
    });
})