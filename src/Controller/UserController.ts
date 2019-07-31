import { UserModel } from '../Model/User';
import { AsyncStorageHelper } from '../AsyncStorageHelper';
import BaseController from './BaseController';
import firebase from 'firebase';
import { ConfigurationConstants } from '../configure';

export class UserController extends BaseController {
	private _AuthRef = firebase.auth();
	private _EmailRegex: RegExp;
	public _IsSignedIn: boolean = false;

	public _User: UserModel;
	private _UserPassword: string;

	public IsLinkedWithFacebook() {
		get: {
			let providerData = this._AuthRef.currentUser.providerData;
			for (let i = 0; i < providerData.length; i++) {
				////console.log(providerData);
				if (providerData[i].providerId === "facebook.com") return true;
			}

			return false;
		}
	}

	public get UserEmail() {
		return this._User.Email;
	}

	public get UserID() {
		return this._User.id;
	}

	constructor() {
		super();
		this._Collection = this._DatabaseRef.collection(this.DatabaseCollectionName.Users);
	}

	async OnAuthStateChanged(user: firebase.User) {
		if (user) {
			this._IsSignedIn = true;
			this._User = await this.ReadUser(user.uid);
		} else {
			this._IsSignedIn = false;
			this._User = null;
		}
	}

	public async CreateUser(user: UserModel) {
		////console.log("In CreateUser");
		try {
			let userRef = await this._DatabaseRef.collection(this.DatabaseCollectionName.Users).doc();
			user.id = userRef.id;

			await userRef.set(Object.assign({}, user));

			//console.log(result);
			//console.log("Create User Success")

			return this._User.id;
		} catch (error) {
			console.log("Error confirm");
			console.log(error);
			return null;
		}
	}

	public async ReadUser(id: string) {
		//console.log("In ReadUser");

		try {
			let result = await this._Collection.doc(id).get();
			let data = result.data() as UserModel;
			return data;

		} catch (e) {
			//console.log(e);
			return null;
		}
	}

	public async UpdateUser(user: UserModel) {
		//console.log("In UpdateUser");
		try {
			let result = await this._Collection.doc(UserControllerInstance.UserID).set(Object.assign({}, user));
			this._User = user;
		} catch (e) {
			//console.log(e);
		}
	}

	public GetUser(): UserModel {
		return this._User;
	}

	//Post: update Email if success
	// public async SignUpUser(email: string, password: string) {
	public async SignUpUser(_user: UserModel) {
		console.log("In SignUpUser");
		let email = _user.Email;
		email = email.trim();
		let password = _user.Password;

		// Add User to Cognito Pool
		try {
			// let signUpResult = await firebase.auth().createUserWithEmailAndPassword(email, password);
			let user = this._DatabaseRef.collection(this.DatabaseCollectionName.Users).doc();

			// var user = firebase.auth().currentUser;
			// await user.sendEmailVerification();

			////console.log(signUpResult);
			this._User = new UserModel();
			this._User.Email = email;
			this._User.Password = password;
			this._User.Fullname = _user.Fullname;
			this._User.id = user.id;
			console.log(this._User);
			// this._User.ProfileImage = this.GetUserTempProfileImage(this._User.id);

			// this.CreateUserInDB();
			// let postRef = await this._DatabaseRef.collection(this.DatabaseCollectionName.Users).doc();
			// this._User.id = postRef.id;

			await user.set(Object.assign({}, this._User));
			return SignUpEnum.Success;

		} catch (error) {
			//console.log("error: " + error);
			//console.log("error.code: " + error.code);
			if (error.code != null) {
				switch (error.code) {
					case 'auth/email-already-in-use':
						return SignUpEnum.UsernameExistsException;
					case 'auth/weak-password':
						return SignUpEnum.InvalidPasswordException;
					case 'InvalidParameterException':
						return SignUpEnum.InvalidParameterException;
					default:
						return SignUpEnum.UnKnownError;
				}
			}
			return SignUpEnum.UnKnownError;
		}
	}

	// Only call once after confirmation to get new userid
	public async CreateUserInDB() {
		console.log("In CreateUserInDB");
		try {
			let result = await this._DatabaseRef.collection(this.DatabaseCollectionName.Users)
				.doc(this._User.id)
				.set(Object.assign({}, this._User));

			console.log(result);
			//console.log("Create User Success")
			return this._User.id;
		} catch (error) {
			//console.log("Error confirm");
			//console.log(error);
			return null;
		}
	}

	public async SignInUser(email: string, password: string) {
		//console.log('In SignInUser');
		try {
			let result = await this._Collection.where("Email", "==", email).get();
			let data = result.docs[0].data() as UserModel;

			this._User = data;
			this._IsSignedIn = true;
			console.log("result" + result);
			console.log("----" + data);
			return data;

		} catch (error) {
			
			return null;
		}
	}

	public async SignInUnauthenticatedUser() {
		this._IsSignedIn = false;

		try {
			//console.log('In SignInUnauthenticatedUser');
			let signInResult = await firebase.auth().signInAnonymously();
			return SignInEnum.Success;

		} catch (error) {
			//console.log('In SignInUnauthenticatedUser error');
			//console.log("error: " + error);
			//console.log("error.code: " + error.code);

			if (error.code != null) {
				switch (error.code) {
					case 'NotAuthorizedException':
						return SignInEnum.NotAuthorizedException;
					default:
						return SignInEnum.UnKnownError;
				}
			}
			return SignInEnum.UnKnownError;
		}
	}

