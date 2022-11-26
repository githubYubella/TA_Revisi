import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  initialized = false
  email: string = null
  role: string = null

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  async init() {
    console.log('AuthService init')
    await this.storage.create()
    await this.storage.get('email').then(data => { this.email = data })
    await this.storage.get('role').then(data => { this.role = data })
    console.log('AuthService init. email: ' + this.email + ' role: ' + this.role)
    this.initialized = true
  }

  isAuthenticated() {
    return this.email != null
  }

  async login(email: string, password: string): Promise<boolean> {
    let body = new HttpParams()
    body = body.set('email', email)
    body = body.set('password', password)
    let data = await this.http.post('http://localhost:8888/db_ta/login.php', body).toPromise()
    if (data['result'] == 'success') {
      this.email = email
      await this.storage.set('email', this.email)
      await this.cekRole()
      return true
    } else {
      return false
    }
  }

  async cekRole() {
    let body = new HttpParams()
    body = body.set('email', this.email)
    let data: any = await this.http.post('http://localhost:8888/db_ta/cek_role.php', body).toPromise()
    this.role = data
    await this.storage.set('role', this.role)
  }

  async logout() {
    this.email = null
    this.role = null
    await this.storage.remove('email')
    await this.storage.remove('role')
    console.log("logout: "+this.email)
  }
}
