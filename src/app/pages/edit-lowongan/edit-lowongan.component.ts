import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TempatKursusService } from 'src/app/services/tempat-kursus/tempat-kursus.service';
import { format } from "date-fns";
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
import { environment } from 'src/environments/environment';
import { ForwardOptions, NativeGeocoder } from '@capgo/nativegeocoder';

@Component({
  selector: 'app-edit-lowongan',
  templateUrl: './edit-lowongan.component.html',
  styleUrls: ['./edit-lowongan.component.scss'],
})
export class EditLowonganComponent implements OnInit {

  jadwal = [
    { hari: 'Senin', checked: false, disabled: false, pukul: null, sampai: null },
    { hari: 'Selasa', checked: false, disabled: false, pukul: null, sampai: null },
    { hari: 'Rabu', checked: false, disabled: false, pukul: null, sampai: null },
    { hari: 'Kamis', checked: false, disabled: false, pukul: null, sampai: null },
    { hari: 'Jumat', checked: false, disabled: false, pukul: null, sampai: null },
    { hari: 'Sabtu', checked: false, disabled: false, pukul: null, sampai: null },
    { hari: 'Minggu', checked: false, disabled: false, pukul: null, sampai: null },
  ]
  keahlian_list = []

  id: number = this.at.snapshot.params['id']
  tanggal_mulai = ''
  val_tgl_mulai = ''
  judul_lowongan = ''
  deskripsi_lowongan = ''
  jenjang_dipilih = ''
  kategori_dipilih: number
  metode_dipilih = ''
  durasi_lowongan: number
  banyak_pertemuan: number = 1
  biaya_jasa: number
  input_x: number
  input_y: number
  alamat = ''
  kecamatan = ''
  kelurahan = ''
  provinsi = ''


  jadwal_kursus: string
  alamat_lengkap = ''
  kota = ''

  newMapw: GoogleMap;
  @ViewChild('maps') maps: ElementRef<HTMLElement>;
  location: LatLng
  idortu: number
  idlowongan: number

  constructor(public router: Router, public at: ActivatedRoute, private tk: TempatKursusService, private ot: OrangTuaService) { }


  category() {
    this.tk.listKeahlianService().subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.keahlian_list = data['data']
        }
      }
    )
  }
  // async setTimePukul(i, event) {
  //   let pukul = format(new Date(event.target.value), "HH:mm")
  //   console.log('setTimePukul(' + i + '): ' + pukul)
  //   this.jadwal[i].pukul = pukul
  // }

  // async setTimeSampai(i, event) {
  //   let sampai = format(new Date(event.target.value), "HH:mm")
  //   console.log('setTimeSampai(' + i + '): ' + sampai)
  //   this.jadwal[i].sampai = sampai

  // }
  async setTanggalMulai(event) {
    this.tanggal_mulai = format(new Date(event.target.value), "yyyy-MM-dd")
    // console.log('tgl_mulai edit'+this.tanggal_mulai)
  }
  getDetailLowongan() {
    this.ot.detailLowonganService(this.id).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.judul_lowongan = data['data'][0].judul_lowongan
          this.deskripsi_lowongan = data['data'][0].deskripsi
          this.deskripsi_lowongan = data['data'][0].deskripsi
          this.jenjang_dipilih = data['data'][0].jenjang
          this.metode_dipilih = data['data'][0].metode_privat
          this.durasi_lowongan = data['data'][0].durasi_privat
          // let anu=this.setTanggalMulai(data['data'][0].tgl_mulai)
          this.tanggal_mulai = data['data'][0].tgl_mulai
          this.kategori_dipilih = data['data'][0].idkeahlian
          this.alamat = data['data'][0].alamat
          this.kecamatan = data['data'][0].kecamatan
          this.kelurahan = data['data'][0].kelurahan
          this.banyak_pertemuan = data['data'][0].banyak_pertemuan
          this.jadwal_kursus = data['data'][0].jadwal

          this.biaya_jasa = data['data'][0].biaya_jasa
          // this.input_x = data['data'][0].lokasi_lat
          // this.input_y = data['data'][0].lokasi_long
          this.location = {
            lat: parseFloat(data['data'][0].lokasi_lat),
            lng: parseFloat(data['data'][0].lokasi_long)
          }
          this.lokasi()
          this.idortu = data['data'][0].idorang_tua
          this.idlowongan = data['data'][0].idbuka_lowongan
          this.kota = data['data'][0].kota
          this.provinsi = data['data'][0].provinsi



        }
      }
    )
  }


  async lokasi() {
    console.log(this.location.lat + "-->location edit")
    this.newMapw = await GoogleMap.create({
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

        zoom: 8,
      },
    })

    const marker = this.newMapw.addMarker({
      coordinate: {
        lat: this.location.lat,
        lng: this.location.lng
      },
      draggable: false


    })

    await this.newMapw.setCamera({
      coordinate: {
        lat: this.location.lat,
        lng: this.location.lng

      },
      zoom: 14,
    })
  }
  async ngAfterViewInit() {
    this.getDetailLowongan()


  }
  async ngOnInit() {
    this.category()
  }

  async editLowongan() {
    this.alamat_lengkap = this.alamat + ", " + this.kota + ", " + this.kecamatan + ", " +
      this.kelurahan + ", " + this.provinsi

    const op: ForwardOptions = {
      'addressString': this.alamat_lengkap,
      'apiKey': environment.key,
      'maxResults': 5

    }
    await NativeGeocoder.forwardGeocode(op).then(
      (res) => {
        this.location = {
          lat: res.addresses[0].latitude,
          lng: res.addresses[0].longitude
        }

        this.ot.editLowonganService(this.biaya_jasa, this.banyak_pertemuan, this.metode_dipilih,
          this.durasi_lowongan, this.tanggal_mulai, this.judul_lowongan, this.deskripsi_lowongan, this.jenjang_dipilih, this.idortu,
          this.kategori_dipilih, this.alamat, this.kecamatan, this.kelurahan,
          this.location.lat.toString(), this.location.lng.toString(), this.jadwal_kursus, this.provinsi,
          this.kota, this.idlowongan
        ).subscribe(
          (data) => {
            if (data['result'] == 'success') {
              alert("Data Lowongan Berhasil di Edit")
              window.location.reload()

              // this.router.navigate(['/postingan-lowongan'])

            }
            else {
              alert("Data Lowongan Gagal di Edit");
              // this.router.navigate(['/'])

            }
          }

        )
      }
    )
  }

  // async nonaktifkan() {
  //   this.ot.editNonaktifLowonganService(this.idlowongan).subscribe(
  //     (data) => {
  //       if (data['result'] == 'success') {
  //         alert('Pencarian Guru Privat Telah Diberhentikan.' + this.idlowongan)
  //         // this.router.navigate(['/postingan-lowongan'])
  //         this.router.navigate(['/'])

  //       }
  //     }
  //   )
  // }


}
