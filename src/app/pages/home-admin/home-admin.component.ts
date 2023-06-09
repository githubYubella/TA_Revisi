import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
})
export class HomeAdminComponent implements OnInit {
  list_bayar: []
  email = ''
  nama_login = ''
  idadmin: number
  saldo: number
  idtrans: number
  kode_bayar: number
  total_bersih: number
  total: any
  idguru: number
  list_total_bayar: []
  tes: number
  list_lowongan: []
  list_ortu: []
  list_guru: []
  constructor(private ad: AdminService, private authService: AuthService,
    private router: Router) {
    this.email = authService.email
  }

  bayarLunas(idtrans: number) {
    console.log('trans' + idtrans)
    // get 
    this.ad.detailBayarAdminService(idtrans).subscribe(
      (data) => {
        if (data['result'] = 'success') {
          this.kode_bayar = data['data'][0].kode_pembayaran
          this.total_bersih = data['data'][0].total_bayar_bersih
          this.idguru = data['data'][0].idguru_privat


          this.ad.updateLunasService(this.kode_bayar, this.idadmin, idtrans,
            this.total_bersih, this.idguru).subscribe(
              (data) => {
                if (data['result'] == 'success') {
                  alert('Status pembayaran berhasil diperbarui')
                  window.location.reload()


                }
              }
            )

          console.log('kode bayar' + this.kode_bayar + " , " + this.total_bersih)

        }
      }
    )
  }

  async logout() {
    await this.authService.logout()
    this.router.navigateByUrl('login')
    window.location.reload()

  }

guru:[]
nama_guruAllData: string[] = []
  listBayar() {
    this.ad.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] = 'success') {
          this.nama_login = data['data'][0].bank
          this.idadmin = data['data'][0].idadmin
          this.saldo = data['data'][0].saldo

          // get list pembayaran
          this.ad.listBayarAdminService(this.idadmin).subscribe(
            (data) => {
              if (data['result'] = 'success') {
                this.list_bayar = data['data']
                this.list_lowongan = data['lowongan']
                this.list_ortu = data['ortu']
                this.list_guru = data['guru']

                // this.list_guru.forEach((value,index) => {
                //   this.nama_guruAllData.push( value['nama_guru_privat'])
                //   // this.kode_bayar = data['data'][0].kode_pembayaran
                // });
                // console.log("testi " + this.nama_guruAllData);

              }
            }
          )
        }
      }
    )

    this.tes = 100000
    const formattedNumber = this.tes.toLocaleString();
    console.log(" ribuan: " + formattedNumber)

  }
  async ngOnInit() {
    this.listBayar()
  }

}
