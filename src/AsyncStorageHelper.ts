export class AsyncStorageHelper
{
	public static async SetIsUserLoggedIn(IsUserLoggedIn: boolean) {
		try {
			let setValue = (IsUserLoggedIn) ? 'true' : 'falsee';
			await localStorage.setItem('IsUserLoggedIn', setValue);
		} catch (error) {
			//console.log('Error setting IsUserLoggedIn');
		}
	}

	public static async GetIsUserLoggedIn() {
		try {
			const value = await localStorage.getItem('IsUserLoggedIn');
			if (value !== null) {
				return (value === 'true') ? true : false;
			}
			return false;
		} catch (error) {
			//console.log('Error retrieving IsUserLoggedIn')
			return false;
		}
	}

	public static async SetUserEmail(userEmail: string) {
		try {
			await localStorage.setItem('UserEmail', userEmail);
		} catch (error) {
			//console.log('Error setting UserEmail');
		}
	}

	public static async GetUserEmail() {
		try {
			const value = await localStorage.getItem('UserEmail');
			if (value !== null) {
				return value;
			}
			return '';
		} catch (error) {
			//console.log('Error retrieving UserEmail')
			return '';
		}
	}

	public static async SetUserPassword(userEmail: string) {
		try {
			await localStorage.setItem('UserPassword', userEmail);
		} catch (error) {
			//console.log('Error setting UserPassword');
		}
	}

	public static async GetUserPassword() {
		try {
			const value = await localStorage.getItem('UserPassword');
			if (value !== null) {
				return value;
			}
			return '';
		} catch (error) {
			//console.log('Error retrieving UserPassword')
			return '';
		}
	}
}
