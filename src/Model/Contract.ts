import { BaseModel } from "./Base";

export class ContractModel {
	id: string = "";
	OnwerID: string = null;
	RenterID: string = null;
	PostID: string = null;
	Status: ContactStatusEnum

	public Update(obj: ContractModel) {
		this.id = obj.id;
		this.Status = obj.Status;
		this.OnwerID = obj.OnwerID;
		this.RenterID = obj.RenterID;
		this.PostID = obj.PostID;
	}
}


export enum ContactStatusEnum {
	Pending =  "Pending",
	Rented = "Rented",
	Declined = "Declined"
}