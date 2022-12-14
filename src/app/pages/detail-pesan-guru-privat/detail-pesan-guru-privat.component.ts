import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GuruPrivatService } from 'src/app/services/guru-privat/guru-privat.service';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';

@Component({
  selector: 'app-detail-pesan-guru-privat',
  templateUrl: './detail-pesan-guru-privat.component.html',
  styleUrls: ['./detail-pesan-guru-privat.component.scss'],
})
export class DetailPesanGuruPrivatComponent implements OnInit {
  pesans = []
  pesan = ''
  email = ''
  idguru: number
  list_pesan = []
  dari = ''
  tglKirim = ""
  nama_kepada = ""
  idKepada: number
  nama_saya = ""
  constructor(private at: ActivatedRoute,
    private ot: OrangTuaService,
    private gp: GuruPrivatService,
    private authService: AuthService
  ) {
    this.email = authService.email
  }

  kirim() {
    // // this.sc.emit('kirim',{text:this.pesan})
    // // this.pesan=''
    this.tglKirim = format(new Date(), "yyyy-MM-dd")
    // this.pesans.push(this.nama_saya+": " + this.pesan)
    // // + " " +
    // //   new Date().toTimeString().split("GMT")[0].trim()
    // // )
    // this.pesan = ''


    this.ot.chatKeGuruService(this.nama_saya + ": " + this.pesan, this.tglKirim, this.idKepada
      , this.idguru).subscribe(
        (data) => {
          if (data['result'] == 'success') {
            // alert("Pesan Terkirim")
            this.pesans.push(this.nama_saya + ": " + this.pesan)
            this.pesan = ''


          }
        }
      )
  }


  listPesan() {
    this.idKepada = this.at.snapshot.params['idkepada']
    // get idortu
    this.gp.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.idguru = data['data'][0].idguru_privat
          // console.log('id'+this.id)
          this.nama_saya = data['data'][0].nama_guru_privat

          // detail pesan
          this.ot.detailPesanOrtuGuruService(this.idKepada, this.idguru).subscribe(
            (data) => {
              if (data['result'] == 'success') {
                this.list_pesan = data['data']
                this.nama_kepada = data['data'][0].nama_orang_tua
                console.log("kepada: " + this.nama_kepada)
                // if(data['data'])
              }
            }
          )

          // Update status pesan
          this.gp.updateStatusPesanOrtuService(this.idKepada).subscribe(
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
