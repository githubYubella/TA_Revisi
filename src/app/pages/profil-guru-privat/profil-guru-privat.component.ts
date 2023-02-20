import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GuruPrivatService } from 'src/app/services/guru-privat/guru-privat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profil-guru-privat',
  templateUrl: './profil-guru-privat.component.html',
  styleUrls: ['./profil-guru-privat.component.scss'],
})
export class ProfilGuruPrivatComponent implements OnInit {
  email = ''
  saldo: number
  nama = ''
  jenis_kelamin = ''
  telepon = ''
  keahlian: []
  jenjang = ''
  tempat_pendidikan = ''
  tgl_lahir = ''
  alamat = ''
  kecamatan = ''
  kelurahan = ''
  location: LatLng
  pengalaman = ''
  gambar = ''
  idguru: number
  newMap: GoogleMap;
  @ViewChild('maps') maps: ElementRef<HTMLElement>;
  komentars: []
  valRate = 0



  constructor(private gp: GuruPrivatService, private authService: AuthService) {
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
      draggable: false,
      iconUrl:"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"



    })

   

   
  }

  getProfil() {
    this.gp.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.saldo = data['data'][0].dompet
          this.nama = data['data'][0].nama_guru_privat
          // this.saldo = data['data'][0].saldo
          this.jenis_kelamin = data['data'][0].jenis_kelamin
          this.telepon = data['data'][0].no_telepon
          this.jenjang = data['data'][0].jenjang_terakhir
          this.tempat_pendidikan = data['data'][0].tempat_jenjang_terakhir
          this.tgl_lahir = data['data'][0].tgl_lahir
          this.alamat = data['data'][0].alamat
          this.kecamatan = data['data'][0].kecamatan
          this.kelurahan = data['data'][0].kelurahan
          this.pengalaman = data['data'][0].pengalaman
          this.location = {
            lat: parseFloat(data['data'][0].lokasi_lat),
            lng: parseFloat(data['data'][0].lokasi_long)
          }
          this.gambar = data['data'][0].gambar
          this.idguru = data['data'][0].idguru_privat

          this.lokasi()
          // get keahlian
          this.gp.keahlianGuruService(this.idguru).subscribe(
            (data) => {
              if (data['result'] == 'success') {
                this.keahlian=data['data']

              }
            }
          )

             // Get ulasan
             this.gp.historyUlasanGuruSerivce(this.idguru).subscribe(
              (data2)=>{
                this.komentars = data2['data']
                this.valRate = data2.rerata_rating
              // console.log("rara" + this.valRate)
              }
              
            )







        }
      }
    )
  }
  async ngOnInit() {
    this.getProfil()
  }

}
