import { PostModel, PostStateEnum } from '../Model/Post';
import UserControllerInstance from './UserController';
import firebase from 'firebase';
import BaseController from './BaseController';

export class PostControllerClass extends BaseController {

	// This is for creating post
	// Do not use except when create a new post
	_CurrentPostID: string = null;
	_NewPostImageBase64: string;
	public set NewPostImageBase64(base64: string) {
		this._NewPostImageBase64 = base64;
	}
	_NewPostPrice: number;
	public set NewPostPrice(price: number) {
		////console.log('NewPostPrice:::::::' + price);
		this._NewPostPrice = price;
	}
	_NewPostTitle: string;
	public set NewPostTitle(title: string) {
		this._NewPostTitle = title;
	}

	// For details view to use
	_CurrentPost: PostModel = null;


	constructor() {
		super();

		this._Collection = this._DatabaseRef.collection(this.DatabaseCollectionName.Posts);
	}

	// Precondition: all post data is added through setter
	public async CreatePost(data: PostModel): Promise<string> {
		console.log("In CreatePost");

		// 1. Create post in db to get id
		let newHouse = new PostModel();
		newHouse.PropertyName = data.PropertyName;
		newHouse.Unit = data.Unit;
		newHouse.Address = data.Address;
		newHouse.City = data.City;
		newHouse.ProvinceState = data.ProvinceState;
		newHouse.Country = data.Country;
		newHouse.Zip = data.Zip;
		newHouse.Area = data.Area;
		newHouse.NumOfBed = data.NumOfBed;
		newHouse.NumOfBath = data.NumOfBath;
		newHouse.NumOfParking = data.NumOfParking;
		newHouse.ParkingType = data.ParkingType;
		newHouse.Price = data.Price;
		newHouse.Description = data.Description;
		newHouse.ImageURL = data.ImageURL;
		newHouse.CreatedAt = firebase.firestore.Timestamp.fromDate(new Date());
		newHouse.UpdatedAt = firebase.firestore.Timestamp.fromDate(new Date());
		newHouse.OwnerID = data.OwnerID;

		try {
			let postRef = await this._DatabaseRef.collection(this.DatabaseCollectionName.Posts).doc();
			newHouse.id = postRef.id;

			await postRef.set(Object.assign({}, newHouse));

			this._CurrentPostID = newHouse.id;
			return newHouse.id;
			
		} catch (error) {

			console.log(error);
			return null;
		}
	}

	public async ReadPost(id: string) {
		try {
			let result = await this._Collection.doc(id).get();
			return result.data() as PostModel;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	public async ReadPostViewModel(id: string) {
		let post = await this.ReadPost(id);
		await UserControllerInstance.ReadUser(post.OwnerID);

		let postViewModelObj = new PostModel();
		postViewModelObj.Update(post);

		return postViewModelObj;
	}

	public async UpdatePost(post: PostModel) {
		console.log("In UpdatePost");
		try {
			let postToUpdate = new PostModel();
			postToUpdate.Update(post);

			console.log(postToUpdate);
			await this._Collection
				.doc(postToUpdate.id)
				.set(Object.assign({}, postToUpdate));
		} catch (error) {
			console.log(error);
		}
	}

	public async DeletePost(id: string) {
		console.log("In DeletePost");
		try {
			await this._Collection
				.doc(id)
				.delete();
		} catch (error) {
			console.log(error);
		}
	}

	// Precondition, this.NewPostImageBase64 is assign with valid and correct
	// base64 image
	private async UploadImage(fileName: string) {
		fileName += '.jpg';

		try {
			const blob = await new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				xhr.onload = function () {
					resolve(xhr.response);
				};
				xhr.onerror = function (e) {
					//console.log(e);
					reject(new TypeError('Network request failed'));
				};
				xhr.responseType = 'blob';
				xhr.open('GET', this._NewPostImageBase64, true);
				xhr.send(null);
			});

			// firebase take file uri
			var fileRef = firebase.storage().ref().child(fileName);
			var metadata = {
				contentType: 'image/jpeg'
			};
			let result = await fileRef.put(blob, metadata);
			// blob.close();

			return await result.ref.getDownloadURL();

		} catch (e) {
			console.log(e);
			return null;
		}
	}

	// Get

	public async GetPostsByUserID(id: string) {
		console.log("In GetPostsByUserID: " + id);
		try {
			let result = await this._Collection.where("OwnerID", "==", id).limit(40).get();
			let data = this.ConvertToPostViewModel(result);
			data = data.sort((a, b) => { return b.CreatedAt.toMillis() - a.CreatedAt.toMillis() });

			console.log("result" + result);
			console.log("----" + data);
			return data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	public async GetPostsByPostID(id: string) {
		console.log("In GetPostsByPostID: " + id);
		try {
			let result = await this._Collection.where("id", "==", id).orderBy('CreatedAt', 'desc').get();
			let data = this.ConvertToPostViewModel(result);

			console.log("result" + result);
			console.log("----" + data);
			return data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	public async GetLatestPosts() {
		console.log("In GetLatestPosts");
		try {
			let result = await this._Collection.orderBy('CreatedAt', 'desc').get();
			let data = this.ConvertToPostViewModel(result);
			// data = data.sort((a, b) => { return b.CreatedAt.toMillis() - a.CreatedAt.toMillis() });

			console.log("result" + result);
			console.log("----" + data);
			return data;
		} catch (error) {
			//console.log(error);
			return null;
		}

		//return TempLatestPosts;
	}

	// Helper
	private ConvertToPostViewModel(result: firebase.firestore.QuerySnapshot) {
		let data = new Array<PostModel>();
		result.forEach(function (doc) {
			// console.log(doc.data());
			let docData = doc.data() as PostModel;
			// Work around when a post is not correct save to database
			if (docData != null) {
				data.push(doc.data() as PostModel);
			}
			// console.log(docData);
		});
		return data;
	}
}

let PostControllerInstance = new PostControllerClass();
export default PostControllerInstance;
