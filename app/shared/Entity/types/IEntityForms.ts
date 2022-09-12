import { Form } from 'app/shared/Form/classes';
import type { IEntity } from './IEntity';
import { AnyObject } from 'app/utils/types';

export interface IEntityForms<C extends AnyObject, U extends AnyObject> {
	getCreateEntityForm(): Form<C>;
	getEditEntityForm(data: IEntity): Form<U>;
}
