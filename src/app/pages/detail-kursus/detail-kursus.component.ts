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
  provinsi:string=''
  // newMapw: GoogleMap;
  newMap: GoogleMap;

  map2: GoogleMap;
  idkurus:number
  idortu:number

  @ViewChild('maps') maps: ElementRef<HTMLElement>;
  email: string = ''
  location_ortu: LatLng
  valRate:number=0
  komentars=[]
  dokumen_tambahan=''
  detail_keahlian = []



  constructor(public at: ActivatedRoute, public tk: TempatKursusService,
    private ot: OrangTuaService, private authService: AuthService) {
    this.email = authService.email
  }



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
      draggable: false


    })

    // lokasi ortu
    this.ot.profilService(this.email).subscribe(
      async (data) => {
        this.idortu=data['data'][0].idorang_tua
        this.location_ortu = {
          lat: parseFloat(data['data'][0].lokasi_lat),
          lng: parseFloat(data['data'][0].lokasi_long)

        }
        const marker = this.newMap.addMarker({
          coordinate: {
            lat: this.location_ortu.lat,
            lng: this.location_ortu.lng,
          },
          draggable: false,
          iconUrl:"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        })


      }
    )
    


  }



  async detailKursus() {
    this.idkurus= this.at.snapshot.params['idkursus']
    this.tk.detailTempatKursusService(this.idkurus).subscribe(
      (data) => {
        if (data['result'] = 'success') {
          this.komentars=data['data']
          this.valRate=data.rerata_rating
          this.informasi = data['data'][0].informasi
          this.dokumen_tambahan = data['data'][0].dokumen_tambahan
          this.x = parseFloat(data['data'][0].lokasi_lat)
          this.location = {
            lat: parseFloat(data['data'][0].lokasi_lat),
            lng: parseFloat(data['data'][0].lokasi_long)
          }
          this.nama = data['data'][0].nama
          this.gambar = data['data'][0].gambar
          this.alamat = data['data'][0].alamat
          this.kecamatan = data['data'][0].kecamatan
          this.provinsi = data['data'][0].provinsi
          this.kelurahan = data['data'][0].kelurahan

          this.lokasi()
          this.tk.keahlianTempatKursusService(this.idkurus).subscribe(
            (data) => {
              if (data['result'] == 'success') {
                this.detail_keahlian = data['data']
              }
            }
          )
        }
      }
    )
  }

  
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
    this.idkurus= this.at.snapshot.params['idkursus']



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
