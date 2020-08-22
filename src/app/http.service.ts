import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = 'https://localhost:8080/api/getdetails';

  constructor(
    private http: HttpClient
  ) { }

  getDetails(): Observable<any> {
    return this.http.get(this.apiUrl)
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('getDetails', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // send the error to remote logging infrastructure
      console.error(error); 

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
