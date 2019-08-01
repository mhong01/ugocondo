import { BaseModel } from "./Base";

export class PostModel extends BaseModel {
	public OwnerID: string = null;
	public PropertyName:  string;
	// public Condition: ConditionEnum = ConditionEnum.Unknown;
	public Description: string;
	public ImageURL: string;
	public Price: string;
	public Unit: string;
	public Address: string;
	public City: string;
	public ProvinceState: string;
	public Country: string;
	public Zip: string;
	public Area: number;
	public NumOfBed: number;
	public NumOfBath: number;
	public NumOfParking: number;
	public ParkingType: string;

	// Deep copy
	public Update(obj: PostModel) {
		super.Update(obj);

		this.PropertyName = (obj.PropertyName != null) ? obj.PropertyName : null;
		this.Unit = (obj.Unit != null) ? obj.Unit : null;
		this.Address = (obj.Address != null) ? obj.Address : null;
		this.City = (obj.City != null) ? obj.City : null;
		this.ProvinceState = (obj.ProvinceState != null) ? obj.ProvinceState : null;
		this.Country = (obj.Country != null) ? obj.Country : null;
		this.Zip = (obj.Zip != null) ? obj.Zip : null;
		this.Area = (obj.Area != null) ? obj.Area : null;
		this.NumOfBed = (obj.NumOfBed != null) ? obj.NumOfBed : null;
		this.NumOfBath = (obj.NumOfBath != null) ? obj.NumOfBath : null;
		this.NumOfParking = (obj.NumOfParking != null) ? obj.NumOfParking : null;
		this.ParkingType = (obj.ParkingType != null) ? obj.ParkingType : null;
		this.Price = (obj.Price != null) ? obj.Price : null;
		this.Description = (obj.Description != null) ? obj.Description : null;
		this.ImageURL = (obj.ImageURL != null) ? obj.ImageURL : null;
	}
}

export class ItemModel {
	public Update(obj: ItemModel) {

	}
}

export class BookModel extends ItemModel{
	public School: string = null;
	public ProgramCode: string = null;
	public ClassCode: string = null;
	public ClassName: string = null;
	public Author: string = null;
	public Isbn: string = null;

	public Update(obj: BookModel) {
		
		this.ProgramCode = (obj.ProgramCode !== "") ? obj.ProgramCode : null;
		this.ClassCode = (obj.ClassCode !== "") ? obj.ClassCode : null;
		this.ClassName = (obj.ClassName !== "") ? obj.ClassName : null;
		this.Author = (obj.Author !== "") ? obj.Author : null;
		this.Isbn = (obj.Isbn !== "") ? obj.Isbn : null;
	}
}

export enum PostStateEnum {
	MarkForDelete = -1,
	Available = 1,
	Rented = 2,
}

export enum ConditionEnum {
	Unknown = -1,
	New = 1,
	LikeNew = 2,
	VeryGood = 3,
	Good = 4,
	Acceptable = 5

}
