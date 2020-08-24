import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {


    loader: any;
    toast: any;

    constructor(
        public loadCtrl: LoadingController,
        public toastCtrl: ToastController
    ) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        const token = "your generated token";

        if(token) {
            request = request.clone({
                setHeaders: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-Api-Key': "your Api Key",
                    'X-Token': token
                }
            });
        }

        if(!request.headers.has('Content-Type')) {
            request = request.clone({
                setHeaders: {
                    'content-type': 'application/x-www-form-urlencoded',
                }
            });
        }

        request = request.clone({
            headers: request.headers.set('Accept', 'application/x-www-form-urlencoded')
        });
        // add loader here
        this.presentLoad();
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if(event instanceof HttpResponse) {
                    console.log('event--->', event);
                    this.presentToast();
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

    async hideLoader() {
       await this.loadCtrl.dismiss(null, undefined);
    }

    async presentToast() {
        this.toast = await this.toastCtrl.create({
            message: "Success",
            duration: 2000
        }).then((res) => {
            res.present();
        });
    }
}