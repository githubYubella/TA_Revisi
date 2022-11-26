import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';
import { environment } from 'src/environments/environment';
import { TempatKursusService } from '../../services/tempat-kursus/tempat-kursus.service';

@Component({
  selector: 'app-detail-kursus',
  templateUrl: './detail-kursus.component.html',
  styleUrls: ['./detail-kursus.component.scss'],
})
export class DetailKursusComponent implements OnInit {
  informasi: string = ""
  location: LatLng
  nama: string = ""
  alamat: string = ""
  gambar: string = ""
  x: number
  kecamatan: string = ''
  kelurahan: string = ''
  // newMapw: GoogleMap;
  newMap: GoogleMap;

  map2: GoogleMap;

  @ViewChild('maps') maps: ElementRef<HTMLElement>;
  email: string = ''
  location_ortu: LatLng


  constructor(public at: ActivatedRoute, public tk: TempatKursusService,
    private ot: OrangTuaService, private authService: AuthService) {
    this.email = authService.email
  }


  // async titikLokasi() {

  //   this.newMap = await GoogleMap.create({
  //     //   const data = this.getProfil();
  //     id: 'capacitor-google-maps',
  //     element: this.maps.nativeElement,
  //     apiKey: environment.key,
  //     config:
  //     {
  //       // lokasi tempat kursus
  //       center: {
  //         lat: this.lokasi.lat,
  //         lng: this.lokasi.lng,
  //       },
  //       zoom: 10,
  //     },
  //   })

  //   const marker = this.newMap.addMarker({
  //     coordinate: {
  //       lat: this.lokasi.lat,
  //       lng: this.lokasi.lng
  //     },
  //     draggable: true
  //   })

  //   // lokasi guru privat
  //   this.gp.profilService(this.email).subscribe(
  //     async (data) => {
  //       this.lokasiGP = {
  //         lat: parseFloat(data['data'][0].lokasi_lat),
  //         lng: parseFloat(data['data'][0].lokasi_long)
  //       }
        
  //       const marker = this.newMap.addMarker({
  //         coordinate: {
  //           lat: this.lokasiGP.lat,
  //           lng: this.lokasiGP.lng,
  //         },
  //         draggable: true
  //       })
  //     }
  //   )
    

  //   await this.newMap.setCamera({
  //     coordinate: {
  //       lat: this.lokasi.lat,
  //       lng: this.lokasi.lng

  //     },
  //     zoom: 8,
  //   })
  // }

  async lokasi() {
    // console.log(this.location.lat + "-->location")
    this.newMap = await GoogleMap.create({
      //   const data = this.getProfil();
      id: 'capacitor-google-maps',
      element: this.maps.nativeElement,
      apiKey: environment.key,
      config:
      {
        center: {
          lat: this.location.lat,
          lng: this.location.lng,
        },

        zoom: 7,
      },
    })

    const marker = this.newMap.addMarker({
      coordinate: {
        lat: this.location.lat,
        lng: this.location.lng
      },
      draggable: true


    })

    // lokasi ortu
    this.ot.profilService(this.email).subscribe(
      async (data)=>{
        this.location_ortu={
          lat: parseFloat(data['data'][0].lokasi_lat),
            lng: parseFloat(data['data'][0].lokasi_long)

        }

        const marker = this.newMap.addMarker({
          coordinate: {
            lat: this.location_ortu.lat,
            lng: this.location_ortu.lng,
          },
          draggable: true
        })


      }
    )

   
  }

  // async lokasi_ortu() {
  //   console.log(this.location.lat + "-->location")
  //   this.map2 = await GoogleMap.create({
  //     //   const data = this.getProfil();
  //     id: 'capacitor-google-maps',
  //     element: this.maps.nativeElement,
  //     apiKey: environment.key,
  //     config:
  //     {
        
  //       center: {
  //         lat: this.location_ortu.lat,
  //         lng: this.location_ortu.lng,
  //       },

  //       zoom: 17,
  //     },
  //   })

  //   const marker = this.map2.addMarker({
  //     coordinate: {
  //       lat: this.location_ortu.lat,
  //       lng: this.location_ortu.lng
  //     },
  //     draggable: true



  //   })

  //   await this.map2.setCamera({
  //     coordinate: {
  //       lat: this.location_ortu.lat,
  //       lng: this.location_ortu.lng

  //     },
  //     zoom: 14,
  //   })
  // }

  async detailKursus() {
    var id: number = this.at.snapshot.params['id']

    this.tk.detailTempatKursusService(id).subscribe(
      (data) => {
        if (data['result'] = 'success') {
          this.informasi = data['data'][0].informasi
          this.x = parseFloat(data['data'][0].lokasi_lat)
          this.location = {
            lat: parseFloat(data['data'][0].lokasi_lat),
            lng: parseFloat(data['data'][0].lokasi_long)
          }

          this.nama = data['data'][0].nama
          this.gambar = data['data'][0].gambar
          this.alamat = data['data'][0].alamat
          this.kecamatan = data['data'][0].kecamatan
          this.kelurahan = data['data'][0].kelurahan


          this.lokasi()


        }
      }
    )





  }

  // async titikOrtu() {
  //   this.ot.profilService(this.email).subscribe(
  //     (data) => {
  //       if (data['result'] = 'success') {
  //         this.location_ortu = {
  //           lat: parseFloat(data['data'][0].lokasi_lat),
  //           lng: parseFloat(data['data'][0].lokasi_long)

  //         }
  //         this.lokasi_ortu()

  //       }

  //     }
  //   )
  // }

  async ngAfterViewInit() {
    // var id: number = this.at.snapshot.params['id']
    // console.log('emil '+this.email)
  //  this.titikOrtu()

    // this.ot.profilService(this.email).subscribe(
    //   (data) => {
    //     if (data['result'] = 'success') {
    //       this.location_ortu = {
    //         lat: parseFloat(data['data'][0].lokasi_lat),
    //         lng: parseFloat(data['data'][0].lokasi_long)

    //       }
    //       this.lokasi_ortu()

    //     }

    //   }
    // )

    // this.tk.detailTempatKursusService(id).subscribe(
    //   (data) => {
    //     if (data['result'] = 'success') {
    //       this.informasi = data['data'][0].informasi
    //       this.x = parseFloat(data['data'][0].lokasi_lat)
    //       this.location = {
    //         lat: parseFloat(data['data'][0].lokasi_lat),
    //         lng: parseFloat(data['data'][0].lokasi_long)
    //       }

    //       this.nama = data['data'][0].nama
    //       this.gambar = data['data'][0].gambar
    //       this.alamat = data['data'][0].alamat
    //       this.kecamatan = data['data'][0].kecamatan
    //       this.kelurahan = data['data'][0].kelurahan


    //       this.lokasi()


    //     }
    //   }
    // )

  }


  async ngOnInit() {
    this.detailKursus()


    // console.log(this.location.lat + "-->location init")


    // var id: number = this.at.snapshot.params['id']
    // this.tk.detailTempatKursusService(id).subscribe(
    //   (data) => {
    //     if (data['result'] = 'success') {
    //       this.informasi = data['data'][0].informasi
    //       this.location = {
    //         lat: parseFloat(data['data'][0].lokasi_lat),
    //         lng: parseFloat(data['data'][0].lokasi_long)
    //       }
    //       this.nama=data['data'][0].nama
    //       this.gambar=data['data'][0].gambar
    //       this.alamat=data['data'][0].alamat

    //     }
    //   }
    // )
  }



}
