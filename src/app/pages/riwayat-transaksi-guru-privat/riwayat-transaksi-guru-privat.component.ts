import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GuruPrivatService } from 'src/app/services/guru-privat/guru-privat.service';

@Component({
  selector: 'app-riwayat-transaksi-guru-privat',
  templateUrl: './riwayat-transaksi-guru-privat.component.html',
  styleUrls: ['./riwayat-transaksi-guru-privat.component.scss'],
})
export class RiwayatTransaksiGuruPrivatComponent implements OnInit {
  list_tambah_transaksi: []
  email = ''
  idguru: number
  nama_ortu=''

  list_penarikan_dana:[]

  constructor(private gp: GuruPrivatService, private authService: AuthService) {
    this.email = authService.email
  }

  listRiwayatTransaksi() {
    this.gp.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.idguru = data['data'][0].idguru_privat
          // get list
          this.gp.riwayatTambahTransaksiService(this.idguru).subscribe(
            (data) => {
              if (data['result'] = 'success') {
                this.list_tambah_transaksi = data['data']
              }
            }
          )
          this.gp.riwayatTarikDanaService(this.idguru).subscribe(
            (data) => {
              if (data['result'] = 'success') {
                this.list_penarikan_dana = data['data']
              }
            }
          )
        }
      }
    )
  }

  async ngOnInit() { 
    this.listRiwayatTransaksi()
  }

}
