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
  nama_login=""
  email=""
  role=''
  lowongan=[]
  constructor(private gp:GuruPrivatService, 
    private authService: AuthService, private router:Router) { 
    this.email = authService.email
    this.role = authService.role
  }
  async logout() {
    await this.authService.logout()
    this.router.navigateByUrl('login')
  }

  listLowongan(){
    this.gp.listLowonganService().subscribe(
      (data) => {
        if (data['result'] == 'success') {
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
          // console.log("syal: "+data['data'][0].nama_orang_tua)
        }
      }
    )
  }

  async ngOnInit() {
    this.getNamaGuru()
    this.listLowongan()
  }

}
