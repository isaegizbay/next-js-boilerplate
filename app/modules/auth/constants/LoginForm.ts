import * as Yup from 'yup';
import { Field, FieldYupValidation, Form } from 'app/shared/Form/classes';
import type { LoginPayload } from 'app/modules/auth/types';
import { FieldInputTypes } from 'app/shared/Form/enums';

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
