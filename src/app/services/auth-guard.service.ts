import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private _router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("x",ActivatedRouteSnapshot);
    if (this.isAuthenticated()) {
      return true;
    }
    else {
      this._router.navigate(['/login']);
      return false;
    }
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedin') == 'true';
  }
}
