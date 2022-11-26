import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TempatKursusService {

  constructor(private http: HttpClient) { }
  listProvinsi():Observable<any>{
//     fetch('https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json').then(res => res.json())
//     .then(json => {
      
//        console.log(json)  
 
//  });
this.http.get('https://www.anything.co.il/api/get_posts/').subscribe(
  (res)=>{
      console.log(res);
  });
    
  //   this.http.get("https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json").then(res => res.json()).subscribe(data => {

  //     console.log(data);

  // });
    return this.http.get("http://dev.farizdotid.com/api/daerahindonesia/provinsi")
  }

  detailTempatKursusService(id: number): Observable<any> {
    let body = new HttpParams()
    body = body.set('id', id)
    return this.http.post('http://localhost:8888/db_ta/detail_kursus.php', body)

  }

  listTempatKursusService(): Observable<any> {
    return this.http.get("http://localhost:8888/db_ta/list_kursus.php");
  }

  editFotoService(data: FormData): Observable<any> {
    return this.http.post('http://localhost:8888/db_ta/edit_kursus_foto.php', data)
  }

  editProfilService(informasi: string, nama: string, alamat: string, kecamatan:string,
    kelurahan:string,lat:number,long:number,email: string): Observable<any> {
    let body = new HttpParams()
    body = body.set('informasi', informasi)
    body = body.set('nama', nama)
    body = body.set('alamat', alamat)
    body = body.set('kecamatan', kecamatan)
    body = body.set('kelurahan', kelurahan)
    body = body.set('lat', lat)
    body = body.set('long', long)

    // ionic generate service services/foto/foto
    body = body.set('email', email)
    return this.http.post('http://localhost:8888/db_ta/edit_kursus.php', body)
  }

  profilService(email: string) {
    let body = new HttpParams()
    body = body.set('email', email)
    return this.http.post('http://localhost:8888/db_ta/profil_kursus.php', body)
  }

  registerService(data: FormData): Observable<any> {
    return this.http.post('http://localhost:8888/db_ta/register.php', data)
  }

  listKeahlianService(): Observable<any> {
    // let body = new HttpParams()
    // body = body.set('id',id)
    return this.http.get('http://localhost:8888/db_ta/list_keahlian.php')
  }

  simpanJadwal(jadwal): Observable<any> {
    let body = new HttpParams()
    jadwal.forEach((item, i) => {
      body = body.set("jadwal[" + i + "][hari]", item.hari)
      body = body.set("jadwal[" + i + "]['pukul']", item.pukul)
      body = body.set("jadwal[" + i + "]['sampai']", item.sampai)
    })
    return this.http.post('http://localhost:8888/db_ta/simpan.php', body)
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
