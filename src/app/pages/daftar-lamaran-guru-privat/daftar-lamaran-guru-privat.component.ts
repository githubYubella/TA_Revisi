import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GuruPrivatService } from 'src/app/services/guru-privat/guru-privat.service';

@Component({
  selector: 'app-daftar-lamaran-guru-privat',
  templateUrl: './daftar-lamaran-guru-privat.component.html',
  styleUrls: ['./daftar-lamaran-guru-privat.component.scss'],
})
export class DaftarLamaranGuruPrivatComponent implements OnInit {
  idguru: number
  email = ''
  list_lamaran = []
  constructor(private gp: GuruPrivatService, private authService: AuthService) {
    this.email = authService.email
  }



  async listDaftarLamaranGuru() {
    // Get id guru privat
    this.gp.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.idguru = data['data'][0].idguru_privat
          // console.log("syal: "+data['data'][0].idguru_privat)

          // Get List lamaran
          this.gp.listDaftarLamaranService(this.idguru).subscribe(
            (data) => {
              if (data['result'] == 'success') {
                this.list_lamaran = data['data']
                // console.log("syal: "+data['data'][0].idguru_privat)
              }
            }
          )
        }
      }
    )
  }

  async ngOnInit() {
    this.listDaftarLamaranGuru()
  }

}
