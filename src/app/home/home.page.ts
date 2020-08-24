import { Component } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title: any;
  total: any;

  constructor(
    private http: HttpService
  ) {}

  employeeDetails() {
    this.http.getDetails().subscribe(res => {
      console.log(res);
    });
  }

}
