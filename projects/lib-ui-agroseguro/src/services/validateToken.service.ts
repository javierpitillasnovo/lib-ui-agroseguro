import { Injectable, inject } from '@angular/core';
import { CallApiService, RequestApiParams, RequestMethod } from './callapi.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ValidateTokenService {
	readonly #callApiService = inject(CallApiService);

	validateToken(): Observable<any> {
		let requestParams: RequestApiParams = {
			method: RequestMethod.post,
			url: `https://desarrollo.agroseguro.es/apisecurity/v1r0/auth/validate`
		};
		return this.#callApiService.callApi(requestParams);
	}
}
