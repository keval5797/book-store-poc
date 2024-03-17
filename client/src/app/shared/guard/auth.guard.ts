import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  currentUrl: string = '';
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.currentUrl = state.url;
    const token = localStorage.getItem('token');
    if (!token && this.currentUrl !== '/login') {
      this.router.navigate(['login']);
      return false;
    } else if (token && this.currentUrl === '/login') {
      this.router.navigate(['books']);
      return false;
    }

    return true;
  }
}
