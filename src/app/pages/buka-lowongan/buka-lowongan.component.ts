import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TempatKursusService } from '../../services/tempat-kursus/tempat-kursus.service';
import { format } from "date-fns";
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buka-lowongan',
  templateUrl: './buka-lowongan.component.html',
  styleUrls: ['./buka-lowongan.component.scss'],
})
export class BukaLowonganComponent implements OnInit {

  nama = ''
  id: number
  email = ''

  keahlian_list = []
  jadwal = [
    { hari: 'Senin', checked: false, disabled: false, pukul: null, sampai: null },
    { hari: 'Selasa', checked: false, disabled: false, pukul: null, sampai: null },
    { hari: 'Rabu', checked: false, disabled: false, pukul: null, sampai: null },
    { hari: 'Kamis', checked: false, disabled: false, pukul: null, sampai: null },
    { hari: 'Jumat', checked: false, disabled: false, pukul: null, sampai: null },
    { hari: 'Sabtu', checked: false, disabled: false, pukul: null, sampai: null },
    { hari: 'Minggu', checked: false, disabled: false, pukul: null, sampai: null },
  ]
  judul_lowongan = ''
  deskripsi_lowongan = ''
  jenjang_dipilih = ''
  kategori_dipilih: number
  metode_dipilih = ''
  durasi_lowongan: number
  banyak_pertemuan: number = 1
  biaya_jasa: number
  tanggal_mulai = ''
  alamat=''
  alamat_lengkap=''
  kecamatan=''
  kelurahan=''
  input_x:number
  input_y:number
  



  constructor(public ot: OrangTuaService, public tk: TempatKursusService, private authService: AuthService,
    private router:Router) {
    this.email = authService.email
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
    // console.log('tgl_mulai'+this.tanggal_mulai)
  }

  async getProfil() {
    this.ot.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.nama = data['data'][0].nama_orang_tua
          this.id = data['data'][0].idorang_tua
          console.log("anu" + this.nama + ", ID: " + this.id)
        }
      }
    )
  }



  submit() {
    console.log('save')
    console.log(this.tanggal_mulai)
    console.log(this.kategori_dipilih)
    console.log(this.metode_dipilih)

    let chechBoxterpilih = this.jadwal.filter((item) => item.checked)
    // console.log(terpilih)
    // this.tk.simpanJadwal(terpilih).subscribe(
    //   data => {
    //     console.log(data)
    //   }
    // )
    //  let terpilih = this.jadwal.filter((item) => item.checked)
 

    this.ot.bukaLowonganService(this.biaya_jasa, this.banyak_pertemuan, this.metode_dipilih,
      this.durasi_lowongan, this.tanggal_mulai, this.judul_lowongan, this.deskripsi_lowongan, this.jenjang_dipilih,
      this.id, this.kategori_dipilih, chechBoxterpilih,this.alamat,this.kecamatan,this.kelurahan,this.input_x,this.input_y).subscribe(
        data => {
          if (data['result'] == 'success') {
            alert('data berhasil disimpan')
            this.router.navigateByUrl('/')

            this.judul_lowongan = ''
            this.deskripsi_lowongan = ''
            this.jenjang_dipilih = ''
            this.metode_dipilih = ''
            this.tanggal_mulai = ''
            this.kategori_dipilih=0
            this.durasi_lowongan=null
            this.banyak_pertemuan=null
            this.biaya_jasa=null
            this.alamat=''
            this.kecamatan=''
            this.kelurahan=''
            this.input_x=null
            this.input_y=null

            this.jadwal['checked']=false
            // tanggal




            // this.location = {
            //   lat: parseFloat(data['data'][0].lokasi_lat),
            //   lng: parseFloat(data['data'][0].lokasi_long)
            // }
            // this.lokasi()
          } else {
            alert('data gagal disimpan')
          }
        }
      )


    // console.log(terpilih)
    // this.tk.simpanJadwal(terpilih).subscribe(
    //   data => {
    //     console.log(data)
    //   }
    // )
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

  async ngOnInit() {
    this.category()

    this.getProfil()
  }


}

