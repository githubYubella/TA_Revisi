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
    // this.titik()
    // console.log("det "+this.location.lat)

    const splitProv = this.provinsi.split('_')
    const splitKota = this.kota.split('_')
    const splitKec = this.kecamatan.split('_')
    const splitKel = this.kelurahan.split('_')
    const prov = splitProv[1]
    const city = splitKota[1]
    const kec = splitKec[1]
    const kel = splitKel[1]
    this.alamat_lengkap = this.alamat + ", " + city + ", " + kec + ", " + kel + ", " + prov
    
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

    // console.log( this.location.lat+ ", pp" + this.location.lng)
    // console.log( this.input_x + ", pp" 00+ this.input_y)


    // console.log(this.checkBoxterpilih)


    // console.log( this.input_x+"," +   this.input_y )

    uploadData.append('email', this.email);
    uploadData.append('password', this.password);
    uploadData.append('nama', this.nama);
    uploadData.append('informasi', this.informasi);
    uploadData.append('alamat', this.alamat);

    uploadData.append('kecamatan', kec);
    uploadData.append('kelurahan', kel);
    uploadData.append('provinsi', prov);
    uploadData.append('kota', city);
    uploadData.append('image', this.image, this.image.name);
    ///
    console.log('keahlian dipilih:')
    this.keahlianDipilih.forEach((cb, i) => {
      console.log(this.keahlian_list[i].nama + '(' + this.keahlian_list[i].idkeahlian + '): ' + cb)
      if (cb === true) {
        uploadData.append('idkeahlian[]', this.keahlian_list[i].idkeahlian);
      }
    })

    // console.log("alamat lengkap: " + this.alamat_lengkap)

    this.tk.registerService(uploadData).subscribe((resp) => {
      console.log(resp);
      if (resp['result'] == 'success') {
        alert("Register Success")
        this.router.navigate(['/'])


      }
      else {
        alert("Register Error : " + resp['message'])
      } 
    })

    //--
    // this.http.post('https://list-coba.000webhostapp.com/upload2.php', uploadData).subscribe(res => {
    //   console.log(res);
    //   if (res['result'] == 'sukses') {
    //     alert('Sukses')
    //   } else {
    //     alert('gagal')
    //   }
    // });
  }

  constructor(private router: Router, public geo: Geolocation, public tk: TempatKursusService) { }

  async ngOnInit() {
    this.category()
    // this.tujuan()
    fetch('http://dev.farizdotid.com/api/daerahindonesia/provinsi').then(res => res.json())
      .then(json => {
        this.provinsi_list = json['provinsi']
        // console.log(json['provinsi'])


      });

  }








}
