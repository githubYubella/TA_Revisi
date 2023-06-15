import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';
import { TempatKursusService } from 'src/app/services/tempat-kursus/tempat-kursus.service';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage-angular';
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-home-orang-tua',
  templateUrl: './home-orang-tua.component.html',
  styleUrls: ['./home-orang-tua.component.scss'],
})
export class HomeOrangTuaComponent implements OnInit {
  email: string
  role: string

  email_profil: string = ''
  informasi: string = ''
  location: LatLng
  nama: string = ''
  alamat: string = ''
  gambar: string = ''
  @ViewChild('maps') maps: ElementRef<HTMLElement>;
  newMapw: GoogleMap;

  kursus = []
  nama_login = ""
  idortu: number
  search = ''
  status_privat = ""

  search_bidang=''
  kumpulan_guru_privat=[]
  jenjang_dipilih=''
  jenisKelamin_dipilih = ''

  keahlian_list = []
  kategori_dipilih=""
  search_provinsi=""
  search_kota=""



  constructor(private geo: Geolocation,
    private storage: Storage,
    private tk: TempatKursusService,
    private authService: AuthService,
    private router: Router,
    private ot: OrangTuaService,
    private alertController: AlertController,
    private navController: NavController
  ) {
    this.email = authService.email
    this.role = authService.role
    this.email_profil = authService.email
  }

  searchbar(ev: any){
    let search_value = ev.target.value
    this.search_bidang = ev.target.value
    // this.kategori_dipilih=search_value
    console.log(this.search_bidang)
    this.listGuru()
    // this.listKursus()
  }

  searchbarComboboxPendidikan(ev: any){
    let search_value = ev.target.value
    this.jenjang_dipilih = ev.target.value
    console.log(this.jenjang_dipilih.toString())
    // this.listKursus()
    this.listGuru()

  }
  searchbarComboboxKelamin(ev: any){
    let search_value = ev.target.value
    this.jenisKelamin_dipilih = ev.target.value
    console.log(this.jenisKelamin_dipilih.toString())
    // this.listKursus()
    this.listGuru()

  }

  searchbarProvinsi(ev: any){
    let search_value = ev.target.value
    this.search_provinsi= ev.target.value
    // this.kategori_dipilih=search_value
    console.log(this.search_bidang)
    this.listGuru()
    // this.listKursus()
  }

  searchbarKota(ev: any){
    let search_value = ev.target.value
    this.search_kota= ev.target.value
    // this.kategori_dipilih=search_value
    console.log(this.search_bidang)
    this.listGuru()
    // this.listKursus()
  }
  listGuru() {
    var kosong=""
    this.ot.listGuruPrivatService(this.search_bidang,this.jenjang_dipilih,this.jenisKelamin_dipilih,this.search_provinsi,this.search_kota).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.kumpulan_guru_privat = data['data']
        }else{
          kosong="tidak ada data"
          this.kumpulan_guru_privat = data['data']
          console.log('er '+data['result'])
        }
      }
    )

  }

  category() {
    this.tk.listKeahlianService().subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.keahlian_list = data['data']
        }
      }
    )
  }

  Beranda() {
    window.location.reload()
  }

  // searchbar(ev: any) {
  //   let search_value = ev.target.value
  //   this.search = search_value
  //   this.listKursus()
  // }



  // listKursus() {
  //   var kosong=''
  //   this.tk.listTempatKursusService(this.search).subscribe(
  //     (data) => {
  //       if (data['result'] == 'success') {
  //         this.kursus = data['data']
  //       }else{
  //         kosong="tidak ada data"
  //         this.kursus = data['data']
  //         console.log('er '+data['result'])
  //       }
  //     }
  //   )
  // }

  // async lokasi() {
  //   // const [mapConfig, setMapConfig]= useState({
  //   //   center: {
  //   //         lat: -7.8110806,
  //   //         lng: 112.0094793,
  //   //       },

  //   //       zoom: 17,
  //   // })

  //   this.newMapw = await GoogleMap.create({
  //     //   const data = this.getProfil();
  //     id: 'capacitor-google-maps',
  //     element: this.maps.nativeElement,
  //     apiKey: environment.key,
  //     config:
  //     {
  //       // center: {
  //       //   lat: 50.0598058,
  //       //   lng: 14.325539,
  //       // },
  //       center: {
  //         lat: this.location.lat,
  //         lng: this.location.lng,
  //       },
  //       zoom: 17,
  //     },
  //   })

  //   const marker = this.newMapw.addMarker({
  //     coordinate: {
  //       lat: this.location.lat,
  //       lng: this.location.lng
  //     },
  //     draggable: false


  //   })

  //   await this.newMapw.setCamera({
  //     coordinate: {
  //       lat: this.location.lat,
  //       lng: this.location.lng

  //     },
  //     zoom: 14,
  //   })
  // }
  // getNamaOrtu() {
  //   this.ot.profilService(this.email).subscribe(
  //     (data) => {
  //       if (data['result'] == 'success') {
  //         this.nama_login = data['data'][0].nama_orang_tua
  //         this.idortu = data['data'][0].idorang_tua
  //         // console.log("syal: "+data['data'][0].nama_orang_tua)

  //         // Cek tanggal tagihan pembayaran
  //         this.ot.cekTglTagihan(this.idortu).subscribe(
  //           (data) => {
  //             if (data['result'] == 'success') {
  //               this.status_privat = data['status'] 
  //             }
  //           }
  //         )

  //       }
  //     }
  //   )
  // }


  async ngOnInit() {
    // this.email = await this.storage.get('email_save')
    // this.role = await this.storage.get('role_save')
    // console.log('this is home' + this.email)
    // console.log('this is home role' + this.role)
    // this.listKursus()
    // this.getNamaOrtu() 
    this.listGuru()
    this.category()
  }

  async logout() {
    await this.authService.logout()
    this.router.navigateByUrl('login')
    window.location.reload()

  }

}
