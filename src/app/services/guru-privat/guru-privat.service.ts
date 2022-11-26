import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuruPrivatService {
  constructor(private http: HttpClient) { }

  riwayatTarikDanaService(idguru: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('idguru', idguru)
    return this.http.post('http://localhost:8888/db_ta/riwayat_penarikan_dana.php', body)
  }

  tarikDanaService(idguru: number,nominal:number,norek:number,
    tanggal:string): Observable<any> {
    let body = new HttpParams()
    body = body.set('idguru', idguru)
    body = body.set('nominal', nominal)
    body = body.set('no_rek', norek)
    body = body.set('tanggal_tarik', tanggal)
    return this.http.post('http://localhost:8888/db_ta/tarik_dana.php', body)
  }

  riwayatTambahTransaksiService(idguru: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('idguru', idguru)
    return this.http.post('http://localhost:8888/db_ta/riwayat_transaksi_guru.php', body)
  }
  keahlianGuruService(idguru: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('idguru', idguru)
    return this.http.post('http://localhost:8888/db_ta/keahlian_guru.php', body)
  }

  hapusAbsenService(idabsen: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('idabsen', idabsen)
    return this.http.post('http://localhost:8888/db_ta/hapus_absen.php', body)
  }

  editAbsenService(tanggal_buka: string, materi: string, idabsen: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('tanggal', tanggal_buka)
    body = body.set('materi', materi)
    body = body.set('idabsen', idabsen)
    return this.http.post('http://localhost:8888/db_ta/edit_absen.php', body)
  }

  detailAbsenService(idabsen: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('id', idabsen)
    return this.http.post('http://localhost:8888/db_ta/detail_absen.php', body)
  }

  listRiwayatAbsenService(): Observable<any> {
    return this.http.get("http://localhost:8888/db_ta/list_riwayat_absen.php");
  }

  bukaAbsenService(tanggal_buka: string, materi: string, idlowongan: number,
    idguru: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('tanggal', tanggal_buka)
    body = body.set('materi', materi)
    body = body.set('idlowongan', idlowongan)
    body = body.set('idguru', idguru)
    return this.http.post('http://localhost:8888/db_ta/buka_absen.php', body)
  }

  listLamaranDiterimaService(idguru: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('idguru', idguru)
    return this.http.post('http://localhost:8888/db_ta/list_lamaran_guru_diterima.php', body)
  }

  listDaftarLamaranService(idguru: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('idguru', idguru)
    return this.http.post('http://localhost:8888/db_ta/list_lamaran_guru.php', body)
  }

  kirimLamaranService(data: FormData): Observable<any> {
    return this.http.post('http://localhost:8888/db_ta/lamar_lowongan.php', data)
  }

  detailLowongan(id: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('id', id)
    return this.http.post('http://localhost:8888/db_ta/detail_lowongan_guru.php', body)
  }

  listLowonganService(): Observable<any> {
    return this.http.get("http://localhost:8888/db_ta/list_lowongan.php");
  }

  profilService(email: string): Observable<any> {
    let body = new HttpParams;
    body = body.set('email', email)
    return this.http.post('http://localhost:8888/db_ta/profil_guru.php', body)
  }
  registergpService(data: FormData): Observable<any> {
    return this.http.post('http://localhost:8888/db_ta/register_guru_privat.php', data)
  }


}
