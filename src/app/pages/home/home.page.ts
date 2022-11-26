import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { TempatKursusService } from '../../services/tempat-kursus/tempat-kursus.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
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
  nama_login=""

  constructor(
    private geo: Geolocation,
    private storage: Storage,
    private tk: TempatKursusService,
    private authService: AuthService,
    private router: Router,
    private ot:OrangTuaService
  ) {
    this.email = authService.email
    this.role = authService.role
    this.email_profil = authService.email
  }

  listKursus() {
    this.tk.listTempatKursusService().subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.kursus = data['data']
        }
      }
    )

  }

  async getProfil() {
    this.tk.profilService(this.email_profil).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.nama = data['data'][0].nama
          this.informasi = data['data'][0].informasi
          this.gambar = data['data'][0].gambar
          this.alamat = data['data'][0].alamat
          this.location = {
            lat: parseFloat(data['data'][0].lokasi_lat),
            lng: parseFloat(data['data'][0].lokasi_long)
          }
          this.lokasi()
        }
      }
    )
  }

  async lokasi() {
    // const [mapConfig, setMapConfig]= useState({
    //   center: {
    //         lat: -7.8110806,
    //         lng: 112.0094793,
    //       },

    //       zoom: 17,
    // })

    this.newMapw = await GoogleMap.create({
      //   const data = this.getProfil();
      id: 'capacitor-google-maps',
      element: this.maps.nativeElement,
      apiKey: environment.key,
      config:
      {
        // center: {
        //   lat: 50.0598058,
        //   lng: 14.325539,
        // },
        center: {
          lat: this.location.lat,
          lng: this.location.lng,
        },
        zoom: 17,
      },
    })

    const marker = this.newMapw.addMarker({
      coordinate: {
        lat: this.location.lat,
        lng: this.location.lng
      },
      draggable: true


    })

    await this.newMapw.setCamera({
      coordinate: {
        lat: this.location.lat,
        lng: this.location.lng

      },
      zoom: 14,
    })
  }
  getNamaOrtu() {
    this.ot.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.nama_login = data['data'][0].nama_orang_tua
          // console.log("syal: "+data['data'][0].nama_orang_tua)
        }
      }
    )
  }

  // async ngOnInit() {
  //   console.log('ngOnInit')
  // }

  async ngAfterViewInit() {
    console.log('ngAfterViewInit')
    await this.storage.create();
    // this.email_profil = await this.storage.get('email_save')
    await this.getProfil()
  }

  async ngOnInit() {
    // this.email = await this.storage.get('email_save')
    // this.role = await this.storage.get('role_save')
    console.log('this is home' + this.email)
    console.log('this is home role' + this.role)
    this.listKursus()
    this.getNamaOrtu()
  }

  async logout() {
    await this.authService.logout()
    this.router.navigateByUrl('login')
  }

}
