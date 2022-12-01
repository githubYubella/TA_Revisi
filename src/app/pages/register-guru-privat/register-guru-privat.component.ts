import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
import { ForwardOptions, NativeGeocoder } from '@capgo/nativegeocoder';
import { format } from 'date-fns';
import { GuruPrivatService } from 'src/app/services/guru-privat/guru-privat.service';
import { TempatKursusService } from 'src/app/services/tempat-kursus/tempat-kursus.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-guru-privat',
  templateUrl: './register-guru-privat.component.html',
  styleUrls: ['./register-guru-privat.component.scss'],
})
export class RegisterGuruPrivatComponent implements OnInit {
  email = ''
  password = ''
  nama = ''
  jenisKelamin_dipilih = ''
  telepon = ''
  jenjang_dipilih = ''
  tempat_pendidikan = ''
  tgl_lahir = ''
  input_x = ''
  input_y = ''
  gambar = ''
  alamat = ''
  image: any
  berkas: any
  pengalaman = ''

  keahlian_list = []


  provinsi_list: []
  provinsi = ''
  kota_list: []
  kota = ''
  kecamatan_list: []
  kecamatan: string
  kelurahan_list: []
  kelurahan: string
  alamat_lengkap: string
  keahlianDipilih = []
  location:LatLng



  constructor(private tk: TempatKursusService, private router: Router, private gp: GuruPrivatService) { }

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
  async setTanggalLahir(event) {
    this.tgl_lahir = format(new Date(event.target.value), "yyyy-MM-dd")
    console.log('tgl_mulai' + this.tgl_lahir)
  }
  checked
  category() {

    this.tk.listKeahlianService().subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.keahlian_list = data['data']
          this.checked = false

        }

      }
    )
  }

  onFileSelectedGambar(event) {
    // console.log(event)
    this.image = event.target.files[0]
    // this.berkas = event.target.files[1]

    // this.conString=this.selected.readAsText(this.selected,'s')
    console.log(this.image)
    // console.log(this.berkas)

  }

  
  async register_guru_privat() {
    const splitProv = this.provinsi.split('_')
    const splitKota = this.kota.split('_')
    const splitKec = this.kecamatan.split('_')
    const splitKel = this.kelurahan.split('_')
    this.provinsi = splitProv[1]
    this.kota = splitKota[1]
   this.kecamatan = splitKec[1]
    this.kelurahan = splitKel[1]
    this.alamat_lengkap = this.alamat + ", " + this.kota + ", " + this.kecamatan + ", " + this.kelurahan + ", " + this.provinsi
    console.log('mat alamat'+this.alamat_lengkap)
    const uploadData = new FormData();
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

        uploadData.append('lat', this.location.lat.toString());
        uploadData.append('long', this.location.lng.toString());
        // console.log('lat: ' + this.location.lat)
        // console.log('long: ' + this.location.lng)

      }
    )
    this.keahlianDipilih.forEach((cb, i) => {
      console.log(this.keahlian_list[i].nama + '(' + this.keahlian_list[i].idkeahlian + '): ' + cb)
      if (cb === true) {
        uploadData.append('idkeahlian[]', this.keahlian_list[i].idkeahlian);
      }
    })

    uploadData.append('email', this.email);
    uploadData.append('password', this.password);
    uploadData.append('jenis_kelamin', this.jenisKelamin_dipilih);
    // uploadData.append('berkas_cv',this.berkas.files, this.berkas.name);

    uploadData.append('tempat_jenjang_terakhir', this.tempat_pendidikan);
    uploadData.append('jenjang_terakhir', this.jenjang_dipilih.toString());
    uploadData.append('telepon', this.telepon);
    uploadData.append('nama', this.nama);
    uploadData.append('image', this.image, this.image.name);
    uploadData.append('tgl_lahir', this.tgl_lahir);
    uploadData.append('pengalaman', this.pengalaman);


    uploadData.append('alamat', this.alamat);

    uploadData.append('kec', this.kecamatan);
    uploadData.append('kel', this.kelurahan);
    uploadData.append('kota', this.kota);
    uploadData.append('prov', this.provinsi);


    this.gp.registergpService(uploadData).subscribe((resp) => {
      const parse = JSON.parse(JSON.stringify(resp))
      console.log(resp);
      if (parse['result'] == 'success') {
        alert("Register Success")
        this.router.navigate(['/'])

      }
      else {
        alert("Register Error : " + resp['message'])
      }
    })
  }

  async ngOnInit  () {
    this.category()

    fetch('http://dev.farizdotid.com/api/daerahindonesia/provinsi').then(res => res.json())
      .then(json => {
        this.provinsi_list = json['provinsi']
        // console.log(json['provinsi'])


      });
  }

}
