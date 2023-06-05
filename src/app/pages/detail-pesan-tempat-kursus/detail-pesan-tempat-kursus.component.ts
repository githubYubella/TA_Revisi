import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';
import { TempatKursusService } from 'src/app/services/tempat-kursus/tempat-kursus.service';

@Component({
  selector: 'app-detail-pesan-tempat-kursus',
  templateUrl: './detail-pesan-tempat-kursus.component.html',
  styleUrls: ['./detail-pesan-tempat-kursus.component.scss'],
})
export class DetailPesanTempatKursusComponent implements OnInit {
  pesans = []
  pesan = ''
  email = ''
  idkursus: number
  list_pesan = []
  dari = ''
  tglKirim = ""
  nama_kepada = ""
  idKepada: number
  nama_saya = ""
  constructor(private at: ActivatedRoute,
    private ot: OrangTuaService,
    private tk: TempatKursusService, private authService: AuthService) {
    this.email = authService.email
  }


  kirim() {
    this.tglKirim = format(new Date(), "yyyy-MM-dd")
    if (this.pesan == "") {
      alert('Tuliskan pesan Anda')
    } else {
      this.ot.chatKeKursusService(this.nama_saya + ": " + this.pesan, this.tglKirim, this.idKepada
        , this.idkursus).subscribe(
          (data) => {
            if (data['result'] == 'success') {
              this.pesans.push(this.nama_saya + ": " + this.pesan)
              this.pesan = ''
            }
          }
        )
    }
  }

  listPesan() {
    // get idortu
    this.idKepada = this.at.snapshot.params['idkepada']
    this.tk.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.idkursus = data['data'][0].idtempat_kursus
          // console.log('id'+this.id)
          this.nama_saya = data['data'][0].nama

          // Get detail pesan
          this.ot.detailPesanOrtuKursusService(this.idKepada, this.idkursus).subscribe(
            (data) => {
              this.list_pesan = data['data']
              this.nama_kepada = data['data'][0].nama_orang_tua
              console.log("kepada: " + this.nama_kepada)
              // if(data['data'])
            }
          )

          // Update status pesan
          this.tk.updateStatusPesanOrtuService(this.idKepada).subscribe(
            (data) => {
              if (data['result'] == 'success') {
                console.log(data['result'] + ' status')
              }
            }
          )
        }
      }
    )

  }

  async ngOnInit() {
    this.listPesan()

  }

}
