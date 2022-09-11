import BaseSchema from 'yup/lib/schema';

export class FieldYupValidation<T> {
	private schema: BaseSchema<T>;
	isValid: boolean = true;
	isTouched: boolean = false;
	errorMessage: {
		msg: string;
		options: any;
	} = {
		msg: '',
		options: undefined
	};

	constructor(schema: BaseSchema<T>) {
		this.schema = schema;
	}

	setIsTouched(isTouched: boolean) {
		this.isTouched = isTouched;
	}

	setIsValid(isValid: boolean) {
		this.isValid = isValid;
	}

	async validate(value: T) {
		try {
			await this.schema.validate(value);
			this.setIsValid(true);
			return true;
		} catch (error: any) {
			if (error?.errors?.[0]) {
				this.setIsValid(false);
				this.errorMessage = error.errors[0];
				return false;
			}
			throw error;
		}
	}
}
