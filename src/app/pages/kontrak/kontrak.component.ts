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
  tanggal_kontrak = format(Date.now(), "yyyy-MM-dd")
  biaya_jasa: number=0
  kesepakatan = ''
  tgl_tagihan = ''
  idortu: number
  list_admin: []
  bank_dipilih: number=5

  constructor(private at: ActivatedRoute, private ot: OrangTuaService, private router: Router,
    private gp: GuruPrivatService) { }

  terima() {
    if (this.biaya_jasa == 0 || this.kesepakatan == "" ) {
      alert("Harap lengkapi data ")

    } else {
      this.ot.terimaPendaftarSerivce(this.idLowongan, this.idPendaftar, this.idortu, this.kesepakatan,
        this.biaya_jasa, this.tanggal_kontrak, this.bank_dipilih
        // ,this.tgl_tagihan
      )
        .subscribe(
          (data) => {
            if (data['result'] = 'success') {
              alert("Kontrak berhasil dikirim Silahkan bayar dan Upload bukti pembayaran pada menu 'Kursus Anda'")
              this.router.navigateByUrl('/')
            }
          }
        )
    }
  }


  detailLowongan() {
    this.gp.detailLowongan(this.idLowongan).subscribe(
      (data) => {
        if (data['result'] = 'success') {
          this.idortu = data['data'][0].idorang_tua
          console.log('idortu +' + this.idortu)
        }
      }
    )

    this.ot.listAdminService().subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.list_admin = data['data']
        }
      }
    )


  }

  async ngOnInit() {
    this.detailLowongan()
    console.log(this.idPendaftar + "-" + this.idLowongan)
  }

}

