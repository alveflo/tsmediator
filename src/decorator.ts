import { Container } from "./container";

export function Handler(message: string) {
    return (target: Function) => {
        Container.Register(message, target);
    };
}
