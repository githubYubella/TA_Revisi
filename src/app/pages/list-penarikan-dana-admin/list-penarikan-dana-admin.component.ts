import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-list-penarikan-dana-admin',
  templateUrl: './list-penarikan-dana-admin.component.html',
  styleUrls: ['./list-penarikan-dana-admin.component.scss'],
})
export class ListPenarikanDanaAdminComponent implements OnInit {
  email = ""

  constructor(private ad: AdminService, private authService: AuthService, private router: Router) {
    this.email = authService.email

  }

  list_tarik_dana_guru: []
  async logout() {
    await this.authService.logout()
    this.router.navigateByUrl('login')
    window.location.reload()

  }

  penarikanDilakukan(idguru: number, nominal: number, idtarikdana: number) {
    // console.log(idguru+ " dan nominal -- "+ nominal)
    // get 
    this.ad.setujuTarikDana(idguru, nominal, idtarikdana).subscribe(
      (data) => {
        if (data['result'] = 'success') {
          alert('Status pembayaran berhasil diperbarui')
          window.location.reload()
        }
      }
    )
  }





  listTarikDana() {
    var kosong = ''
    this.ad.listGuruTarikDana().subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.list_tarik_dana_guru = data['data']
        } else {
          kosong = "tidak ada data"
          this.list_tarik_dana_guru = data['data']
          console.log('er ' + data['result'])
        }
      }
    )
  }

  async ngOnInit() {
    this.listTarikDana()
  }

}
