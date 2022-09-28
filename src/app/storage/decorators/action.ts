import { cancelable, CancelablePromise } from "cancelable-promise";
import { Module } from "@app/storage/classes/Module";

export const action = (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => CancelablePromise>) => {
    const method = descriptor.value;


    if (!method) {
        throw new Error('@action expects method of type (...args: unknown[]) => Promise<void>');
    }

    descriptor.value = function (this: Module<any, any>, ...args: any[]) {
        const methodPromise = method?.apply(this, args) as unknown as Promise<any>;

        return cancelable(methodPromise);
    }

    return descriptor;
}
