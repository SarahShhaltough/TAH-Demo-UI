import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private valuesUrl = environment.apiUrl;
  private headers: HttpHeaders;
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
    .set('Authorization', 'bearer ' + this.token)
    .set('Content-Type', 'application/json');
  }

  login(loginData:any){
    let apiUrl: string;
    apiUrl = this.valuesUrl + "api/Auth/Login";
    return this.http.post(apiUrl, loginData, { headers: this.headers });
  }

  getEmployees(){
    let apiUrl: string;
    apiUrl = this.valuesUrl + "api/Employee";
    console.log("token: ",this.token)
    console.log("header: ",this.headers)
    return this.http.get(apiUrl, { headers: this.headers });
  }

}
