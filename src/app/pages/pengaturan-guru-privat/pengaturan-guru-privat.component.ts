import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
import { ForwardOptions, NativeGeocoder } from '@capgo/nativegeocoder';
import { format } from 'date-fns';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GuruPrivatService } from 'src/app/services/guru-privat/guru-privat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pengaturan-guru-privat',
  templateUrl: './pengaturan-guru-privat.component.html',
  styleUrls: ['./pengaturan-guru-privat.component.scss'],
})
export class PengaturanGuruPrivatComponent implements OnInit {
  email = ''
  saldo: number
  nama = ''
  telepon = ''
  keahlian: []
  jenjang_dipilih = ''
  tempat_pendidikan = ''
  tgl_lahir = ''
  alamat = ''
  location: LatLng
  pengalaman = ''
  gambar = ''
  idguru: number


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
  jenisKelamin_dipilih = ''
  keahlian_list = []
  keahlian_guru_privat: []
image:any
  constructor(private gp: GuruPrivatService, private authService: AuthService) {
    this.email = authService.email
  }
  category() {
    this.gp.listKeahlianService().subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.keahlian_list = data['data']
          this.keahlianDipilih = new Array(this.keahlian_list.length)
          this.gp.keahlianGuruService(this.idguru).subscribe(
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
                this.keahlian_guru_privat = data['data']
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

  getProfil() {
    this.gp.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.saldo = data['data'][0].dompet
          this.nama = data['data'][0].nama_guru_privat
          // this.saldo = data['data'][0].saldo
          this.jenisKelamin_dipilih = data['data'][0].jenis_kelamin
          this.telepon = data['data'][0].no_telepon
          this.jenjang_dipilih = data['data'][0].jenjang_terakhir
          this.tempat_pendidikan = data['data'][0].tempat_jenjang_terakhir
          this.tgl_lahir = data['data'][0].tgl_lahir
          this.alamat = data['data'][0].alamat
          this.kecamatan = data['data'][0].kecamatan
          this.kelurahan = data['data'][0].kelurahan
          this.pengalaman = data['data'][0].pengalaman
          this.gambar = data['data'][0].gambar
          this.idguru = data['data'][0].idguru_privat
          this.tgl_lahir = data['data'][0].tgl_lahir



          // get keahlian
          this.gp.keahlianGuruService(this.idguru).subscribe(
            (data) => {
              if (data['result'] == 'success') {
                this.keahlian = data['data']
              }
            }
          )

        }
      }
    )
  }

  async setTanggalLahir(event) {
    this.tgl_lahir = format(new Date(event.target.value), "yyyy-MM-dd")
    console.log('tgl_mulai' + this.tgl_lahir)
  }

  async editProfil() {

    const splitProv = this.provinsi.split('_')
    const splitKota = this.kota.split('_')
    const splitKec = this.kecamatan.split('_')
    const splitKel = this.kelurahan.split('_')
    this.provinsi = splitProv[1]
    this.kota = splitKota[1]
    this.kecamatan = splitKec[1]
    this.kelurahan = splitKel[1]
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

        // uploadData.append('lat', this.location.lat.toString());
        // uploadData.append('long', this.location.lng.toString());
        console.log('lat: ' + this.location.lat)
        console.log('long: ' + this.location.lng)


        this.gp.editProfilService(this.jenisKelamin_dipilih, this.tempat_pendidikan, this.jenjang_dipilih,
          this.location.lat.toString(), this.location.lng.toString(), this.telepon, this.nama, this.tgl_lahir, this.pengalaman, this.alamat,
          this.kecamatan, this.kelurahan, this.kota,this.provinsi,this.email).subscribe(
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
    this.gp.editFotoService(uploadData).subscribe((resp) => {

      const parse =  JSON.parse(JSON.stringify(resp))

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

  editKeahlian() {

    const uploadData = new FormData();

    uploadData.append('id', this.idguru.toString());
    this.keahlianDipilih.forEach((cb, i) => {
      console.log(this.keahlian_list[i].nama + '(' + this.keahlian_list[i].idkeahlian + '): ' + cb)
      if (cb === true) {
        uploadData.append('idkeahlian[]', this.keahlian_list[i].idkeahlian);
      }
    })
    // uploadData.append('idkeahlian[]', this.email);
    this.gp.editKeahlianService(uploadData).subscribe((resp) => {

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



  async ngOnInit() {
    this.getProfil()
    this.category()
    fetch('http://dev.farizdotid.com/api/daerahindonesia/provinsi').then(res => res.json())
      .then(json => {
        this.provinsi_list = json['provinsi']
      });
  }
}
