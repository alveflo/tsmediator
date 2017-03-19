# TS Mediator

<a href="https://travis-ci.org/alveflo/html5ify"><img src="https://travis-ci.org/alveflo/tsmediator.svg?branch=master"/></a>
<a href="https://www.npmjs.com/package/tsmediator"><img src="https://badge.fury.io/js/tsmediator.svg"/></a>
<a href="https://www.npmjs.com/package/tsmediator"><img src="https://img.shields.io/npm/l/express.svg?maxAge=2592000"/></a>

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
$ npm install && npm test
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
```TypeScript
import { Mediator } from 'tsmediator';
let mediator: Mediator = new Mediator();

mediator.Send(CmdHandler.Type, 5);
mediator.Request(QueryHandler.Type, 'foo bar');
```
## Overriding mediator behaviour
You can easily override the default mediator behaviour by extending the `BaseMediator`. The only thing you need to do is to resolve the registrated handler class by calling `BaseMediator.Resolve(message)`. The message to handler connections are handled under the hood, so you don't need to worry about that at all.
```TypeScript
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
MIT License

Copyright (c) 2017 Victor Alveflo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
