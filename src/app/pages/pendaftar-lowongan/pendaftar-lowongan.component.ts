import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { getTime } from 'date-fns/esm';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';

@Component({
  selector: 'app-pendaftar-lowongan',
  templateUrl: './pendaftar-lowongan.component.html',
  styleUrls: ['./pendaftar-lowongan.component.scss'],
})
export class PendaftarLowonganComponent implements OnInit {
  list_pendaftar = []
  gambar = ''
  nama = ''
  alamat = ''
  pendidikan = ''
  usia: number
  tgl_lahir: Date
  tgl_sekarang: Date
  tahun: number
  tahunSkg: number
  idLowongan:number
  status:string=''
  constructor(private ot: OrangTuaService, private at: ActivatedRoute) { }
  listUsia = []
  getPendaftar() {
    this.idLowongan = this.at.snapshot.params['id']
    this.tgl_sekarang =new Date();
    
    this.ot.listPendaftarService(this.idLowongan).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.list_pendaftar = data['data']

          this.list_pendaftar.forEach((val, i) => {
            this.tgl_lahir = val.tgl_lahir
            this.tahun = new Date(this.tgl_lahir).getFullYear()
            this.tahunSkg = new Date(this.tgl_sekarang).getFullYear()
            this.usia = this.tahunSkg - this.tahun
            console.log('umur tahun' + this.usia, i)
            data['data'][i].umur = this.usia
          });
        }
      }
    )
  }
  async ngOnInit() {
    this.getPendaftar()
  }

}
