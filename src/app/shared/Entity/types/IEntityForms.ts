import type { AnyObject } from "@app/utils/types/AnyObject";
import type { IEntity } from "@app/shared/Entity/types/IEntity";
import { Form } from "@app/shared/Form/classes/Form";

export interface IEntityForms<C extends AnyObject, U extends AnyObject> {
	getCreateEntityForm(): Form<C>;
	getEditEntityForm(data: IEntity): Form<U>;
}
