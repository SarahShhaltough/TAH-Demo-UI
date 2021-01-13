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
    return this.http.get(apiUrl, { headers: this.headers });
  }

  addEmployee(body:any){
    let apiUrl: string;
    apiUrl = this.valuesUrl + "api/Employee";
    return this.http.post(apiUrl, body, { headers: this.headers });
  }

  removeEmployee(id:any){
    let apiUrl: string;
    apiUrl = this.valuesUrl + "api/Employee/" + id;
    return this.http.delete(apiUrl, { headers: this.headers });
  }

  editEmployee(id:any,body:any){
    let apiUrl: string;
    apiUrl = this.valuesUrl + "api/Employee/" + id;
    return this.http.put(apiUrl, body, { headers: this.headers });
  }

  getProjects(){
    let apiUrl: string;
    apiUrl = this.valuesUrl + "api/Project";
    return this.http.get(apiUrl, { headers: this.headers });
  }

  addProject(body:any) {
    let apiUrl: string;
    apiUrl = this.valuesUrl + "api/Project";
    return this.http.post(apiUrl, body, { headers: this.headers });
  }

  removeProject(id:any){
    let apiUrl: string;
    apiUrl = this.valuesUrl + "api/Project/" + id;
    return this.http.delete(apiUrl, { headers: this.headers });
  }

  editProject(id:any,body:any){
    let apiUrl: string;
    apiUrl = this.valuesUrl + "api/Project/" + id;
    return this.http.put(apiUrl, body, { headers: this.headers });
  }

  getProjectEmployees(id:any){
    let apiUrl: string;
    apiUrl = this.valuesUrl + "api/ProjectAssignment/"+ id;
    return this.http.get(apiUrl, { headers: this.headers });
  }
}
