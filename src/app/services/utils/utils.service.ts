import { Injectable } from '@angular/core';
import { environment } from '@env/environment.prod';
import { UsersLisModel } from '@app/models/users.model';

@Injectable({
	providedIn: 'root'
})
export class UtilsService {
	public allUsers: UsersLisModel;

	constructor() {}

	public getHost(): string {
		const currentHostName: string = window.location.hostname;
		let serverUrl: string = '';

		if (currentHostName === 'localhost') {
			serverUrl = environment.hostServerUrl;
		} else {
			serverUrl = window.location.origin;
		}

		return serverUrl;
	}

}