	public async SignInWithFacebook() {
		//console.log("In SignInWithFacebook");

		let result = await this.GetFacebookPermission();
		let facebookProfileData: firebase.auth.UserCredential;

		try {
			switch (result.Type) {
				case 'success': {
					await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
					const credential = firebase.auth.FacebookAuthProvider.credential(result.Token);
					facebookProfileData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);  // Sign in with Facebook credential

					this._User = new UserModel();
					this._User.Email = facebookProfileData.user.email;
					this._User.id = facebookProfileData.user.uid;
					// this._User.ProfileImage = facebookProfileData.user.providerData[0].photoURL;
					this._User.Fullname = (facebookProfileData.additionalUserInfo.profile as any).first_name +
						(facebookProfileData.additionalUserInfo.profile as any).last_name;

					await this.CreateUser(this._User);

					return SignInEnum.Success;
				}
				case 'cancel': {
					return SignInEnum.NotAuthorizedException;
				}
			}
		} catch (e) {
			//console.log(e);
			//console.log(e.code);
			//console.log(e.message);
			//console.log(e.email);
			//console.log(e.credential);

			if (!this.IsNull(this._AuthRef.currentUser)) {
				this._AuthRef.currentUser.delete();
			}

			if (e.code == "auth/account-exists-with-different-credential") {
				if (facebookProfileData == null) return SignInEnum.AccountExistInAnotherAuthProvider;
			}

			return SignInEnum.NotAuthorizedException;
		}
	}

	public async LinkAccountWithFacebook() {
		//console.log("In LinkAccountWithFacebook");
		try {
			let result = await this.GetFacebookPermission();

			switch (result.Type) {
				case 'success': {
					const credential = firebase.auth.FacebookAuthProvider.credential(result.Token);
					const facebookProfileData = await firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential);
					// Do something with Facebook profile data
					// OR you have subscribed to auth state change, authStateChange handler will process the profile data
					return true;
				}
				case 'cancel': {
					return false
				}
			}
		} catch (e) {
			//console.log(e);
			//console.log(e.code);
			//console.log(e.message);
			//console.log(e.email);
			//console.log(e.credential);
			return false;
		}

	}

	private async GetFacebookPermission() {
		const appId = ConfigurationConstants.Facebook.FacebookAppID;
		const permissions = ['public_profile', 'email'];  // Permissions required, consult Facebook docs

		// const {
		// 	type,
		// 	token,
		// } = await Facebook.logInWithReadPermissionsAsync(
		// 	appId,
		// 	{ permissions }
		// );

		// let result: FacebookPermissionResult = {
		// 	Type: type,
		// 	Token: token
		// }

		//return result;
		return null;
	}

	public async SignOutUser() {
		try {
			let result = await firebase.auth().signOut();

			this._IsSignedIn = false;
			AsyncStorageHelper.SetIsUserLoggedIn(this._IsSignedIn);
			AsyncStorageHelper.SetUserEmail("");
			AsyncStorageHelper.SetUserPassword("");
			////console.log(result);
		} catch (error) {
			//console.log(error);
		}
	}

	public async ChangePassword(newPassword: string) {
		try {
			var user = this._AuthRef.currentUser;
			let result = await user.updatePassword(newPassword)

			//console.log(result);
		} catch (error) {
			//console.log(error);
		}
	}

	public async ForgotPasswordInit(email: string) {
		//console.log("In ForgotPasswordInit: " + email);
		try {
			let result = await this._AuthRef.sendPasswordResetEmail(email);
			return true;
		} catch (error) {
			//console.log(error);
			return false;
		}
	}

	public CheckEmail(email: string) {
		email = email.trim();
		if (email == '') {
			return EmailStateEnum.Empty;
		}
		else if (!this._EmailRegex.test(email)) {
			return EmailStateEnum.Invalid;
		}

		return EmailStateEnum.Valid;
	}

	public CheckPassword(password: string, confirmPassword: string = null) {
		if (password.length == 0) {
			return PasswordStateEnum.Empty;
		}

		else if (confirmPassword != null && password != confirmPassword) {
			return PasswordStateEnum.NotMatch;
		}

		return PasswordStateEnum.Valid;
	}

	// Rating

	// Helpers
	private GetUserTempProfileImage(value: string) {
		return "https://api.adorable.io/avatars/100/" + value + ".png";
	}

	public AddFavoritePost(postID: string) {
		try {
			this._Collection.doc(this._User.id).update({
				SavedPosts: firebase.firestore.FieldValue.arrayUnion(postID)
			})
		} catch (e) {
			//console.log(e);
		}
	}

	public RemoveFavoritePost(postID: string) {
		try {
			this._Collection.doc(this._User.id).update({
				SavedPosts: firebase.firestore.FieldValue.arrayRemove(postID)
			})
		} catch (e) {
			//console.log(e);
		}
	}
}

export enum SignInEnum {
	Success = 'Success',
	NotAuthorizedException = 'NotAuthorizedException',
	UserNotFoundException = 'UserNotFoundException',
	UnKnownError = 'UnKnownError',
	AccountExistInAnotherAuthProvider = "AccountExistInAnotherAuthProvider"
}

export enum SignUpEnum {
	Success = 'Success',
	UsernameExistsException = 'UsernameExistsException',
	InvalidPasswordException = 'InvalidPasswordException',
	InvalidParameterException = 'InvalidParameterException',
	UnKnownError = 'UnKnownError'
}

export enum ConfirmSignUpEnum {
	Success = 'Success',
	UnKnownError = 'UnKnownError'
}

export enum EmailStateEnum {
	Empty = 'Empty',
	Invalid = 'Invalid',
	Valid = 'Valid',
	NotSchoolEmail = 'NotSchoolEmail'
}

export enum PasswordStateEnum {
	Empty = 'Empty',
	Invalid = 'Invalid',
	Valid = 'Valid',
	NotMatch = 'NotMatch'
}

class FacebookPermissionResult {
	Type: any;
	Token: any;
}

let UserControllerInstance = new UserController();
export default UserControllerInstance;
