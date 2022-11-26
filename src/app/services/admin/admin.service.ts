import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
 updateLunasService(kode_bayar:number,idadmin:number,
  idtransaksi:number,total_bersih:number,idguru:number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idtransaksi', idtransaksi)
    body = body.set('kode_bayar', kode_bayar)
    body = body.set('idadmin', idadmin)
    body = body.set('total_bersih', total_bersih)
    body = body.set('idguru', idguru)


    return this.http.post("http://localhost:8888/db_ta/edit_pembayaran_lunas.php",body);
  }

  detailBayarAdminService(idtransaksi:number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idtransaksi', idtransaksi)
    return this.http.post("http://localhost:8888/db_ta/detail_bayar_admin.php",body);
  }

  profilService(email: string): Observable<any> {
    let body = new HttpParams;
    body = body.set('email', email)
    return this.http.post('http://localhost:8888/db_ta/profil_admin.php', body)
  }

  listBayarAdminService(idadmin:number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idadmin', idadmin)
    return this.http.post("http://localhost:8888/db_ta/list_bayar_admin.php",body);
  }

  registerService(email: string, password: string, no_rek: string,
    bank: string): Observable<any> {

    let body = new HttpParams;
    body = body.set('email', email)
    body = body.set('password', password)
    body = body.set('no_rek', no_rek)
    body = body.set('bank', bank)

    return this.http.post('http://localhost:8888/db_ta/register_admin.php', body)

  }

  constructor(private http: HttpClient) { }
}
