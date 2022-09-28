import * as Yup from 'yup';
import type { LoginPayload } from "@app/modules/auth/types/LoginPayload";
import { Form } from "@app/shared/Form/classes/Form";
import { Field } from "@app/shared/Form/classes/Field";
import { FieldInputTypes } from "@app/shared/Form/enums/FieldInputTypes";
import { FieldYupValidation } from "@app/shared/Form/classes/FieldYupValidation";

export const loginForm = new Form<LoginPayload>([
	new Field<string>({
		name: 'email',
		label: 'loginForm.emailLabel',
		initialValue: '',
		value: '',
		type: FieldInputTypes.TEXT,
		validation: new FieldYupValidation<string | undefined>(
			Yup.string()
				.trim()
				.required({ msg: 'loginForm.errors.required' })
				.email({ msg: 'loginForm.errors.validInput' })
		)
	}),

	new Field<string>({
		name: 'password',
		label: 'loginForm.passwordLabel',
		initialValue: '',
		value: '',
		type: FieldInputTypes.PASSWORD,
		validation: new FieldYupValidation<string | undefined>(
			Yup.string()
				.trim()
				.required({ msg: 'loginForm.errors.required' })
				.min(8, {
					msg: 'loginForm.errors.passwordLength',
					options: {
						l: 8
					}
				})
		)
	})
]);
