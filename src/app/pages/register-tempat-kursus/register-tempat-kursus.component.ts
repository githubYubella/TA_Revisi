import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { CapacitorGoogleMaps } from '@capacitor/google-maps/dist/typings/implementation';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { environment } from 'src/environments/environment';
import { TempatKursusService } from '../../services/tempat-kursus/tempat-kursus.service';
import { Router } from '@angular/router';
import { ForwardOptions, NativeGeocoder } from '@capgo/nativegeocoder';
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
@Component({
  selector: 'app-register-tempat-kursus',
  templateUrl: './register-tempat-kursus.component.html',
  styleUrls: ['./register-tempat-kursus.component.scss'],
})
export class RegisterTempatKursusComponent {
  // @ViewChild('map') map: ElementRef<HTMLElement>;
  // newMapw: GoogleMap;
  // loc_x: number
  // loc_y: number
  email: string = ""
  password: string = ""
  nama: string = ""
  informasi: string = ""
  alamat: string = ""
  gambar: string = ""
  image: any
  file: any
  keahlian_list = []
  dipilih: number
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
  keahlianDipilih = []
  location: LatLng


  onFileSelected(event) {
    // console.log(event)
    this.image = event.target.files[0]
    // this.conString=this.selected.readAsText(this.selected,'s')
    console.log(this.image)
  }
  onFileSelected2(event) {
    // console.log(event)
    this.file = event.target.files[0]
    // this.conString=this.selected.readAsText(this.selected,'s')
    console.log(this.file)
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


  category() {
    this.tk.listKeahlianService().subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.keahlian_list = data['data']
          this.keahlianDipilih = new Array(this.keahlian_list.length)
        }
      }
    )
  }



  async register() {
    // const splitProv = this.provinsi.split('_')
    // const splitKota = this.kota.split('_')
    // const splitKec = this.kecamatan.split('_')
    // const splitKel = this.kelurahan.split('_')
    // const prov = splitProv[1]
    // const city = splitKota[1]
    // const kec = splitKec[1]
    // const kel = splitKel[1]
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
        console.log('lat: ' + this.location.lat)
        console.log('long: ' + this.location.lng)
      }
    )
    ///
    console.log('keahlian dipilih:')
    this.keahlianDipilih.forEach((cb, i) => {
      console.log(this.keahlian_list[i].nama + '(' + this.keahlian_list[i].idkeahlian + '): ' + cb)
      if (cb === true) {
        uploadData.append('idkeahlian[]', this.keahlian_list[i].idkeahlian);
      }
    })

    if (this.file == null || this.image == null) {
      alert("Harap upload file ")
      // this.file = ""
    } else {
      if (this.email == '' || this.password == '' || this.nama == '' ||
        this.informasi == '' ||
        this.alamat == '' || this.kecamatan == '' || this.kelurahan == '' || this.provinsi == '' ||
        this.kota == '' || this.keahlianDipilih == null) {
        alert("Harap lengkapi data ")
      } else {
        uploadData.append('email', this.email);
        uploadData.append('password', this.password);
        uploadData.append('nama', this.nama);
        uploadData.append('informasi', this.informasi);
        uploadData.append('alamat', this.alamat);

        uploadData.append('kecamatan', this.kecamatan);
        uploadData.append('kelurahan', this.kelurahan);
        uploadData.append('provinsi', this.provinsi);
        uploadData.append('kota', this.kota);
        uploadData.append('image', this.image, this.image.name);
        uploadData.append('berkas_dokumen', this.file, this.file.name);
        // console.log("alamat lengkap: " + this.alamat_lengkap)
        // console.log("testi: "+this.alamat_lengkap)
        //   console.log('lat: ' + this.location.lat)
        //   console.log('long: ' + this.location.lng)
        this.tk.registerService(uploadData).subscribe((resp) => {
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

  constructor(private router: Router, public geo: Geolocation, public tk: TempatKursusService) { }

  async ngOnInit() {
    this.category()
    // this.tujuan()
    // fetch('http://dev.farizdotid.com/api/daerahindonesia/provinsi').then(res => res.json())
    //   .then(json => {
    //     this.provinsi_list = json['provinsi']
    //     // console.log(json['provinsi'])

    //   });

  }








}
