import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';

@Component({
  selector: 'app-detail-pesan-ortu-guru',
  templateUrl: './detail-pesan-ortu-guru.component.html',
  styleUrls: ['./detail-pesan-ortu-guru.component.scss'],
})
export class DetailPesanOrtuGuruComponent implements OnInit {
  pesans = []
  pesan = ''
  email = ''
  idortu: number
  list_pesan = []
  dari = ''
  tglKirim = ""
  nama_kepada = ""
  nama_saya = ''
  idKepada: number
  idchat: number
  teks_data = ''
  constructor(private router: Router, private at: ActivatedRoute, private ot: OrangTuaService, private authService: AuthService) {
    this.email = authService.email
  }

  kirim() {
    // // this.sc.emit('kirim',{text:this.pesan})
    // // this.pesan=''
    this.tglKirim = format(new Date(), "yyyy-MM-dd")
    // this.pesans.push("Saya: " + this.pesan)
    // // + " " +
    // //   new Date().toTimeString().split("GMT")[0].trim()
    // // )
    // this.pesan = ''


    this.ot.chatKeGuruService(this.nama_saya + ": " + this.pesan, this.tglKirim, this.idortu, this.idKepada).subscribe(
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
    this.ot.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.idortu = data['data'][0].idorang_tua
          this.nama_saya = data['data'][0].nama_orang_tua

          // console.log('id'+this.id)

          // Get list kursus privat
          this.ot.detailPesanOrtuGuruService(this.idortu, this.idKepada).subscribe(
            (data) => {
              this.list_pesan = data['data']
              this.nama_kepada = data['data'][0].nama
              this.idchat = data['data'][0].idchat
              // if(data['data'])
            }
          )

          // Update status pesan
          this.ot.updateStatusPesanGuruService(this.idKepada).subscribe(
            (data) => {
              if (data['result'] == 'success') {
                console.log(data['result'] + ' status')
              } 
            }
          )

          // Get nama Penerima(Guru)
          this.ot.detailProfilKumpulanGuruPrivatSerivce(this.idKepada).subscribe(
            (data) => {
              if (data['result'] = 'success') {
                this.nama_kepada = data['data'][0].nama_guru_privat//o
                
      
      
      
      
      
              }
            }
          )


        }
        
      }
    )

  }

  onBackClick() {
    console.log("Login Clicked");
    this.router.navigate(['./list-pesan-ortu/' + this.idortu]);
    // window.location.reload(['./list-pesan-ortu/'+this.idortu])
  }

  async ngOnInit() {

    this.listPesan()
  }

}
