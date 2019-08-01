import firebase from 'firebase';
import BaseController from './BaseController';
import { ContractModel } from '../Model/Contract';

export class ContractControllerClass extends BaseController {

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
	_CurrentPost: ContractModel = null;


	constructor() {
		super();

		this._Collection = this._DatabaseRef.collection(this.DatabaseCollectionName.Contracts);
	}

	// Precondition: all post data is added through setter
	public async CreateContract(data: ContractModel): Promise<string> {
		console.log("In CreatePost");
		try {
			let postRef = await this._Collection.doc();
			data.id = postRef.id;

			await postRef.set(Object.assign({}, data));

			return data.id;
			
		} catch (error) {

			console.log(error);
			return null;
		}
	}

	public async ReadContract(id: string) {
		try {
			let result = await this._Collection.doc(id).get();

			////console.log(result);
			return result.data() as ContractModel;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	public async UpdateContract(post: ContractModel) {
		console.log("In UpdateContract");
		try {
			let postToUpdate = new ContractModel();
			postToUpdate.Update(post);

			console.log(postToUpdate);
			await this._Collection
				.doc(postToUpdate.id)
				.set(Object.assign({}, postToUpdate));
		} catch (error) {
			console.log(error);
		}
	}

	public async DeleteContract(id: string) {
		console.log("In DeleteContract");
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
			let result = await this._Collection.where("id", "==", id).limit(40).get();
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

	public async GetLatestPosts() {
		console.log("In GetLatestPosts");
		try {
			let result = await this._Collection.orderBy('CreatedAt', 'desc').limit(40).get();
			let data = this.ConvertToPostViewModel(result);
			data = data.sort((a, b) => { return b.CreatedAt.toMillis() - a.CreatedAt.toMillis() });

			console.log("result" + result);
			console.log("----" + data);
			return data;
		} catch (error) {
			//console.log(error);
			return null;
		}

		//return TempLatestPosts;
	}

	public async GetFavoritePosts() {
		////console.log("In GetSavedPost");
		let promises: Promise<firebase.firestore.DocumentSnapshot>[];
		try {
			let favPosts;// = await UserControllerInstance.GetUserSavedPostIDs();
			promises = favPosts.map(id => {
				return this._Collection.doc(id).get();
			});

			let results = await Promise.all(promises);
			let data = results.map(docSnapshot => {
				let temp = docSnapshot.data() as ContractModel;
				return temp;
			});

			return data;
		} catch (e) {
			//console.log(e);
		}
	}

	// Helper
	private ConvertToPostViewModel(result: firebase.firestore.QuerySnapshot) {
		let data = new Array<ContractModel>();
		result.forEach(function (doc) {
			console.log(doc.data());
			let docData = doc.data() as ContractModel;
			// Work around when a post is not correct save to database
			if (docData != null) {
				data.push(doc.data() as ContractModel);
			}
			console.log(docData);
		});
		return data;
	}
}

let PostControllerInstance = new ContractControllerClass();
export default PostControllerInstance;
