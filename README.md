# TS Mediator
Tiny flexible mediator implemented in TypeScript

# Installation
## Production
```
$ npm install --save tsmediator
```

## Development
```
$ git clone https://github.com/alveflo/tsmediator.git
$ cd tsmediator
$ npm test
```

# Usage
## Setup
No setup is required per se, other than registrating handlers for specific messages (commands/queries). However, this implemented relies on ES7 decorators and therefore `experimentalDecorators` needs to be set to `true` in your `tsconfig.json` file.

## API
`Mediator`
- `Mediator.Send(type: string, payload: T)` where `type` is the registrated message type and payload is the data sent, where `T` is the datatype that the handler is expected to process.
- `Mediator.Request(type: string, payload: T)` where `type` is the registrated message type and payload is the data sent, where `T` is the datatype that the handler is expected to process.

## Registrating handlers
Registrating a handler is easy, simple add the decorator `Handler(message)` onto your class, and implement the `ICommand`/`IQuery` interface and you're ready to roll.
### Command handler example
```TypeScript
import { ICommandHandler, Handler } from 'tsmediator';

@Handler(CmdHandler.Type)
class CmdHandler implements ICommandHandler<string, number> {
    public static get Type():string { return "foo"; }

    Log() {}

    Validate(payload: string) {
        if (payload !== 'foo bar') {
            throw Error('Some error');
        }
    }

    Handle(payload: number) {
        return 5 * 5;
    }
}    
```

### Query handler example
```TypeScript
import { IQueryHandler, Handler } from 'tsmediator';

@Handler(QueryHandler.Type)
class QueryHandler implements IQueryHandler<string, string> {
    public static get Type():string { return "bar"; }

    Log() {

    }

    Validate(payload: string) {
        if (payload !== 'foo bar') {
            throw Error('Some error');
        }
    }

    Handle(payload: string) {
        return `msg: ${payload}`;
    }
}
```
## Send/request example
The following example shows how you would send a command and/or request a query into the registrated handlers above.
```
import { Mediator } from 'tsmediator';
let mediator: Mediator = new Mediator();

mediator.Send(CmdHandler.Type, 5);
mediator.Request(QueryHandler.Type, 5);
```
## Overriding mediator behaviour
You can easily override the default mediator behaviour by extending the `BaseMediator`. The only thing you need to do is to resolve the registrated handler class by calling `BaseMediator.Resolve(message)`. The message to handler connections are handled under the hood, so you don't need to worry about that at all.
```
import { BaseMediator } from "./baseMediator";

export class MyCustomMediator extends BaseMediator {
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
```

# Licence
MIT
