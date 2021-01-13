import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TAH Demo';
  isLoggedin =  localStorage.getItem('isLoggedin') == 'true';
  
  logout(){
    this.isLoggedin =  localStorage.getItem('isLoggedin') == 'true';
    localStorage.clear();
  }
}
