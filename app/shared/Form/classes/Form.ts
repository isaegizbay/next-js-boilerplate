import { Field } from 'app/shared/Form/classes/';
import { AnyObject } from 'app/utils/types';

export class Form<P extends AnyObject> {
	fields: Field<P[keyof P]>[];

	constructor(fields: Field<P[keyof P]>[]) {
		this.fields = fields;
	}

	get payload(): P {
		return this.fields.reduce((payload: P, field) => {
			const fieldName = field.name as keyof P;
			payload[fieldName] = field.value;
			return payload;
		}, {} as P);
	}

	async validateField(value: P[keyof P], fieldName: keyof P) {
		const field = this.fields.find((field) => field.name === fieldName);
		if (!field) {
			throw new Error(`field ${String(fieldName)} not found`);
		}

		if (!field.validation) {
			return true;
		}

		return await field.validation.validate(value);
	}

	async validateForm() {
		try {
			const fieldsValidationResult = await Promise.all(
				Object.keys(this.payload)
					.map((key) => key as keyof P)
					.map((fieldName) => {
						return this.validateField(this.payload[fieldName], fieldName);
					})
			);

			return !fieldsValidationResult.includes(false);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Form validation failed');
			throw error;
		}
	}

	async onSubmit(callback: () => void): Promise<void> {
		try {
			const isFormValid = await this.validateForm();
			if (isFormValid) {
				callback();
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Form submission failed: ', error);
		}
	}

	getFieldByName(fieldName: string) {
		const field = this.fields.find((field) => field.name === fieldName);
		if (!field) {
			throw new Error(`field ${fieldName} not found in form fields`);
		}
		return field;
	}

	clearForm() {
		this.fields.forEach((field) => {
			field.value = field.initialValue;
			field.validation?.setIsValid(true);
			field.validation?.setIsTouched(false);
		});
	}
}
