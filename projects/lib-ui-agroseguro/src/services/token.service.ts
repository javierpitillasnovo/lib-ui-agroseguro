import { Injectable, inject, signal } from '@angular/core';
import { CallApiService, RequestApiParams, RequestMethod } from './callapi.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TokenService {
	readonly #callApiService = inject(CallApiService);
	public isRefreshing = signal<boolean>(false);
	public refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	refreshToken(refreshToken: string): Observable<any> {
		let requestParams: RequestApiParams = {
			method: RequestMethod.post,
			url: `https://desarrollo.agroseguro.es/apisecurity/v1r0/auth/refresh`,
			refreshToken: refreshToken
		};
		return this.#callApiService.callApi(requestParams, true);
	}
}
