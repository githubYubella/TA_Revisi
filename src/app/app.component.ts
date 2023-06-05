import { Component, Input } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UserService } from './services/user/user.service';
import { Storage } from '@ionic/storage';
import { TempatKursusService } from './services/tempat-kursus/tempat-kursus.service';
import { Router } from '@angular/router';
import { OrangTuaService } from './services/orang-tua/orang-tua.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  role: string = ""
  password_login_kursus: string = ""
  email_login_kursus: string = ""
  registerKursus = ''
  email_regis_kursus: string = ""
  password_regis_kursus: string = ""
  nama_regis_kursus: string = ""
  informasi_regis_kursus: string = ""
  alamat_regis_kursus: string = ""
  gambar_regis_kursus: string = ""
  keahlian_list = []
  dipilih: number
  image: any

  email_regis_ortu = ""
  password_regis_ortu = ""
  namaOrtu_ortu = ""
  jenisKelamin_dipilih = ""
  telepon_ortu = ""
  namaSiswa_ortu = ""
  alamat_regis_ortu = ""
  registerOrtu = ""

  nama_login = ""
  loc_x: number
  loc_y: number
  email: string = ""
  password: string = ""

  constructor(
    private geo: Geolocation,
    private router: Router,
    private tk: TempatKursusService,
    private us: UserService,
    private storage: Storage,
    private ot: OrangTuaService
  ) { }

  // register_orang_tua() {
  //   this.ot.registerService(this.email_regis_ortu, this.password_regis_ortu, this.namaOrtu_ortu, this.jenisKelamin_dipilih,
  //     this.telepon_ortu, this.namaSiswa_ortu, this.alamat_regis_ortu, this.loc_x, this.loc_y).subscribe(
  //       (data) => {
  //         if (data['result'] == 'success') {
  //           alert("Register Success")
  //           this.registerOrtu = ''
  //         } else {
  //           alert("Register Error : " + "Email atau Password tidak boleh kosong.")
  //         }
  //       }
  //     )
  // }

  // getNamaOrtu() {
  //   this.ot.profilService(this.email).subscribe(
  //     (data) => {
  //       if (data['result'] == 'success') {
  //         this.nama_login = data['data'][0].nama_orang_tua
  //         // console.log("syal: "+data['data'][0].nama_orang_tua)
  //       }
  //     }
  //   )
  // }

  category() {
    this.tk.listKeahlianService().subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.keahlian_list = data['data']
        }
      }
    )
  }

  onFileSelected(event) {
    // console.log(event)
    this.image = event.target.files[0]
    // this.conString=this.selected.readAsText(this.selected,'s')
    console.log(this.image)
  }

  register_tempat_kursus() {
    const uploadData = new FormData();
    uploadData.append('email', this.email_regis_kursus);
    uploadData.append('password', this.password_regis_kursus);
    uploadData.append('nama', this.nama_regis_kursus);
    uploadData.append('informasi', this.informasi_regis_kursus);
    uploadData.append('alamat', this.alamat_regis_kursus);
    uploadData.append('lat', this.loc_x.toString());
    uploadData.append('long', this.loc_y.toString());

    uploadData.append('image', this.image, this.image.name);
    uploadData.append('idkeahlian', this.dipilih.toString());

    this.tk.registerService(uploadData).subscribe((resp) => {
      console.log(resp);
      if (resp['result'] == 'success') {
        alert("Register Success")
        this.registerKursus = ""
        // this.router.navigate(['/'])
      }
      else {
        alert("Register Error : " + resp['message'])
      }
    })
  }

  async ngOnInit() {
    await this.storage.create();
    this.email = await this.storage.get('email_save')
    this.role = await this.storage.get('role_save')
    this.nama_login = await this.storage.get('nama_login')
    console.log("app: " + this.email);
    this.posisiSekarang();
    this.category()
    // this.getNamaOrtu()
  }

  async posisiSekarang() {
    // this.geo.getCurrentPosition().then(async (resp) => {
    //   console.log(resp.coords.latitude, ',', resp.coords.longitude)
    //   this.loc_x = resp.coords.latitude
    //   this.loc_y = resp.coords.longitude
    //   // this.loc_x = -7.8272244,
    //   //   this.loc_y = 112.030143
    // }
    // )
  }
}
