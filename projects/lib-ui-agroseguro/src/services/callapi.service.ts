import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpContext, HttpContextToken, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGNORE_INTERCEPTOR } from '../const/ingoreInterceptor';

export enum RequestMethod {
	get = 'get',
	post = 'post',
	put = 'put',
	delete = 'delete'
}

export interface RequestApiParams {
	method: RequestMethod;
	url: string;
	refreshToken?: string;
	body?: Record<string, any>;
	responseType?: 'json' | 'text' | 'multipart/form-data';
}

@Injectable({
	providedIn: 'root'
})
export class CallApiService {
	readonly #http = inject(HttpClient);

	callApi(requestParams: RequestApiParams, ignoreInterceptor: boolean = false): Observable<any> {
		let { method, url, body, refreshToken, responseType } = requestParams;

		let headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
			'Access-Control-Allow-Headers':
				'Origin, X-Requested-With, Content-Type, Accept, Authorization',

			Authorization: refreshToken ? `Bearer ${refreshToken}` : ''
		});

		let context = new HttpContext().set(IGNORE_INTERCEPTOR, ignoreInterceptor);

		switch (method) {
			case RequestMethod.get:
				return responseType === 'text'
					? this.#http[RequestMethod.get](url, { ...headers, responseType: 'text', context })
					: this.#http[RequestMethod.get](url, { headers, context });
			case RequestMethod.post:
				return this.#http[RequestMethod.post](`${url}`, body, { headers, context });
			case RequestMethod.put:
				return this.#http[RequestMethod.put](`${url}`, body, { headers, context });
			case RequestMethod.delete:
				return this.#http[RequestMethod.delete](`${url}`, { headers, body, context });
		}
	}
}
