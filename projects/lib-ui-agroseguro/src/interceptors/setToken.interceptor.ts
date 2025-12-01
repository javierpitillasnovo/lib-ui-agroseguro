import { HttpInterceptorFn, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { TokenService } from '../services/token.service';
import { SessionService } from '../services/session.service';
import {
	catchError,
	switchMap,
	throwError,
	Observable,
	timeout,
	BehaviorSubject,
	filter,
	take,
	finalize
} from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { IGNORE_INTERCEPTOR } from '../const/ingoreInterceptor';
import { Router } from '@angular/router';

export const setTokenInterceptor: HttpInterceptorFn = (req, next) => {
	let tokenService = inject(TokenService);
	let sessionService = inject(SessionService);
	let notificationService = inject(NotificationService);
	let router = inject(Router);
	let accessToken = sessionService.get('access_token');
	let refreshToken = sessionService.get('refresh_token');
	let validateToken = sessionService.get('validate_token');
	let authReq = req;

	if (req.context.get(IGNORE_INTERCEPTOR)) {
		return next(authReq).pipe(
			catchError((error: HttpErrorResponse) => {
				return throwError(() => error);
			})
		);
	}

	if (accessToken) {
		authReq = addTokenToRequest(req, accessToken);
	} else if (validateToken) {
		authReq = addTokenToRequest(req, validateToken);
	}

	return next(authReq).pipe(
		catchError((error: HttpErrorResponse) => {
			if (error.status === 401 && !validateToken) {
				if (refreshToken) {
					if (!tokenService.isRefreshing()) {
						tokenService.isRefreshing.set(true);
						tokenService.refreshTokenSubject.next(null);
						return tokenService.refreshToken(refreshToken).pipe(
							switchMap((response: any) => {
								tokenService.refreshTokenSubject.next(response.access_token);
								sessionService.set('access_token', response.access_token);
								sessionService.set('refresh_token', response.refresh_token);
								let newAuthReq = addTokenToRequest(req, response.access_token);
								return next(newAuthReq);
							}),
							catchError((err) => {
								returnToLogin();
								return throwError(() => err);
							}),
							finalize(() => {
								tokenService.isRefreshing.set(false);
							})
						);
					} else {
						return tokenService.refreshTokenSubject.pipe(
							filter((token) => token != null),
							take(1),
							switchMap((accessToken) => {
								let newAuthReq = addTokenToRequest(req, accessToken);
								return next(newAuthReq);
							})
						);
					}
				} else {
					returnToLogin();
					return throwError(() => error);
				}
			} else if (error.status === 400) {
				notificationService.showNotification({
					message: signal(error.error),
					hasError: signal(true)
				});
				return throwError(() => error);
			} else {
				return throwError(() => error);
			}
		})
	);

	function returnToLogin() {
		sessionStorage.clear();
		router.navigateByUrl('/');
		setTimeout(() => {
			notificationService.showNotification({
				message: signal('La sesión ha expirado'),
				hasError: signal(true)
			});
		}, 500);
	}
};

function addTokenToRequest(req: HttpRequest<any>, token: string): HttpRequest<any> {
	return req.clone({
		setHeaders: {
			Authorization: `Bearer ${token}`
		}
	});
}
