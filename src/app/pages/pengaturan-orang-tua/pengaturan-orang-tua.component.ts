import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
import { ForwardOptions, NativeGeocoder } from '@capgo/nativegeocoder';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pengaturan-orang-tua',
  templateUrl: './pengaturan-orang-tua.component.html',
  styleUrls: ['./pengaturan-orang-tua.component.scss'],
})
export class PengaturanOrangTuaComponent implements OnInit {
  email = ''
  nama_ortu = ''
  nama_siswa = ''
  gambar = ''
  alamat = ''
  image: any
  telepon = ''
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
  jenisKelamin_dipilih = ''

  constructor(private ot: OrangTuaService, private router: Router, private authService: AuthService) {
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
    this.ot.editFotoService(uploadData).subscribe((resp) => {

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
    this.ot.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.nama_ortu = data['data'][0].nama_orang_tua
          this.nama_siswa = data['data'][0].nama_siswa
          this.alamat = data['data'][0].alamat
          this.kecamatan = data['data'][0].kecamatan
          this.kelurahan = data['data'][0].kelurahan
          this.kota = data['data'][0].kota
          this.provinsi = data['data'][0].provinsi
          this.telepon = data['data'][0].no_telepon
          this.id = data['data'][0].idorang_tua
          this.jenisKelamin_dipilih = data['data'][0].jenis_kelamin
          this.gambar = data['data'][0].gambar


        }
      }
    )
  }
  // provinsi = ''
  // city = ''
  // kec = ''
  // kel = ''
  async editProfil() {
    const splitProv = this.provinsi.split('_')
    const splitKota = this.kota.split('_')
    const splitKec = this.kecamatan.split('_')
    const splitKel = this.kelurahan.split('_')
    // 
    const prov = splitProv[1]
    const city = splitKota[1]
    const kec = splitKec[1]
    const kel = splitKel[1]




    this.alamat_lengkap = this.alamat + ", " + city + ", " + kec + ", " + kel + ", " + prov
    // this.alamat_lengkap = this.alamat + ", " + this.kota + ", " + this.kecamatan + ", " + this.kelurahan + ", " + this.provinsi
    console.log('alamat lengkap: ' + this.alamat_lengkap)

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
        console.log('lat: ' + this.location.lat)
        console.log('long: ' + this.location.lng)


        this.ot.editProfilSerivce(this.alamat,this.location.lat.toString(),this.location.lng.toString(),
          this.jenisKelamin_dipilih,this.telepon,this.nama_siswa,this.nama_ortu,
          kec,kel,
          city,prov,

          this.email).subscribe(
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
    fetch('http://dev.farizdotid.com/api/daerahindonesia/provinsi').then(res => res.json())
      .then(json => {
        this.provinsi_list = json['provinsi']
      });
  }

}
