import * as Yup from 'yup';
import type { IEntityForms } from "@app/shared/Entity/types/IEntityForms";
import type { CreateMemberPayload } from "@app/modules/member/types/CreateMemberPayload";
import type { UpdateMemberPayload } from "@app/modules/member/types/UpdateMemberPayload";
import { Form } from "@app/shared/Form/classes/Form";
import { Field } from "@app/shared/Form/classes/Field";
import { FieldInputTypes } from "@app/shared/Form/enums/FieldInputTypes";
import { FieldYupValidation } from "@app/shared/Form/classes/FieldYupValidation";
import { UserTypes } from "@app/shared/User/enums/UserTypes";
import { Member } from "@app/modules/member/models/Member.model";

export class MemberForms
	implements IEntityForms<CreateMemberPayload, UpdateMemberPayload>
{
	getCreateEntityForm(): Form<CreateMemberPayload> {
		return new Form<CreateMemberPayload>([
			new Field<string>({
				name: 'email',
				label: 'member.form.emailLabel',
				initialValue: '',
				value: '',
				type: FieldInputTypes.TEXT,
				column: {
					size: 6
				},
				validation: new FieldYupValidation<string | undefined>(
					Yup.string()
						.trim()
						.required({ msg: 'member.form.errors.required' })
						.email({ msg: 'member.form.errors.validInput' })
				)
			}),
			new Field<UserTypes>({
				name: 'userType',
				label: 'member.form.userTypeLabel',
				initialValue: UserTypes.GUEST,
				value: UserTypes.GUEST,
				type: FieldInputTypes.SELECT,
				options: [
					{
						id: UserTypes.GUEST,
						value: UserTypes.GUEST,
						label: `user.${UserTypes.GUEST}`
					},
					{
						id: UserTypes.DEVELOPER,
						value: UserTypes.DEVELOPER,
						label: `user.${UserTypes.DEVELOPER}`
					},
					{
						id: UserTypes.MAINTAINER,
						value: UserTypes.MAINTAINER,
						label: `user.${UserTypes.MAINTAINER}`
					}
				],
				column: {
					size: 6
				}
			}),
			new Field<string>({
				name: 'firstName',
				label: 'member.form.firstNameLabel',
				initialValue: '',
				value: '',
				column: {
					size: 6
				},
				type: FieldInputTypes.TEXT,
				validation: new FieldYupValidation<string | undefined>(
					Yup.string().trim().required({ msg: 'member.form.errors.required' })
				)
			}),
			new Field<string>({
				name: 'lastName',
				label: 'member.form.lastNameLabel',
				initialValue: '',
				value: '',
				column: {
					size: 6
				},
				type: FieldInputTypes.TEXT,
				validation: new FieldYupValidation<string | undefined>(
					Yup.string().trim().required({ msg: 'member.form.errors.required' })
				)
			})
		]);
	}

	getEditEntityForm(data: Member): Form<UpdateMemberPayload> {
		return new Form<UpdateMemberPayload>([
			new Field<string>({
				name: 'email',
				label: 'member.form.emailLabel',
				initialValue: data.email,
				value: data.email,
				type: FieldInputTypes.TEXT,
				column: {
					size: 6
				},
				validation: new FieldYupValidation<string | undefined>(
					Yup.string()
						.trim()
						.required({ msg: 'member.form.errors.required' })
						.email({ msg: 'member.form.errors.validInput' })
				)
			}),
			new Field<UserTypes>({
				name: 'userType',
				label: 'member.form.userTypeLabel',
				initialValue: data.userType,
				value: data.userType,
				type: FieldInputTypes.SELECT,
				options: [
					{
						id: UserTypes.GUEST,
						value: UserTypes.GUEST,
						label: `user.${UserTypes.GUEST}`
					},
					{
						id: UserTypes.DEVELOPER,
						value: UserTypes.DEVELOPER,
						label: `user.${UserTypes.DEVELOPER}`
					},
					{
						id: UserTypes.MAINTAINER,
						value: UserTypes.MAINTAINER,
						label: `user.${UserTypes.MAINTAINER}`
					}
				],
				column: {
					size: 6
				}
			}),
			new Field<string>({
				name: 'firstName',
				label: 'member.form.firstNameLabel',
				initialValue: data.firstName,
				value: data.firstName,
				column: {
					size: 6
				},
				type: FieldInputTypes.TEXT,
				validation: new FieldYupValidation<string | undefined>(
					Yup.string().trim().required({ msg: 'member.form.errors.required' })
				)
			}),
			new Field<string>({
				name: 'lastName',
				label: 'member.form.lastNameLabel',
				initialValue: data.lastName,
				value: data.lastName,
				column: {
					size: 6
				},
				type: FieldInputTypes.TEXT,
				validation: new FieldYupValidation<string | undefined>(
					Yup.string().trim().required({ msg: 'member.form.errors.required' })
				)
			})
		]);
	}
}
