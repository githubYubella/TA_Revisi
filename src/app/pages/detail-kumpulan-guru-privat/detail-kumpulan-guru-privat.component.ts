import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuruPrivatService } from 'src/app/services/guru-privat/guru-privat.service';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';

@Component({
  selector: 'app-detail-kumpulan-guru-privat',
  templateUrl: './detail-kumpulan-guru-privat.component.html',
  styleUrls: ['./detail-kumpulan-guru-privat.component.scss'],
})
export class DetailKumpulanGuruPrivatComponent implements OnInit {
  idguru: number = this.at.snapshot.params['idguru']
  idkepada: number = this.at.snapshot.params['idguru']

  // idLowongan: number = this.at.snapshot.params['idLowongan']
  pengalaman: string = ''
  berkas_cv: string = ''
  // note: string = ''
  tempat_pendidikan: string = ''
  pendidikan: string = ''
  nama: string = ''
  gambar: string = ''
  tgl_lahir: string = ''
  telepon: string = ''
  usia: number
  jenis_kelamin: string = ''
  list_history_kontrak: []
  alamat = ''
  kecamatan = ''
  kelurahan = ''
  kota = ''
  provinsi = ''
  valRate = 0
  komentars: []


  constructor(private at: ActivatedRoute, private ot: OrangTuaService, private gp:GuruPrivatService) {

  }


  getDetailPendaftar() {
    this.ot.detailProfilKumpulanGuruPrivatSerivce(this.idguru).subscribe(
      (data) => {
        if (data['result'] = 'success') {
          this.pengalaman = data['data'][0].pengalaman//o
          this.berkas_cv = data['data'][0].berkas_cv
          // this.note = data['data'][0].note_pendaftar
          this.tempat_pendidikan = data['data'][0].tempat_jenjang_terakhir//k
          this.pendidikan = data['data'][0].jenjang_terakhir//k
          this.nama = data['data'][0].nama_guru_privat//ok
          this.gambar = data['data'][0].gambar//k
          this.jenis_kelamin = data['data'][0].jenis_kelamin//k

          this.tgl_lahir = data['data'][0].tgl_lahir //k
          var tahun_lahir = new Date(this.tgl_lahir).getFullYear()
          var tgl_sekarang = new Date();
          var tahunSkg = new Date(tgl_sekarang).getFullYear()
          this.usia = tahunSkg - tahun_lahir//o

          this.telepon = data['data'][0].no_telepon//k
          this.alamat = data['data'][0].alamat
          this.kecamatan = data['data'][0].kecamatan
          this.kelurahan = data['data'][0].kelurahan
          this.kota = data['data'][0].kota
          this.provinsi = data['data'][0].provinsi




          // get History
          this.ot.historyKontrakGuruSerivce(this.idguru).subscribe(
            (data) => {
              if (data['result'] == 'success') {
                this.list_history_kontrak = data['data']

                // Get ulasan
                this.ot.historyUlasanGuruSerivce(this.idguru).subscribe(
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
      }
    )
  }

  async ngOnInit() {
    this.getDetailPendaftar()
    // console.log(this.idPendaftar + "-" + this.idLowongan)
  }
}
