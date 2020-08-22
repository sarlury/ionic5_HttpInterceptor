import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {


    loader: any;

    constructor(
        public loadCtrl: LoadingController
    ) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        const token = "my-token-string-from-server";

        if(token) {
            request = request.clone({
                setHeaders: {
                    'Authorization': token
                }
            });
        }

        if(!request.headers.has('Content-Type')) {
            request = request.clone({
                setHeaders: {
                    'content-type': 'application/json'
                }
            });
        }

        request = request.clone({
            headers: request.headers.set('Accept', 'application/json')
        });
        // add loader here
        this.presentLoad();
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if(event instanceof HttpResponse) {
                    console.log('event--->', event);
                }
                // loader will dismissed if complete
                this.hideLoader();
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.error(error);
                // loader will dismissed when complete error
                this.hideLoader();
                return throwError(error);
            }));

    }

    async presentLoad() { 
        this.loader = await this.loadCtrl.create({
            message: 'Processing..'
        }).then((res) => {
            res.present();

            res.onDidDismiss().then((dis) => {
                console.log('Loading dismissed');
            });
        });
        this.hideLoader();
    }

    hideLoader() {
        this.loadCtrl.dismiss();
    }
}