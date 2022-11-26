import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  email: string
  password: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async login() {
    let success = await this.authService.login(this.email, this.password)
    if (success) {
      this.email = ''
      this.password = ''
      alert('Login success')
      this.router.navigateByUrl('home')
    } else {
      alert('Email atau password salah')
    }
  }

}
