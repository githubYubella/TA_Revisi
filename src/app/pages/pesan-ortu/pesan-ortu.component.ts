import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';
import { TempatKursusService } from 'src/app/services/tempat-kursus/tempat-kursus.service';

@Component({
  selector: 'app-pesan-ortu',
  templateUrl: './pesan-ortu.component.html',
  styleUrls: ['./pesan-ortu.component.scss'],
})
export class PesanOrtuComponent implements OnInit {
  nama_tempat_kursus = ''
  idkursus: number
  idortu: number
  pesan = ""
  email = ''
  nama_saya = ''

  constructor(private ot: OrangTuaService, private at: ActivatedRoute,
    private tk: TempatKursusService, private authService: AuthService) {
    this.email = authService.email
  }

  kirim() {
    var today = format(new Date(), "yyyy-MM-dd");
    this.ot.chatKeKursusService(this.nama_saya+": " + this.pesan, today, this.idortu, this.idkursus).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          alert("Pesan Terkirim")
          this.pesan = ''
          window.location.reload()
        }
      }
    )
  }

  detailKursus() {
    this.idkursus = this.at.snapshot.params['idkursus']
    this.tk.detailTempatKursusService(this.idkursus).subscribe(
      (data) => {
        if (data['result'] = 'success') {

          this.nama_tempat_kursus = data['data'][0].nama
          // get nama ortu
          // this.ot.profilService(this.email).subscribe(
          //   (data) => {
          //     if (data['result'] == 'success') {

          //       this.nama_saya = data['data'][0].nama_orang_tua

          //       // console.log('id'+this.id)
          //       console.log(this.nama_saya + " namaku")




          //     }
          //   }
          // )

        }
      }
    )


  }

  detailProfilOrtu() {
    this.ot.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {

          this.nama_saya = data['data'][0].nama_orang_tua

          // console.log('id'+this.id)
                // console.log(this.nama_saya + " namaku")



        }
      }
    )
  }
  async ngOnInit() {
    this.idkursus = this.at.snapshot.params['idkursus']
    this.idortu = this.at.snapshot.params['idortu']

    this.detailKursus()
    this.detailProfilOrtu()
    // console.log(this.nama_saya + " namaku")


  }

}
