import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { GuruPrivatService } from 'src/app/services/guru-privat/guru-privat.service';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';

@Component({
  selector: 'app-kontrak',
  templateUrl: './kontrak.component.html',
  styleUrls: ['./kontrak.component.scss'],
})
export class KontrakComponent implements OnInit {
  idPendaftar: number = this.at.snapshot.params['idPendaftar']
  idLowongan: number = this.at.snapshot.params['idLowongan']
  tanggal_mulai = ''
  biaya_jasa: number
  kesepakatan = ''
tgl_tagihan=''
  idortu: number
  constructor(private at: ActivatedRoute, private ot: OrangTuaService, private router: Router,
    private gp: GuruPrivatService) { }

  terima() {
    this.ot.terimaPendaftarSerivce(this.idLowongan, this.idPendaftar,this.idortu,this.kesepakatan,
      this.biaya_jasa,this.tanggal_mulai
      // ,this.tgl_tagihan
      )
      .subscribe(
      (data) => {
        if (data['result'] = 'success') {
          alert('Kontrak berhasil dikriim')
          this.router.navigateByUrl('/')

        }
      }
    )
  }
  async setTanggalMulai(event) {
    this.tanggal_mulai = format(new Date(event.target.value), "yyyy-MM-dd")
    var tgl_mulai = new  Date(event.target.value)

    var tgl_jumlah = new Date(tgl_mulai.getFullYear(),tgl_mulai.getMonth(),tgl_mulai.getDate()+10);
    this.tgl_tagihan = format(new Date(tgl_jumlah), "yyyy-MM-dd")
    console.log('tgl tghn' +this.tgl_tagihan)
    

    // console.log('tgl_mulai'+this.tanggal_mulai)
  }

  detailLowongan() {
    this.gp.detailLowongan(this.idLowongan).subscribe(
      (data) => {
        if (data['result'] = 'success') {
          this.idortu = data['data'][0].idorang_tua
          console.log('idortu +' +this.idortu)
        }
      }
    )
  }

  async ngOnInit() {
this.detailLowongan()
    console.log(this.idPendaftar + "-" + this.idLowongan)
  }

}

