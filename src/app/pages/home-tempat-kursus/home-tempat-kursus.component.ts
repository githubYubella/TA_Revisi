import { Component, ElementRef, OnInit, setTestabilityGetter, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { TempatKursusService } from '../../services/tempat-kursus/tempat-kursus.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';

@Component({
  selector: 'app-home-tempat-kursus',
  templateUrl: './home-tempat-kursus.component.html',
  styleUrls: ['./home-tempat-kursus.component.scss'],
})
export class HomeTempatKursusComponent  {
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
  kecamatan=''
  kelurahan=''

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
  async getProfil() {
    this.tk.profilService(this.email_profil).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.nama = data['data'][0].nama
          this.informasi = data['data'][0].informasi
          this.gambar = data['data'][0].gambar
          this.alamat = data['data'][0].alamat
          this.kecamatan=data['data'][0].kecamatan
          this.kelurahan=data['data'][0].kelurahan

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
  async ngOnInit() {
    console.log('ngOnInit')
  }

  async ngAfterViewInit() {
    console.log('ngAfterViewInit')
    await this.storage.create();
    this.email_profil = await this.storage.get('email')
    await this.getProfil()
  }
  async logout() {
    await this.authService.logout()
    this.router.navigateByUrl('login')
  }


}


