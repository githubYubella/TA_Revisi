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
  jenisKelamin_dipilih = ''
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
  checkBoxterpilih: string[]

  location: LatLng


  constructor(private ot: OrangTuaService, private router: Router) { }

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

  async register_orang_tua() {
    const splitProv = this.provinsi.split('_')
    const splitKota = this.kota.split('_')
    const splitKec = this.kecamatan.split('_')
    const splitKel = this.kelurahan.split('_')
    // const prov = splitProv[1]
    // const city = splitKota[1]
    // const kec = splitKec[1]
    // const kel = splitKel[1]
    this.provinsi = splitProv[1]
   this.kota = splitKota[1]
    this.kecamatan= splitKec[1]
    this.kelurahan = splitKel[1]
    // this.alamat_lengkap = this.alamat + ", " + city + ", " + kec + ", " + kel + ", " + prov
    this.alamat_lengkap = this.alamat + ", " + this.kota + ", " + this.kecamatan + ", " + this.kelurahan + ", " + this.provinsi
    
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

       
        // console.log('lat: ' + this.location.lat)
        // console.log('long: ' + this.location.lng)

      }


    )
    console.log('lat: ' + this.location.lat)
    console.log('long: ' + this.location.lng)
    this.ot.registerService(this.email, this.password, this.nama, this.jenisKelamin_dipilih,
      this.telepon, this.nama_siswa, this.alamat, this.kecamatan, this.kelurahan, this.kota, this.provinsi,this.location.lat,this.location.lng).subscribe(
        (data) => {
          if (data['result'] == 'success') {
            alert("Register Success")
            this.router.navigate(['/'])

          } else {
            alert("Register Error : " + "Email atau Password tidak boleh kosong.")
          }
        }
      )
  }
  async ngOnInit() {
    fetch('http://dev.farizdotid.com/api/daerahindonesia/provinsi').then(res => res.json())
      .then(json => {
        this.provinsi_list = json['provinsi']
        // console.log(json['provinsi'])


      });
   }

}
