import firebase from 'firebase';
import firebase_exports from '../firebase-exports';
import { Base } from '../Base';
firebase.initializeApp(firebase_exports);

export default class BaseController extends Base {
	protected _DatabaseRef = firebase.firestore();
	protected _Collection: firebase.firestore.CollectionReference;

	protected DatabaseCollectionName = {
		Users: 'Users',
		Posts: 'Posts',
		Chats: 'Chats'
	}

}