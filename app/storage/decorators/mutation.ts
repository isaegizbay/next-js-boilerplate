import { Module } from "../classes";

export const mutation = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
	const method = descriptor.value;

	descriptor.value = function (this: Module<any, any>, ...args: unknown[]) {
		console.log(this, propertyKey);
		this._dispatch(this._actions[propertyKey](args));
		return method.apply(this, args);
	}

	return descriptor;
}
