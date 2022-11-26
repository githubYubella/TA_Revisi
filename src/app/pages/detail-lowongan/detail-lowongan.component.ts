import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GuruPrivatService } from 'src/app/services/guru-privat/guru-privat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-lowongan',
  templateUrl: './detail-lowongan.component.html',
  styleUrls: ['./detail-lowongan.component.scss'],
})
export class DetailLowonganComponent implements OnInit {
  biaya: number //
  banyak_pertemuan = ''//
  metode = ''//
  durasi: number//
  tanggal_mulai = ''//
  judul = ''//
  deskripsi = ''//
  jenjang = ''//
  nama_ortu = ''//
  keahlian = ''//
  lokasi: LatLng//
  hari = ''
  jam_awal = ''
  jam_akhir = ''
  jadwal = []
  @ViewChild('maps') maps: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  email = ''
  lokasiGP: LatLng
  idlowongan: number
  idguru: number
  status: string = ''

  constructor(public at: ActivatedRoute, private gp: GuruPrivatService,
    private authService: AuthService,
  ) { this.email = authService.email }

  async titikLokasi() {

    this.newMap = await GoogleMap.create({
      //   const data = this.getProfil();
      id: 'capacitor-google-maps',
      element: this.maps.nativeElement,
      apiKey: environment.key,
      config:
      {
        // lokasi tempat kursus
        center: {
          lat: this.lokasi.lat,
          lng: this.lokasi.lng,
        },
        zoom: 17,
      },
    })

    const marker = this.newMap.addMarker({
      coordinate: {
        lat: this.lokasi.lat,
        lng: this.lokasi.lng
      },
      draggable: true
    })

    // lokasi guru privat
    this.gp.profilService(this.email).subscribe(
      async (data) => {
        this.lokasiGP = {
          lat: parseFloat(data['data'][0].lokasi_lat),
          lng: parseFloat(data['data'][0].lokasi_long)
        }

        const marker = this.newMap.addMarker({
          coordinate: {
            lat: this.lokasiGP.lat,
            lng: this.lokasiGP.lng,
          },
          draggable: true
        })
      }
    )


    await this.newMap.setCamera({
      coordinate: {
        lat: this.lokasi.lat,
        lng: this.lokasi.lng

      },
      zoom: 8,
    })
  }

  // async titikGuru() {
  //   this.gp.profilService(this.email).subscribe(
  //     async (data) => {
  //       this.lokasiGP = {
  //         lat: parseFloat(data['data'][0].lokasi_lat),
  //         lng: parseFloat(data['data'][0].lokasi_long)
  //       }
  //       this.newMap = await GoogleMap.create({
  //         //   const data = this.getProfil();
  //         id: 'capacitor-google-maps',
  //         element: this.maps.nativeElement,
  //         apiKey: environment.key,
  //         config:
  //         {
  //           center: {
  //             lat: parseFloat(data['data'][0].lokasi_lat),
  //             lng: parseFloat(data['data'][0].lokasi_long)
  //           },
  //           zoom: 10,
  //         },
  //       })
  //       // const marker = this.newMap.addMarker({
  //       //   coordinate: {
  //       //     lat: parseFloat(data['data'][0].lokasi_lat),
  //       //     lng: parseFloat(data['data'][0].lokasi_long)
  //       //   },
  //       //   draggable: true
  //       // })
  //     }
  //   )
  // }

  async detailLowongan() {
    var id: number = this.at.snapshot.params['id']

    this.gp.detailLowongan(id).subscribe(
      (data) => {
        if (data['result'] = 'success') {
          this.idlowongan = data['data'][0].idbuka_lowongan
          this.judul = data['data'][0].judul_lowongan//ok
          this.nama_ortu = data['data'][0].nama_ortu // o
          this.tanggal_mulai = data['data'][0].tgl_mulai//k
          this.durasi = data['data'][0].durasi_privat//k
          this.metode = data['data'][0].metode_privat//ok
          this.lokasi = {
            lat: parseFloat(data['data'][0].lowongan_lat),
            lng: parseFloat(data['data'][0].lowongan_long)
          }

          this.biaya = data['data'][0].biaya_jasa//k
          this.keahlian = data['data'][0].nama_keahlian //k
          this.jenjang = data['data'][0].jenjang//k
          this.deskripsi = data['data'][0].deskripsi//k
          this.banyak_pertemuan = data['data'][0].banyak_pertemuan//k
          this.jadwal = data['data']
          //  .forEach((val) => {
          //     this.hari=val.hari
          //     this.jam_awal=val.jam_awal
          //     this.jam_akhir=val.jam_akhir
          //     // console.log('jad: '+this.jadwal)
          //   });


          this.titikLokasi()




        }
      }
    )





  }

  
 


  async ngOnInit() {
    this.detailLowongan()
  
   
  }

}
