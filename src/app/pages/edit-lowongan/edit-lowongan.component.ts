import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TempatKursusService } from 'src/app/services/tempat-kursus/tempat-kursus.service';
import { format } from "date-fns";
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
import { environment } from 'src/environments/environment';

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
  kelurahan =''
  kelurahann =''

  newMapw: GoogleMap;
  @ViewChild('maps') maps: ElementRef<HTMLElement>;
  location: LatLng
  idortu: number
  idlowongan: number

  constructor(public router:Router,public at: ActivatedRoute, private tk: TempatKursusService, private ot: OrangTuaService) { }


  category() {
    this.tk.listKeahlianService().subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.keahlian_list = data['data']
        }
      }
    )
  }
  async setTimePukul(i, event) {
    let pukul = format(new Date(event.target.value), "HH:mm")
    console.log('setTimePukul(' + i + '): ' + pukul)
    this.jadwal[i].pukul = pukul
  }

  async setTimeSampai(i, event) {
    let sampai = format(new Date(event.target.value), "HH:mm")
    console.log('setTimeSampai(' + i + '): ' + sampai)
    this.jadwal[i].sampai = sampai

  }
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
          this.biaya_jasa = data['data'][0].biaya_jasa
          this.input_x = data['data'][0].lokasi_lat
          this.input_y = data['data'][0].lokasi_long
          this.location = {
            lat: parseFloat(data['data'][0].lokasi_lat),
            lng: parseFloat(data['data'][0].lokasi_long)
          }
          this.lokasi()
          this.idortu = data['data'][0].idorang_tua
          this.idlowongan = data['data'][0].idbuka_lowongan

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
        // center: {
        //   lat:-7.8272244,
        //   lng:  112.030143,
        // },
        // -7.322807268052824 , 112.76524684911493
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
  async ngAfterViewInit() {
    this.getDetailLowongan()

  }
  async ngOnInit() {
    this.category()
    // this.lokasi()
  }

  editLowongan() {
    this.ot.editLowonganService(this.biaya_jasa, this.banyak_pertemuan, this.metode_dipilih,
      this.durasi_lowongan, this.tanggal_mulai, this.judul_lowongan, this.deskripsi_lowongan, this.jenjang_dipilih, this.idortu,
      this.kategori_dipilih, this.alamat, this.kecamatan, this.kelurahan, this.input_x, this.input_y, this.idlowongan
    ).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          alert("Data Lowongan Berhasil di Edit")
          // window.location.reload()

          this.router.navigate(['/postingan-lowongan'])

        }
        else {
          alert("Data Lowongan Gagal di Edit");
          // this.router.navigate(['/'])

        }
      }

    )
  }

  async nonaktifkan() {
    this.ot.editNonaktifLowonganService(this.idlowongan).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          alert('Pencarian Guru Privat Telah Diberhentikan.'+this.idlowongan)
          // this.router.navigate(['/postingan-lowongan'])
          this.router.navigate(['/'])

          



        }
      }
    )}


}
