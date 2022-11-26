import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  cekRoleService(email: string): Observable<any> {
    let body = new HttpParams()
    body = body.set('email', email)
    return this.http.post('http://localhost:8888/db_ta/cek_role.php', body)
  }

  constructor(private http: HttpClient) { }
}
