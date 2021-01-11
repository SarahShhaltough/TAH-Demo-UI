import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private valuesUrl = environment.apiUrl;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  login(loginData:any){
    let apiUrl: string;
    apiUrl = this.valuesUrl + "api/Auth/Login";
    return this.http.post(apiUrl, loginData, { headers: this.headers });
  }
}
