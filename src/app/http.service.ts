import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = 'https://localhost:8080/api/';
  idx: any; 

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getDetails(): Observable<any> {
    return this.http.get(this.apiUrl + "details/all")
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('getDetails', []))
      );
  }

  // post data to api
  postFeeds(): Observable<any>{

    let body = new HttpParams();
    body = body.append('name', this.idx)// this is data that you want to post to your api

    return this.http.post(this.apiUrl + "post/feeds", body.toString())
    .pipe(
      tap(_ => this.log('response received')),
      catchError(this.handleError('postFeeds', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // send the error to remote logging infrastructure
      console.error(error); 
      // this.router.navigate(['/notfound']);
      // alert(error.ok);

      // better job of transforming error for user consumption
      this.log(`${operation} failled: ${error.message}`);

      // let app running by returning an empty result
      return of(result as T);
    };
  }

  // log a heroservice message with the message service
  private log(message: string) {
    console.log(message);
  }

}
