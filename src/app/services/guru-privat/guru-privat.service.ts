import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuruPrivatService {
  constructor(private http: HttpClient) { }

  editPassGuruService(pass: string,email:string): Observable<any> {
    let body = new HttpParams;
    body = body.set('pass', pass)
    body = body.set('email', email)

    return this.http.post('https://tugas-akhir-bella.my.id/edit_guru_pass.php', body)
  }

  historyUlasanGuruSerivce(idguru: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idguru', idguru)
    return this.http.post('https://tugas-akhir-bella.my.id/history_ulasan_guru_privat.php', body)
  }

  cekStatusPembayaranService(idlowongan:number):Observable<any>{
    let body = new HttpParams;
    body = body.set('idlowongan', idlowongan)
    return this.http.post("https://tugas-akhir-bella.my.id/cek_status_pembayaran.php",body);
  }
  
  updateStatusPesanOrtuService(idortu:number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idortu', idortu)
    return this.http.post("https://tugas-akhir-bella.my.id/update_pesan_guru_ortu.php",body);
  }
  

  listPesanService(idguru:number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idguru', idguru)
    return this.http.post("https://tugas-akhir-bella.my.id/list_chat_guru_ortu.php",body);
  }

  editKeahlianService(data: FormData): Observable<any> {
    return this.http.post('https://tugas-akhir-bella.my.id/edit_profil_guru_keahlian.php', data)
  }
  editFotoService(data: FormData): Observable<any> {
    return this.http.post('https://tugas-akhir-bella.my.id/edit_profil_guru_foto.php', data)
  }
  editDokumenService(data: FormData): Observable<any> {
    return this.http.post('https://tugas-akhir-bella.my.id/edit_profil_guru_dokumen.php', data)
  }

  editProfilService(jenis_kelamin:string, tempat_jenjang_terakhir:string,
    jenjang_terakhir:string, lat:string,long:string,telepon:string,
    nama:string, tgl_lahir:string, pengalaman:string, alamat:string,
    kecamatan:string, kelurahan:string, kota:string, prov:string,email:string): Observable<any> {
    let body = new HttpParams()
    body = body.set('jenisKel',jenis_kelamin)
    body = body.set('tempat_jenjang_terakhir',tempat_jenjang_terakhir)
    body = body.set('jenjang',jenjang_terakhir)
    body = body.set('lat',lat)
    body = body.set('long',long)
    body = body.set('telepon',telepon)
    body = body.set('nama',nama)
    body = body.set('tgl_lahir',tgl_lahir)
    body = body.set('pengalaman',pengalaman)
    body = body.set('alamat',alamat)
    body = body.set('kecamatan',kecamatan)
    body = body.set('kelurahan',kelurahan)
    body = body.set('kota',kota)
    body = body.set('provinsi',prov)
    body = body.set('email',email)


    return this.http.post('https://tugas-akhir-bella.my.id/edit_profil_guru.php', body)
  }

  listKeahlianService(): Observable<any> {
    // let body = new HttpParams()
    // body = body.set('id',id)
    return this.http.get('https://tugas-akhir-bella.my.id/list_keahlian.php')
  }
  riwayatTarikDanaService(idguru: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('idguru', idguru)
    return this.http.post('https://tugas-akhir-bella.my.id/riwayat_penarikan_dana.php', body)
  }

  tarikDanaService(idguru: number,nominal:number,norek:number,
    tanggal:string): Observable<any> {
    let body = new HttpParams()
    body = body.set('idguru', idguru)
    body = body.set('nominal', nominal)
    body = body.set('no_rek', norek)
    body = body.set('tanggal_tarik', tanggal)
    return this.http.post('https://tugas-akhir-bella.my.id/tarik_dana.php', body)
  }

  riwayatTambahTransaksiService(idguru: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('idguru', idguru)
    return this.http.post('https://tugas-akhir-bella.my.id/riwayat_transaksi_guru.php', body)
  }
  keahlianGuruService(idguru: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('idguru', idguru)
    return this.http.post('https://tugas-akhir-bella.my.id/keahlian_guru.php', body)
  }

  hapusAbsenService(idabsen: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('idabsen', idabsen)
    return this.http.post('https://tugas-akhir-bella.my.id/hapus_absen.php', body)
  }

  editAbsenService(tanggal_buka: string, materi: string, idabsen: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('tanggal', tanggal_buka)
    body = body.set('materi', materi)
    body = body.set('idabsen', idabsen)
    return this.http.post('https://tugas-akhir-bella.my.id/edit_absen.php', body)
  }

  detailAbsenService(idabsen: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('id', idabsen)
    return this.http.post('https://tugas-akhir-bella.my.id/detail_absen.php', body)
  }

  listRiwayatAbsenService(idlowongan:number): Observable<any> {
    let body = new HttpParams()
    body = body.set('idlowongan', idlowongan)
    return this.http.post("https://tugas-akhir-bella.my.id/list_riwayat_absen.php",body);
  }

  bukaAbsenService(tanggal_buka: string, materi: string, idlowongan: number,
    idguru: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('tanggal', tanggal_buka)
    body = body.set('materi', materi)
    body = body.set('idlowongan', idlowongan)
    body = body.set('idguru', idguru)
    return this.http.post('https://tugas-akhir-bella.my.id/buka_absen.php', body)
  }

  listLamaranDiterimaService(idguru: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('idguru', idguru)
    return this.http.post('https://tugas-akhir-bella.my.id/list_lamaran_guru_diterima.php', body)
  }

  listDaftarLamaranService(idguru: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('idguru', idguru)
    return this.http.post('https://tugas-akhir-bella.my.id/list_lamaran_guru.php', body)
  }

  kirimLamaranService(data: FormData): Observable<any> {
    return this.http.post('https://tugas-akhir-bella.my.id/lamar_lowongan.php', data)
  }

  detailLowongan(id: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('id', id)
    return this.http.post('https://tugas-akhir-bella.my.id/detail_lowongan_guru.php', body)
  }

  listLowonganService(idguru:number,search:string): Observable<any> {
    let body = new HttpParams()
    body = body.set('idguru', idguru)
    body = body.set('search', search)
    return this.http.post("https://tugas-akhir-bella.my.id/list_lowongan.php",body);
  }

  profilService(email: string): Observable<any> {
    let body = new HttpParams;
    body = body.set('email', email)
    return this.http.post('https://tugas-akhir-bella.my.id/profil_guru.php', body)
  }
  registergpService(data: FormData): Observable<any> {
    return this.http.post('https://tugas-akhir-bella.my.id/register_guru_privat.php', data)
  }


}
