import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
import { ForwardOptions, NativeGeocoder } from '@capgo/nativegeocoder';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-orang-tua',
  templateUrl: './register-orang-tua.component.html',
  styleUrls: ['./register-orang-tua.component.scss'],
})
export class RegisterOrangTuaComponent implements OnInit {
  email = ''
  password = ''
  nama = ''
  jenisKelamin_dipilih = 'Pria'
  telepon = ''
  nama_siswa = ''
  alamat = ''
  input_x: number
  input_y: number

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

  location: LatLng

  image: any

  constructor(private ot: OrangTuaService, private router: Router) { }

  onFileSelected(event) {
    // console.log(event)
    this.image = event.target.files[0]
    // this.conString=this.selected.readAsText(this.selected,'s')
    console.log(this.image)
  }

  // onShowKotaKab(event) {
  //   if (this.provinsi != '') {
  //     var valProv = this.provinsi.split('_')
  //     // console.log(a[0])
  //     fetch('https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=' + valProv[0]).then(res => res.json())
  //       .then(json => {
  //         this.kota_list = json['kota_kabupaten']
  //         // console.log(json)
  //       });

  //   }
  // }

  // onShowKecamatan(event) {
  //   if (this.kota != '') {
  //     var valKota = this.kota.split('_')
  //     // console.log(a[0])
  //     fetch('https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=' + valKota[0]).then(res => res.json())
  //       .then(json => {
  //         this.kecamatan_list = json['kecamatan']
  //         // console.log(json)
  //       });

  //   }
  // }

  // onShowKelurahan(event) {
  //   if (this.kecamatan != '') {
  //     var valKec = this.kecamatan.split('_')
  //     // console.log(valKec[0])
  //     fetch('https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=' + valKec[0]).then(res => res.json())
  //       .then(json => {
  //         this.kelurahan_list = json['kelurahan']
  //         // console.log(json)
  //       });

  //   }
  // }

  async register_orang_tua() {
    // const splitProv = this.provinsi.split('_')
    // const splitKota = this.kota.split('_')
    // const splitKec = this.kecamatan.split('_')
    // const splitKel = this.kelurahan.split('_')
    // const prov = splitProv[1]
    // const city = splitKota[1]
    // const kec = splitKec[1]
    // const kel = splitKel[1]

    // this.provinsi = splitProv[1]
    // this.kota = splitKota[1]
    // this.kecamatan = splitKec[1]
    // this.kelurahan = splitKel[1]
    // this.alamat_lengkap = this.alamat + ", " + city + ", " + kec + ", " + kel + ", " + prov
    this.alamat_lengkap = this.alamat + ", " + this.kota + ", " + this.kecamatan + ", " + this.kelurahan + ", " + this.provinsi

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
      }
    )

    console.log('lat: ' + this.location.lat)
    console.log('long: ' + this.location.lng)
    if (this.image == null) {
      alert("Harap upload file ")
    }
    // else if (this.email == null || this.password == null || this.nama == null ||
    //   this.jenisKelamin_dipilih == null || this.telepon == null || this.nama_siswa == null ||
    //   this.alamat == null || this.kecamatan == null || this.kelurahan == null || this.provinsi == null ||
    //   this.kota == null) {

    // }
    else {
      if (this.email == '' || this.password == '' || this.nama == '' ||
        this.jenisKelamin_dipilih == '' || this.telepon == '' || this.nama_siswa == '' ||
        this.alamat == '' || this.kecamatan == '' || this.kelurahan == '' || this.provinsi == '' ||
        this.kota == '') {
        alert("Harap lengkapi data ")
      } else {
        uploadData.append('email', this.email);
        uploadData.append('password', this.password);
        uploadData.append('nama_ortu', this.nama);
        uploadData.append('jenis_kelamin', this.jenisKelamin_dipilih);
        uploadData.append('telepon', this.telepon);
        uploadData.append('nama_siswa', this.nama_siswa);

        uploadData.append('alamat', this.alamat);

        uploadData.append('kecamatan', this.kecamatan);
        uploadData.append('kelurahan', this.kelurahan);
        uploadData.append('prov', this.provinsi);
        uploadData.append('kota', this.kota);
        uploadData.append('image', this.image, this.image.name);

        this.ot.registerService(uploadData).subscribe((resp) => {
          console.log(resp);
          if (resp['result'] == 'success') {
            alert("Register Success")
            this.router.navigate(['/'])
          }
          else {
            alert("Register Error : Proses gagal. Masukkan email yang lain.")
          }
        })
      }
    }

  }
  async ngOnInit() {
    // fetch('http://dev.farizdotid.com/api/daerahindonesia/provinsi').then(res => res.json())
    //   .then(json => {
    //     this.provinsi_list = json['provinsi']
    //     // console.log(json['provinsi'])


    //   });
  }

}
