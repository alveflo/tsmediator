import { Handler, ICommandHandler } from "../src";

@Handler('Simple_Handler')
export default class SimpleHandler implements ICommandHandler<string, string> {
    constructor() {
        console.log('Registering Simple_Handler');
    }

    Log(): void {
        console.log('Logging Simple_Handler');
    }

    Handle(payload: string): string {
        return `handle: ${payload}`;
    }
}
