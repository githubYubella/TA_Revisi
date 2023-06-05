import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TempatKursusService {

  constructor(private http: HttpClient) { }

  editPassTempatKursusService(pass: string,email:string): Observable<any> {
    let body = new HttpParams;
    body = body.set('pass', pass)
    body = body.set('email', email)

    return this.http.post('https://tugas-akhir-bella.my.id/edit_tempat_kursus_pass.php', body)
  }

  updateStatusPesanOrtuService(idortu:number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idortu', idortu)
    return this.http.post("https://tugas-akhir-bella.my.id/update_pesan_kursus_ortu.php",body);
  }
  
  listPesanService(idkursus:number): Observable<any> {
    // return this.http.get("https://tugas-akhir-bella.my.id/list_chat_kursus_ortu.php");
    
    let body = new HttpParams;
    body = body.set('idkursus', idkursus)
    return this.http.post("https://tugas-akhir-bella.my.id/list_chat_kursus_ortu.php",body);
  }


  keahlianTempatKursusService(id: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('id', id)
    return this.http.post('https://tugas-akhir-bella.my.id/keahlian_tempat_kursus.php', body)

  }

  detailTempatKursusService(id: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('id', id)
    return this.http.post('https://tugas-akhir-bella.my.id/detail_kursus.php', body)

  }

  listTempatKursusService(search:string): Observable<any> {
    let body = new HttpParams()
    body = body.set('search', search)
    // return this.http.post("https://tugas-akhir-bella.my.id/list_kursus.php",body);

    return this.http.post("https://tugas-akhir-bella.my.id/list_kursus.php",body);
    // return this.http.get("https://tugas-akhir-bella.my.id/list_kursus.php");

  }
  editKeahlianService(data: FormData): Observable<any> {
    return this.http.post('https://tugas-akhir-bella.my.id/edit_kursus_keahlian.php', data)
  }

  editDokumenService(data: FormData): Observable<any> {
    return this.http.post('https://tugas-akhir-bella.my.id/edit_kursus_dokumen.php', data)
  }


  editFotoService(data: FormData): Observable<any> {
    return this.http.post('https://tugas-akhir-bella.my.id/edit_kursus_foto.php', data)
  }

  editProfilService(id:number,informasi: string, nama: string, alamat: string, kecamatan:string,
    kelurahan:string,lat:number,long:number,email: string,kota:string, prov:string): Observable<any> {
    let body = new HttpParams()
    body = body.set('informasi', informasi)
    body = body.set('nama', nama)
    body = body.set('alamat', alamat)
    body = body.set('kecamatan', kecamatan)
    body = body.set('kelurahan', kelurahan)
    body = body.set('kota', kota)
    body = body.set('prov', prov)


    body = body.set('lat', lat)
    body = body.set('long', long)

    // ionic generate service services/foto/foto
    body = body.set('email', email)
    body = body.set('id', id)
    // body = body.set('idkeahlian[]', idkeahlian)


    return this.http.post('https://tugas-akhir-bella.my.id/edit_kursus.php', body)
  }

  profilService(email: string) {
    let body = new HttpParams()
    body = body.set('email', email)
    return this.http.post('https://tugas-akhir-bella.my.id/profil_kursus.php', body)
  }

  registerService(data: FormData): Observable<any> {
    return this.http.post('https://tugas-akhir-bella.my.id/register.php', data)
  }

  listKeahlianService(): Observable<any> {
    // let body = new HttpParams()
    // body = body.set('id',id)
    return this.http.get('https://tugas-akhir-bella.my.id/list_keahlian.php')
  }

  simpanJadwal(jadwal): Observable<any> {
    let body = new HttpParams()
    jadwal.forEach((item, i) => {
      body = body.set("jadwal[" + i + "][hari]", item.hari)
      body = body.set("jadwal[" + i + "]['pukul']", item.pukul)
      body = body.set("jadwal[" + i + "]['sampai']", item.sampai)
    })
    return this.http.post('https://tugas-akhir-bella.my.id/simpan.php', body)
  }

  // registerService(email:string, password:string , nama:string,informasi:string ,alamat:string,
  //   loc_x:string,loc_y:string,gambar:FormData ): Observable<any>{
  //   let body = new HttpParams()
  //   body = body.set('email',email)
  //   body = body.set('password',password)
  //   body = body.set('nama',nama)
  //   body = body.set('informasi',informasi)
  //   body = body.set('alamat',alamat)
  //   body = body.set('lat',loc_x)
  //   body = body.set('long',loc_y)
  //   return this.http.post('https://ubaya.fun/hybrid/160419118/JanjiJiwaMail/register.php',body)
  // }
}
