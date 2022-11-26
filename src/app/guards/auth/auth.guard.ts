import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.initialized) {
      return this.redirect(state)
    } else {
      return this.authService.init().then(() => this.redirect(state));
    }
  }

  redirect(state: RouterStateSnapshot) {
    console.log('AuthGuard redirect. state.url = ' + state.url + ' role = ' + this.authService.role)
    if (this.authService.isAuthenticated()) {
      if (state.url == '/home') {
        if (this.authService.role == 'orang_tua') {
          return this.router.parseUrl('home-orang-tua')
        } else if (this.authService.role == 'tempat_kursus') {
          return this.router.parseUrl('home-tempat-kursus')
        }  else if (this.authService.role == 'guru_privat')  {
          return this.router.parseUrl('home-guru-privat')
        }else if (this.authService.role == 'admin')  {
          return this.router.parseUrl('home-admin')
        }
      } else {
        return true
      }
      // return true
    } else {
      return this.router.parseUrl('login')
    }
  }

}
