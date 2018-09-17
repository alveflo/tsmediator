import { Container } from "./container";

export function Handler(message: string): (target: Function) => void {
    return (target: Function) => {
        Container.Register(message, target);
    };
}
