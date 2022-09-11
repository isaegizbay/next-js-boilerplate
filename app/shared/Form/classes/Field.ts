import { FieldInputTypes } from '../enums';
import { FieldYupValidation } from '../classes/';

export class Field<T = any> {
	name: string;
	label: string;
	initialValue: T;
	value: T;
	type: FieldInputTypes;
	options?: { id: string; value: T; label: string }[];
	checkboxItems?: T;
	validation?: FieldYupValidation<T | undefined>;
	column?: {
		ifFull?: boolean;
		offset?: number;
		size: number;
	};

	constructor(data: Field<T>) {
		if (data.type === FieldInputTypes.SELECT && !data.options) {
			throw new Error('options must be provided when field type is SELECT');
		}

		if (data.type === FieldInputTypes.CHECKBOX_GROUP && !data.checkboxItems) {
			throw new Error(
				'checkboxItems must be provided when field type is CHECKBOX_GROUP'
			);
		}
		this.name = data.name;
		this.label = data.label;
		this.initialValue = data.initialValue;
		this.value = data.value;
		this.type = data.type;
		this.options = data.options;
		this.checkboxItems = data.checkboxItems;
		this.validation = data.validation;
		this.column = data.column;
	}
}
