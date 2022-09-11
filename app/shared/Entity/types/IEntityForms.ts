import { Form } from '@app/shared/Form/classes/Form';
import type { IEntity } from '@app/shared/Entity/types/IEntity';

export interface IEntityForms<C, U> {
	getCreateEntityForm(): Form<C>;
	getEditEntityForm(data: IEntity): Form<U>;
}
