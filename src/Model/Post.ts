import { BaseModel } from "./Base";

export class PostModel extends BaseModel {
	public Title: string;
	public OwnerID: string = null;
	public Description: string = null;
	public Price: number;
	public Media: string = null;
	public IsNegotiable: boolean = false;
	public State: number = PostStateEnum.Selling;
	public Condition: ConditionEnum = ConditionEnum.Unknown;

	public Item: ItemModel = null;

	// Deep copy
	public Update(obj: PostModel) {
		super.Update(obj);

		this.Title = (obj.Title != "") ? obj.Title : null;
		this.OwnerID = (obj.OwnerID != "") ? obj.OwnerID : null;
		this.Description = (obj.Description != "")? obj.Description : null;
		this.Price = (obj.Price != null) ? obj.Price : null;
		this.Media = (obj.Media != null) ? obj.Media : null;
		this.IsNegotiable = (obj.IsNegotiable != null) ? obj.IsNegotiable : null;
		this.State = (obj.State != null) ? obj.State : null;
		this.Item = (obj.Item != null) ? obj.Item : null;
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
		
		this.ProgramCode = (obj.ProgramCode != "") ? obj.ProgramCode : null;
		this.ClassCode = (obj.ClassCode != "") ? obj.ClassCode : null;
		this.ClassName = (obj.ClassName != "") ? obj.ClassName : null;
		this.Author = (obj.Author != "") ? obj.Author : null;
		this.Isbn = (obj.Isbn != "") ? obj.Isbn : null;
	}
}

export enum PostStateEnum {
	MarkForDelete = -1,
	Selling = 1,
	Sold = 2,
}

export enum ConditionEnum {
	Unknown = -1,
	New = 1,
	LikeNew = 2,
	VeryGood = 3,
	Good = 4,
	Acceptable = 5

}