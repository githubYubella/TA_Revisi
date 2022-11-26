import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TempatKursusService } from '../../services/tempat-kursus/tempat-kursus.service';
@Component({
  selector: 'app-pengaturan-tempat-kursus',
  templateUrl: './pengaturan-tempat-kursus.component.html',
  styleUrls: ['./pengaturan-tempat-kursus.component.scss'],
})
export class PengaturanTempatKursusComponent implements OnInit {
  email: string = ''
  nama = ''
  informasi = ''
  gambar = ''
  alamat = ''
  nama_edit = ''
  informasi_edit = ''
  alamat_edit = ''
  image: any
  kecamatan=''
  kelurahan=''
  input_x:number
  input_y:number
  kecamatan_edit=''
  kelurahan_edit=''
  input_x_edit:number
  input_y_edit:number



  constructor(private router: Router, private storage: Storage, public tk: TempatKursusService,private authService: AuthService) { 
    // this.email = authService.email
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
          this.kecamatan=data['data'][0].kecamatan
          this.kelurahan=data['data'][0].kelurahan
          this.input_x=data['data'][0].lokasi_lat
          this.input_y=data['data'][0].lokasi_long
        // this.location = {
          //   lat: parseFloat(data['data'][0].lokasi_lat),
          //   lng: parseFloat(data['data'][0].lokasi_long)
          // }
          // this.lokasi()
        }
      }
    )
  }

  editProfil() {
    this.tk.editProfilService(this.informasi, this.nama, this.alamat, this.kecamatan,
      this.kecamatan, this.input_x,this.input_y,this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          alert("Data Profil Berhasil di Edit")
          // this.router.navigate(['/'])

        }
        else {
          alert("Data Profil Gagal di Edit");
          // this.router.navigate(['/'])

        }
      }
    )
  }



  async ngOnInit() {
    await this.storage.create();
    this.email = await this.storage.get('email')
    console.log('hlm pengaturan: ' + this.email)
    this.getProfil()

  }

}
