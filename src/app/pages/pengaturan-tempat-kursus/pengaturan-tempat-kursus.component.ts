import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
import { ForwardOptions, NativeGeocoder } from '@capgo/nativegeocoder';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { TempatKursusService } from '../../services/tempat-kursus/tempat-kursus.service';
@Component({
  selector: 'app-pengaturan-tempat-kursus',
  templateUrl: './pengaturan-tempat-kursus.component.html',
  styleUrls: ['./pengaturan-tempat-kursus.component.scss'],
})
export class PengaturanTempatKursusComponent {
  email: string = ''
  nama = ''
  informasi = ''
  gambar = ''
  alamat = ''
  image: any
  // telepon=''
  kecamatan_edit = ''
  kelurahan_edit = ''
  input_x_edit: number
  input_y_edit: number
  keahlian_list = []
  id: number
  keahlian_tempat_kursus: []

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


  constructor(private router: Router, private storage: Storage, public tk: TempatKursusService, private authService: AuthService) {
    this.email = authService.email
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
          this.tk.keahlianTempatKursusService(this.id).subscribe(
            (data) => {
              if (data['result'] == 'success') {
                /*
                keahlian_list = [
                  {
                    idkeahlian: 1,
                    nama: "IPA"
                  },
                  {
                    idkeahlian: 2,
                    nama: "IPS"
                  },
                ]
                keahlianDipilih = array yang length-nya sama dengan keahlian_list
                [
                  false, true
                ]
                data['data'] / keahlianTempatKursus = [
                  {
                    idkeahlian: 2,
                    idtempatkursus: x
                  }
                ]
                */
                data['data'].forEach((obj) => {
                  let index = this.keahlian_list.findIndex((keahlian) => {
                    return keahlian.idkeahlian === obj.idkeahlian
                  })
                  this.keahlianDipilih[index] = true
                })
                this.keahlian_tempat_kursus = data['data']
                // this.keahlian_tempat_kursus.forEach(element => {
                // // console.log('keahlian: '+this.keahlian_tempat_kursus)
                // console.log('keahlian: '+element)


                // });
              }
            }

          )



        }

      }
    )


    // this.tk.listProvinsi().subscribe(
    //   (data)=>{
    //     this.provinsi_list=data
    //   }
    // )
  }

  editKeahlian() {

    const uploadData = new FormData();

    uploadData.append('id', this.id.toString());
    this.keahlianDipilih.forEach((cb, i) => {
      console.log(this.keahlian_list[i].nama + '(' + this.keahlian_list[i].idkeahlian + '): ' + cb)
      if (cb === true) {
        uploadData.append('idkeahlian[]', this.keahlian_list[i].idkeahlian);
      }
    })
    // uploadData.append('idkeahlian[]', this.email);
    this.tk.editKeahlianService(uploadData).subscribe((resp) => {

      const parse = JSON.parse(JSON.stringify(resp))

      console.log('resp: ' + parse.result);
      if (resp['result'] == 'sukses') {
        alert("kategori berhasl di ubah")
        // this.router.navigate(['/home'])
        window.location.reload()
      }
      else {
        alert("Update Error : " + resp)
      }
    })

  }


  onFileSelected(event) {
    // console.log(event)
    this.image = event.target.files[0]
    // this.conString=this.selected.readAsText(this.selected,'s')
    console.log(this.image)
  }



  editFoto() {
    const uploadData = new FormData();
    uploadData.append('image', this.image, this.image.name);
    uploadData.append('email', this.email);
    this.tk.editFotoService(uploadData).subscribe((resp) => {

      const parse = JSON.parse(JSON.stringify(resp))

      console.log('resp: ' + parse.result);
      if (resp['result'] == 'sukses') {
        alert("Foto berhasl di ubah")
        // this.router.navigate(['/home'])
        window.location.reload()
      }
      else {
        alert("Update Error : " + resp)
      }
    })

  }


  async getProfil() {
    this.tk.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.nama = data['data'][0].nama
          this.informasi = data['data'][0].informasi
          this.gambar = data['data'][0].gambar
          this.alamat = data['data'][0].alamat
          this.kecamatan = data['data'][0].kecamatan
          this.kelurahan = data['data'][0].kelurahan
          // this.input_x = data['data'][0].lokasi_lat
          // this.input_y = data['data'][0].lokasi_long
          this.id = data['data'][0].idtempat_kursus
          // this.telepon = data['data'][0].telepon

          // this.keahlianDipilih=data['data'].idkeahlian
          // console.log(this.keahlianDipilih)

          // this.location = {
          //   lat: parseFloat(data['data'][0].lokasi_lat),
          //   lng: parseFloat(data['data'][0].lokasi_long)
          // }
          // this.lokasi()
        }
      }
    )
  }
  // idkeahlianList:number
  async editProfil() {

    const splitProv = this.provinsi.split('_')
    const splitKota = this.kota.split('_')
    const splitKec = this.kecamatan.split('_')
    const splitKel = this.kelurahan.split('_')
    const prov = splitProv[1]
    const city = splitKota[1]
    const kec = splitKec[1]
    const kel = splitKel[1]
    this.alamat_lengkap = this.alamat + ", " + city + ", " + kec + ", " + kel + ", " + prov


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

        // uploadData.append('lat', this.location.lat.toString());
        // uploadData.append('long', this.location.lng.toString());
        // console.log('lat: ' + this.location.lat)
        // console.log('long: ' + this.location.lng)


        this.tk.editProfilService(this.id, this.informasi, this.nama, this.alamat, kec,
          kel, this.location.lat, this.location.lng, this.email).subscribe(
            (data) => {
              if (data['result'] == 'success') {
                alert("Data Profil Berhasil di Edit")
                // this.router.navigate(['/'])
                window.location.reload()


              }
              else {
                alert("Data Profil Gagal di Edit");
                // this.router.navigate(['/'])

              }
            }
          )
      }


    )

    ///


  }



  async ngOnInit() {

    this.getProfil()
    this.category()
    fetch('http://dev.farizdotid.com/api/daerahindonesia/provinsi').then(res => res.json())
      .then(json => {
        this.provinsi_list = json['provinsi']
      });


  }

}