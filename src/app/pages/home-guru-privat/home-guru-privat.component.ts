import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GuruPrivatService } from 'src/app/services/guru-privat/guru-privat.service';

@Component({
  selector: 'app-home-guru-privat',
  templateUrl: './home-guru-privat.component.html',
  styleUrls: ['./home-guru-privat.component.scss'],
})
export class HomeGuruPrivatComponent implements OnInit {
  nama_login = ""
  email = ""
  role = ''
  lowongan = []
  search = ''
  idguru: number
  constructor(private gp: GuruPrivatService,
    private authService: AuthService, private router: Router) {
    this.email = authService.email
    this.role = authService.role
  }


  searchbar(ev: any) {
    let search_value = ev.target.value
    this.search = search_value
    this.listLowongan()
  }
  async logout() {
    await this.authService.logout()
    this.router.navigateByUrl('login')
    window.location.reload()

  }

  listLowongan() {
    this.gp.listLowonganService(this.idguru, this.search).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.lowongan = data['data']
        }else{
          this.lowongan = data['data']
        }
      }
    )
  }

  getNamaGuru() {
    this.gp.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.nama_login = data['data'][0].nama_guru_privat
          this.idguru = data['data'][0].idguru_privat
          this.listLowongan()


          // console.log("tes id" + this.idguru)
          // console.log("syal: "+data['data'][0].nama_orang_tua)
        }
      }
    )
  }

  async ngOnInit() {
    this.getNamaGuru()
    // this.listLowongan()
  }

}
