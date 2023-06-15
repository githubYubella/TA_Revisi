import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  setujuTarikDana(idguru: number,nominal:number,idtarikdana:number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idtarikdana', idtarikdana)
    body = body.set('idguru', idguru)
    body = body.set('nominal', nominal)
    return this.http.post("https://tugas-akhir-bella.my.id/setuju_tarik_dana.php", body);

  }

  listGuruTarikDana(): Observable<any> {
    // let body = new HttpParams()
    // body = body.set('id',id)
    return this.http.get('https://tugas-akhir-bella.my.id/list_tarik_dana_guru.php')
  }


  updateLunasService(kode_bayar: number, idadmin: number,
    idtransaksi: number, total_bersih: number, idguru: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idtransaksi', idtransaksi)
    body = body.set('kode_bayar', kode_bayar)
    body = body.set('idadmin', idadmin)
    body = body.set('total_bersih', total_bersih)
    body = body.set('idguru', idguru)
    return this.http.post("https://tugas-akhir-bella.my.id/edit_pembayaran_lunas.php", body);
  }

  detailBayarAdminService(idtransaksi: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idtransaksi', idtransaksi)
    return this.http.post("https://tugas-akhir-bella.my.id/detail_bayar_admin.php", body);
  }

  profilService(email: string): Observable<any> {
    let body = new HttpParams;
    body = body.set('email', email)
    return this.http.post('https://tugas-akhir-bella.my.id/profil_admin.php', body)
  }

  listBayarAdminService(idadmin: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idadmin', idadmin)
    return this.http.post("https://tugas-akhir-bella.my.id/list_bayar_admin.php", body);
  }

  registerService(email: string, password: string, no_rek: string,
    bank: string): Observable<any> {

    let body = new HttpParams;
    body = body.set('email', email)
    body = body.set('password', password)
    body = body.set('no_rek', no_rek)
    body = body.set('bank', bank)

    return this.http.post('https://tugas-akhir-bella.my.id/register_admin.php', body)

  }

  constructor(private http: HttpClient) { }
}
