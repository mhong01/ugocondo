import firebase from 'firebase';

export class BaseModel {
	public id: string = null;
	public CreatedAt: firebase.firestore.Timestamp;
	public UpdatedAt: firebase.firestore.Timestamp;

	public MakedForDelete: boolean = false;

	public Update(obj: BaseModel) {
		this.id = obj.id;
		this.CreatedAt = firebase.firestore.Timestamp.fromDate(new Date());
		this.UpdatedAt = firebase.firestore.Timestamp.fromDate(new Date());
		this.MakedForDelete = obj.MakedForDelete;
	}
}