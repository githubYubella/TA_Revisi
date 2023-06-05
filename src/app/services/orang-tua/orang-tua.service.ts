import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrangTuaService {

  kirimUlasanTempatKursusService(idkursus:number,idortu:number,rating: number,komentar:string): Observable<any> {
    let body = new HttpParams;
    body = body.set('idkursus', idkursus)
    body = body.set('idortu', idortu)
    body = body.set('rating', rating)
    body = body.set('komentar', komentar)
    return this.http.post('https://tugas-akhir-bella.my.id/kirim_ulasan_tempat_kursus.php', body)
  }

  akhiriKursusService(idlowongan:number,rating: number,komentar:string,tgl_selesai:string): Observable<any> {
    // Untuk melakukan pembayaran selanjutnya
    let body = new HttpParams;
    body = body.set('idlowongan', idlowongan)
    body = body.set('rating', rating)
    body = body.set('komentar', komentar)
    body = body.set('tgl_selesai', tgl_selesai)
    return this.http.post('https://tugas-akhir-bella.my.id/akhiri_kursus.php', body)
  }

  kirimBuktiBerikutnyaService(data: FormData): Observable<any> {
    return this.http.post('https://tugas-akhir-bella.my.id/kirim_bukti_bayar_berikutnya.php', data)
  }

  cekKumpulanDetailBayarService(idortu:number,idlowongan:number,idguru: number): Observable<any> {
    // Untuk melakukan pembayaran selanjutnya
    let body = new HttpParams;
    body = body.set('idortu', idortu)
    body = body.set('idguru', idguru)
    body = body.set('idlowongan', idlowongan)
    return this.http.post('https://tugas-akhir-bella.my.id/cek_kumpulan_detail_bayar.php', body)
  }

  listRiwayatTransaksiService(idortu:number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idortu', idortu)
    return this.http.post("https://tugas-akhir-bella.my.id/riwayat_transaksi_orang_tua.php", body);
  }

  detailProfilKumpulanGuruPrivatSerivce(idguru: number): Observable<any> {
    // Menampilkan detail profil guru privat dari halaman kumpulan guru privat
    let body = new HttpParams;
    body = body.set('idguru', idguru)

    return this.http.post('https://tugas-akhir-bella.my.id/detail_profil_guru_privat.php', body)
  }

  listGuruPrivatService(search_keahlian: string, search_jenjang: string, search_gender:string): Observable<any> {
    let body = new HttpParams;
    body = body.set('search_keahlian', search_keahlian)
    body = body.set('search_jenjang', search_jenjang)
    body = body.set('search_gender', search_gender)
    return this.http.post("https://tugas-akhir-bella.my.id/list_kumpulan_guru.php", body);
  }

  editFotoService(data: FormData): Observable<any> {
    return this.http.post('https://tugas-akhir-bella.my.id/edit_ortu_foto.php', data)
  }
  
  editPassService(pass: string,email:string): Observable<any> {
    let body = new HttpParams;
    body = body.set('pass', pass)
    body = body.set('email', email)

    return this.http.post('https://tugas-akhir-bella.my.id/edit_ortu_pass.php', body)
  }


  cekTglTagihan( idortu: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idortu', idortu)
    // body = body.set('idguru', idguru)
    // body = body.set('idlowongan', idlowongan)

    return this.http.post("https://tugas-akhir-bella.my.id/cek_tgl_tagihan.php", body);
  }

  chatKeGuruService(pesan: string, tgl: string, idortu: number, idguru: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('pesan', pesan)
    body = body.set('tgl', tgl)
    body = body.set('idortu', idortu)
    body = body.set('idguru', idguru)



    return this.http.post('https://tugas-akhir-bella.my.id/chat_ortu_guru.php', body)
  }

  detailPesanOrtuGuruService(idortu: number, idkepada: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idortu', idortu)
    body = body.set('idguru', idkepada)

    return this.http.post("https://tugas-akhir-bella.my.id/detail_pesan_ortu_guru.php", body);
  }

  updateStatusPesanGuruService(idguru: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idguru', idguru)
    return this.http.post("https://tugas-akhir-bella.my.id/update_pesan_ortu_guru.php", body);
  }

  listPesanOrtuGuruService(idortu: number): Observable<any> {
    // return this.http.get("https://tugas-akhir-bella.my.id/list_chat_ortu_guru.php");

    let body = new HttpParams;
    body = body.set('idortu', idortu)
    return this.http.post("https://tugas-akhir-bella.my.id/list_chat_ortu_guru.php", body);
  }


  updateStatusPesanKursusService(idkursus: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idkursus', idkursus)
    return this.http.post("https://tugas-akhir-bella.my.id/update_pesan_ortu_kursus.php", body);
  }


  detailPesanOrtuKursusService(idortu: number, idkepada: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idortu', idortu)
    body = body.set('idkursus', idkepada)

    return this.http.post("https://tugas-akhir-bella.my.id/detail_pesan_ortu_kursus.php", body);
  }

  listPesanOrtuKursusService(idortu: number): Observable<any> {
    // return this.http.get("https://tugas-akhir-bella.my.id/list_chat_ortu_kursus.php");

    let body = new HttpParams;
    body = body.set('idortu', idortu)
    return this.http.post("https://tugas-akhir-bella.my.id/list_chat_ortu_kursus.php", body);
  }


  chatKeKursusService(pesan: string, tgl: string, idortu: number, idkursus: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('pesan', pesan)
    body = body.set('tgl', tgl)
    body = body.set('idortu', idortu)
    body = body.set('idkursus', idkursus)



    return this.http.post('https://tugas-akhir-bella.my.id/chat_ortu_kursus.php', body)
  }

  editProfilSerivce(alamat: string, lat: string, long: string, jenisKel: string, telepon: string,
    nama_siswa: string, nama_ortu: string, kec: string, kel: string, kota: string, prov: string, email: string): Observable<any> {
    let body = new HttpParams;
    body = body.set('alamat', alamat)
    body = body.set('lat', lat)
    body = body.set('long', long)
    body = body.set('jenisKel', jenisKel)
    body = body.set('telepon', telepon)
    body = body.set('nama_siswa', nama_siswa)
    body = body.set('nama_ortu', nama_ortu)
    body = body.set('kecamatan', kec)
    body = body.set('kelurahan', kel)
    body = body.set('kota', kota)
    body = body.set('provinsi', prov)
    body = body.set('email', email)
    return this.http.post('https://tugas-akhir-bella.my.id/edit_profil_ortu.php', body)
  }

  historyKontrakGuruSerivce(idguru: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idguru', idguru)
    return this.http.post('https://tugas-akhir-bella.my.id/history_kontrak.php', body)
  }
  historyUlasanGuruSerivce(idguru: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idguru', idguru)
    return this.http.post('https://tugas-akhir-bella.my.id/history_ulasan_guru_privat.php', body)
  }

  listAdminService(): Observable<any> {
    return this.http.get("https://tugas-akhir-bella.my.id/list_admin.php");
  }
  kirimBuktiService(data: FormData): Observable<any> {
    return this.http.post('https://tugas-akhir-bella.my.id/kirim_bukti_bayar.php', data)
  }

  detailBayarSerivce(idLowongan: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idLowongan', idLowongan)
    return this.http.post('https://tugas-akhir-bella.my.id/detail_bayar.php', body)
  }

  detailKontrakSerivce(idLowongan: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idLowongan', idLowongan)
    return this.http.post('https://tugas-akhir-bella.my.id/detail_kontrak_ortu.php', body)
  }


  isiAbsenService(idortu: number, idabsen: number, tanggal: string): Observable<any> {
    let body = new HttpParams;
    body = body.set('idortu', idortu)
    body = body.set('idabsen', idabsen)
    body = body.set('tanggal_isi', tanggal)

    return this.http.post("https://tugas-akhir-bella.my.id/isi_absen.php", body);
  }

  listAbsenService(id: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idlowongan', id)
    return this.http.post("https://tugas-akhir-bella.my.id/list_riwayat_absen_ortu.php", body);
  }

  listKursusPrivatOrtuService(id: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idortu', id)
    return this.http.post("https://tugas-akhir-bella.my.id/list_kursus_privat_ortu.php", body);
  }

  terimaPendaftarSerivce(idLowongan: number, idPendaftar: number, idOrtu: number,
    kesepakatan: string, biaya: number, tgl_kontrak: string
    , idadmin: number
  ): Observable<any> {
    let body = new HttpParams;
    body = body.set('idLowongan', idLowongan)
    body = body.set('idPendaftar', idPendaftar)
    body = body.set('idOrtu', idOrtu)
    body = body.set('kesepakatan', kesepakatan)
    body = body.set('biaya', biaya)
    body = body.set('tgl_kontrak', tgl_kontrak)
    body = body.set('idadmin', idadmin)

    // body = body.set('tgl_tagihan', tgl_tagihan)





    return this.http.post('https://tugas-akhir-bella.my.id/terima_lowongan.php', body)
  }

  detailPendaftarSerivce(idLowongan: number, idPendaftar: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idLowongan', idLowongan)
    body = body.set('idPendaftar', idPendaftar)

    return this.http.post('https://tugas-akhir-bella.my.id/detail_pendaftar.php', body)
  }

  listPendaftarService(idlowongan: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idlowongan', idlowongan)
    return this.http.post('https://tugas-akhir-bella.my.id/list_pendaftar.php', body)
  }

  editNonaktifLowonganService(idlowongan: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idlowongan', idlowongan)
    return this.http.post('https://tugas-akhir-bella.my.id/edit_nonaktifkan_lowongan.php', body)
  }

  editLowonganService(biaya: number, banyak_pertemuan: number, metode: string,
    durasi: number, tgl_mulai: string, judul: string,
    deskripsi: string, jenjang: string, idortu: number,
    idkeahlian: number, alamat: string,
    kecamatan: string, kelurahan: string,
    lat: string, long: string, jadwal: string, provinsi: string,
    kota: string,
    idlowongan: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('biaya_jasa', biaya)
    body = body.set('banyak_pertemuan', banyak_pertemuan)
    body = body.set('metode', metode)
    body = body.set('durasi', durasi)
    body = body.set('tgl_mulai', tgl_mulai)
    body = body.set('judul', judul)
    body = body.set('deskripsi', deskripsi)
    body = body.set('jenjang', jenjang)
    body = body.set('idortu', idortu)
    body = body.set('idkeahlian', idkeahlian)
    body = body.set('alamat', alamat)
    body = body.set('kecamatan', kecamatan)
    body = body.set('kelurahan', kelurahan)

    body = body.set('lat', lat)
    body = body.set('long', long)
    body = body.set('jadwal', jadwal)
    body = body.set('provinsi', provinsi)
    body = body.set('kota', kota)


    body = body.set('idlowongan', idlowongan)
    return this.http.post('https://tugas-akhir-bella.my.id/edit_lowongan.php', body)
  }

  detailLowonganService(idlowongan: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('id', idlowongan)
    return this.http.post('https://tugas-akhir-bella.my.id/detail_lowongan.php', body)
  }

  listPostinganLowonganService(idortu: number): Observable<any> {
    let body = new HttpParams;
    body = body.set('idortu', idortu)
    return this.http.post('https://tugas-akhir-bella.my.id/list_postingan_lowongan.php', body)
  }

  bukaLowonganService(biaya_jasa: number, banyak_pertemuan: number, metode: string, durasi: number,
    tgl_mulai: string, judul_lowongan: string, deskripsi: string, jenjang: string, idortu: number, idkeahlian: number,
    alamat: string, kecamatan: string, kelurahan: string, loc_x: number, loc_y: number, jadwal: string,
    prov: string, tgl_buka_lowongan: string, kota: string): Observable<any> {
    let body = new HttpParams;
    body = body.set('biaya_jasa', biaya_jasa)
    body = body.set('banyak_pertemuan', banyak_pertemuan)
    body = body.set('metode_privat', metode)
    body = body.set('durasi_privat', durasi)
    body = body.set('tgl_mulai', tgl_mulai)
    body = body.set('judul_lowongan', judul_lowongan)
    body = body.set('deskripsi', deskripsi)
    body = body.set('jenjang', jenjang)
    body = body.set('idorang_tua', idortu)
    body = body.set('idkeahlian', idkeahlian)
    body = body.set('alamat', alamat)
    body = body.set('kecamatan', kecamatan)
    body = body.set('kelurahan', kelurahan)


    body = body.set('lokasi_lat', loc_x)
    body = body.set('lokasi_long', loc_y)
    body = body.set('jadwal', jadwal)
    body = body.set('prov', prov)
    body = body.set('tgl_buka_lowongan', tgl_buka_lowongan)
    body = body.set('kota', kota)








    // jadwal.forEach((item, i) => {
    //   body = body.set("jadwal[" + i + "][hari]", item.hari)
    //   body = body.set("jadwal[" + i + "][pukul]", item.pukul)
    //   body = body.set("jadwal[" + i + "][sampai]", item.sampai)
    // })
    return this.http.post('https://tugas-akhir-bella.my.id/buka_lowongan.php', body)


  }

  profilService(email: string): Observable<any> {
    let body = new HttpParams;
    body = body.set('email', email)
    return this.http.post('https://tugas-akhir-bella.my.id/profil_ortu.php', body)


  }
  

  // registerService(email: string, password: string, nama_ortu: string,
  //   jenis_kelamin: string, telepon: string,
  //   nama_siswa: string, alamat: string, kecamatan: string, kelurahan: string, kota: string, prov: string, lat: number, long: number): Observable<any> {

  //   let body = new HttpParams;
  //   body = body.set('email', email)
  //   body = body.set('password', password)
  //   body = body.set('nama_ortu', nama_ortu)
  //   body = body.set('jenis_kelamin', jenis_kelamin)
  //   body = body.set('telepon', telepon)
  //   body = body.set('nama_siswa', nama_siswa)
  //   body = body.set('alamat', alamat)
  //   body = body.set('kecamatan', kecamatan)
  //   body = body.set('kelurahan', kelurahan)
  //   body = body.set('kota', kota)
  //   body = body.set('prov', prov)

  //   // body = body.set('lat', lat)
  //   // body = body.set('long', long)
  //   return this.http.post('https://tugas-akhir-bella.my.id/register_ortu.php', body)

  // }
  registerService(data: FormData): Observable<any> {
    return this.http.post('https://tugas-akhir-bella.my.id/register_ortu.php', data)
  }

  constructor(private http: HttpClient) { }
}
