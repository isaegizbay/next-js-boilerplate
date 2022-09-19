import { Module } from "../classes";

export const mutation = (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => void | undefined>) => {
	const method = descriptor.value;

	if (!method) {
		throw new Error('@mutation expects method of type (...args: unknown[]) => void');
	}

	descriptor.value = function (this: Module<any, any>, ...args: any[]) {
		this._dispatch(this._actions[propertyKey](...args));
		return method.apply(this, args);
	}

	return descriptor;
}
