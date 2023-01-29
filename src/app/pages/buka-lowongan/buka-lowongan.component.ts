import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TempatKursusService } from '../../services/tempat-kursus/tempat-kursus.service';
import { format } from "date-fns";
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';
import { Router } from '@angular/router';
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
import { ForwardOptions, NativeGeocoder } from '@capgo/nativegeocoder';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-buka-lowongan',
  templateUrl: './buka-lowongan.component.html',
  styleUrls: ['./buka-lowongan.component.scss'],
})
export class BukaLowonganComponent implements OnInit {

  nama = ''
  id: number
  email = ''

  keahlian_list = []
  jadwal = [
    { hari: 'Senin', checked: false, disabled: false, pukul: null, sampai: null },
    { hari: 'Selasa', checked: false, disabled: false, pukul: null, sampai: null },
    { hari: 'Rabu', checked: false, disabled: false, pukul: null, sampai: null },
    { hari: 'Kamis', checked: false, disabled: false, pukul: null, sampai: null },
    { hari: 'Jumat', checked: false, disabled: false, pukul: null, sampai: null },
    { hari: 'Sabtu', checked: false, disabled: false, pukul: null, sampai: null },
    { hari: 'Minggu', checked: false, disabled: false, pukul: null, sampai: null },
  ]
  judul_lowongan = ''
  deskripsi_lowongan = ''
  jenjang_dipilih = ''
  kategori_dipilih: number
  metode_dipilih = ''
  durasi_lowongan: number
  banyak_pertemuan: number = 1
  biaya_jasa: number
  tanggal_mulai = ''
  alamat = ''



  jadwal_kursus: string
  provinsi_list: []
  provinsi = ''
  kota_list: []
  kota = ''
  kecamatan_list: []
  kecamatan: string
  kelurahan_list: []
  kelurahan: string
  alamat_lengkap: string
  keahlian_dipilih: string[] = []
  checkBoxterpilih: string[]
  location: LatLng

  constructor(public ot: OrangTuaService, public tk: TempatKursusService, private authService: AuthService,
    private router: Router) {
    this.email = authService.email
  }

  async setTimePukul(i, event) {
    let pukul = format(new Date(event.target.value), "HH:mm")
    console.log('setTimePukul(' + i + '): ' + pukul)
    this.jadwal[i].pukul = pukul
  }

  async setTimeSampai(i, event) {
    let sampai = format(new Date(event.target.value), "HH:mm")
    console.log('setTimeSampai(' + i + '): ' + sampai)
    this.jadwal[i].sampai = sampai

  }
  async setTanggalMulai(event) {
    this.tanggal_mulai = format(new Date(event.target.value), "yyyy-MM-dd")
    // console.log('tgl_mulai'+this.tanggal_mulai)
  }

  async getProfil() {
    this.ot.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.nama = data['data'][0].nama_orang_tua
          this.id = data['data'][0].idorang_tua
          console.log("anu" + this.nama + ", ID: " + this.id)
        }
      }
    )
  }

  onShowKotaKab(event) {
    if (this.provinsi != '') {
      var valProv = this.provinsi.split('_')
      // console.log(a[0])
      fetch('https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=' + valProv[0]).then(res => res.json())
        .then(json => {
          this.kota_list = json['kota_kabupaten']
          // console.log(json)
        });

    }
  }

  onShowKecamatan(event) {
    if (this.kota != '') {
      var valKota = this.kota.split('_')
      // console.log(a[0])
      fetch('https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=' + valKota[0]).then(res => res.json())
        .then(json => {
          this.kecamatan_list = json['kecamatan']
          // console.log(json)
        });

    }
  }

  onShowKelurahan(event) {
    if (this.kecamatan != '') {
      var valKec = this.kecamatan.split('_')
      // console.log(valKec[0])
      fetch('https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=' + valKec[0]).then(res => res.json())
        .then(json => {
          this.kelurahan_list = json['kelurahan']
          // console.log(json)
        });

    }
  }

  async submit() {
    console.log('save')
    console.log(this.tanggal_mulai)
    console.log(this.kategori_dipilih)
    console.log(this.metode_dipilih)

    let chechBoxterpilih = this.jadwal.filter((item) => item.checked)
    // console.log(terpilih)
    // this.tk.simpanJadwal(terpilih).subscribe(
    //   data => {
    //     console.log(data)
    //   }
    // )
    //  let terpilih = this.jadwal.filter((item) => item.checked)
    const splitProv = this.provinsi.split('_')
    const splitKota = this.kota.split('_')
    const splitKec = this.kecamatan.split('_')
    const splitKel = this.kelurahan.split('_')
    this.provinsi = splitProv[1]
    this.kota = splitKota[1]
    this.kecamatan = splitKec[1]
    this.kelurahan = splitKel[1]
    this.alamat_lengkap = this.alamat + ", " + this.kota + ", " + this.kecamatan + ", " + this.kelurahan + ", " + this.provinsi
    var today = format(new Date(), "yyyy-MM-dd")
      


    const op: ForwardOptions = {
      'addressString': this.alamat_lengkap,
      'apiKey': environment.key,
      'maxResults': 5

    }
    await NativeGeocoder.forwardGeocode(op).then(
      (res) => {
        this.location = {
          lat: res.addresses[0].latitude,
          lng: res.addresses[0].longitude
        }

      }
    )
    this.ot.bukaLowonganService(this.biaya_jasa, this.banyak_pertemuan, this.metode_dipilih,
      this.durasi_lowongan, this.tanggal_mulai, this.judul_lowongan, this.deskripsi_lowongan, this.jenjang_dipilih,
      this.id, this.kategori_dipilih,
      // chechBoxterpilih,
      this.alamat, this.kecamatan, this.kelurahan, this.location.lat, this.location.lng,
       this.jadwal_kursus, this.provinsi,today,this.kota).subscribe(
        data => {
          if (data['result'] == 'success') {
            alert('data berhasil disimpan')
            this.router.navigateByUrl('/')

            this.judul_lowongan = ''
            this.deskripsi_lowongan = ''
            this.jenjang_dipilih = ''
            this.metode_dipilih = ''
            this.tanggal_mulai = ''
            this.kategori_dipilih = 0
            this.durasi_lowongan = null
            this.banyak_pertemuan = null
            this.biaya_jasa = null
            this.alamat = ''
            this.kecamatan = ''
            this.kelurahan = ''
            this.kota = ''



            // this.jadwal['checked']=false
            // tanggal




            // this.location = {
            //   lat: parseFloat(data['data'][0].lokasi_lat),
            //   lng: parseFloat(data['data'][0].lokasi_long)
            // }
            // this.lokasi()
          } else {
            alert('data gagal disimpan')
          }
        }
      )


    // console.log(terpilih)
    // this.tk.simpanJadwal(terpilih).subscribe(
    //   data => {
    //     console.log(data)
    //   }
    // )
  }

  category() {
    this.tk.listKeahlianService().subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.keahlian_list = data['data']

        }
      }
    )
  }

  async ngOnInit() {
    this.category()

    this.getProfil()
    fetch('http://dev.farizdotid.com/api/daerahindonesia/provinsi').then(res => res.json())
      .then(json => {
        this.provinsi_list = json['provinsi']
        // console.log(json['provinsi'])


      });
  }


}

