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
  idorang_tua=''

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
        // lokasi lowongan
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
      draggable: false
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
          draggable: false,
          iconUrl:"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
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

  async detailLowongan() {
    var id: number = this.at.snapshot.params['id']
    this.gp.detailLowongan(id).subscribe(
      (data) => {
        if (data['result'] = 'success') {
          this.idlowongan = data['data'][0].idbuka_lowongan
          this.idorang_tua = data['data'][0].idorang_tua
          this.judul = data['data'][0].judul_lowongan
          this.nama_ortu = data['data'][0].nama_ortu 
          this.tanggal_mulai = data['data'][0].tgl_mulai
          this.durasi = data['data'][0].durasi_privat
          this.metode = data['data'][0].metode_privat
          this.lokasi = {
            lat: parseFloat(data['data'][0].lowongan_lat),
            lng: parseFloat(data['data'][0].lowongan_long)
          }
          this.biaya = data['data'][0].biaya_jasa
          this.keahlian = data['data'][0].nama_keahlian 
          this.jenjang = data['data'][0].jenjang
          this.deskripsi = data['data'][0].deskripsi
          this.banyak_pertemuan = data['data'][0].banyak_pertemuan
          this.jadwal = data['data'][0].jadwal
          this.titikLokasi()
        }
      }
    )
  }

  
 


  async ngOnInit() {
    this.detailLowongan()
  // console.log(this.at.snapshot.params['id']+ 'ID LOWONGAN')
   
  }

}
