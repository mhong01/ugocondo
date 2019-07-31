import BaseController from "./BaseController";
import { UserModel } from "../Model/User";
import { SignUpEnum } from "./UserController";

export class UserControllerTemp extends BaseController {

    private _User: UserModel;
    constructor() {
		super();
        this._Collection = this._DatabaseRef.collection(this.DatabaseCollectionName.Users);
        console.log(this._Collection);

    }
    
    public async SignUpUser(_user: UserModel): Promise<string>{
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

}