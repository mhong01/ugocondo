import { BaseModel } from "./Base";

export class ContractModel extends BaseModel {
	OnwerID: string = null;
	RenterID: string = null;
	Status: ContactStatusEnum
}

export enum ContactStatusEnum {
	Pending =  "Pending",
	Rented = "Rented",
	Declined = "Declined"
}