import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';

@Component({
  selector: 'app-detail-kontrak-orang-tua',
  templateUrl: './detail-kontrak-orang-tua.component.html',
  styleUrls: ['./detail-kontrak-orang-tua.component.scss'],
})
export class DetailKontrakOrangTuaComponent implements OnInit {
  kesepakatan = ''
  biaya_jasa: number
  tanggal_kontrak = ''
  status = ''
  idguru: number
  idortu: number
  status2 = ''
  gambar=""
  nama_guru=""
  bank=''
  constructor(private at: ActivatedRoute, private ot: OrangTuaService) { }

  getDetailKontrak() {
    var id: number = this.at.snapshot.params['id']
    this.ot.detailKontrakSerivce(id).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.kesepakatan = data['data'][0].kesepakatan
          this.biaya_jasa = data['data'][0].biaya_jasa
          this.tanggal_kontrak = data['data'][0].tgl_kontrak
          this.status = data['data'][0].status_privat
          this.idguru = data['data'][0].idguru_privat
          this.idortu = data['data'][0].idorang_tua
          this.gambar=data['data'][0].gambar
          this.nama_guru=data['data'][0].nama_guru_privat
          this.bank=data.bank





          // this.ot.cekTglTagihan(this.idguru, this.idortu, id).subscribe(
          //   (data) => {
          //     if (data['result'] == 'success') {
          //       this.status = data['status']
          //     }
          //   }
          // )

        }
      }
    )

  }

  async ngOnInit() {
    this.getDetailKontrak()
  }

}
