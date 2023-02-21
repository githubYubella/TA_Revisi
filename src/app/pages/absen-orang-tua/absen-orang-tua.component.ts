import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';

@Component({
  selector: 'app-absen-orang-tua',
  templateUrl: './absen-orang-tua.component.html',
  styleUrls: ['./absen-orang-tua.component.scss'],
})
export class AbsenOrangTuaComponent implements OnInit {
  list_detail_absen: []
  idabsen: number
  email = ''
  tgl_sekarang = ''
  idortu: number

  constructor(private ot: OrangTuaService, private at: ActivatedRoute,
    private authService: AuthService, private router: Router) {
    this.email = authService.email

  }
  masuk() {
    var id: number = this.at.snapshot.params['id']

    this.tgl_sekarang = format(Date.now(), "yyyy-MM-dd")
    this.ot.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.idortu = data['data'][0].idorang_tua
          console.log(id + ", " + this.idortu)
          this.ot.isiAbsenService(this.idortu, this.idabsen, this.tgl_sekarang).subscribe(
            (data) => {
              if (data['result'] == 'success') {
                alert('Absen Berhasil')
                // this.router.navigate(['/'])
                window.location.reload()


              } else {
                alert('Absen gagal')
              }
            }
          )

        }
      }
    )


  }

  listAbsen() {
    var id: number = this.at.snapshot.params['id']

    this.ot.listAbsenService(id).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.list_detail_absen = data['data']
          this.idabsen = data['data'][0].idabsen
          console.log('idab'+this.idabsen)

        }
        else {

        }
      }
    )
  }
  async ngOnInit() {
    this.listAbsen()
  }

}
