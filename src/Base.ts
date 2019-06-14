export class Base {
	protected IsNullorEmpty(param: string) {
		if (param === "" || param === null || param === undefined) {
			return true;
		}
		return false;
	}

	protected IsNull(param: any) {
		if (param === undefined || param === null) {
			return true;
		}
		return false;
	}
}