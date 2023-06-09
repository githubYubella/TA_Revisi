import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';

@Component({
  selector: 'app-detail-pesan-ortu',
  templateUrl: './detail-pesan-ortu.component.html',
  styleUrls: ['./detail-pesan-ortu.component.scss'],
})
export class DetailPesanOrtuComponent implements OnInit {
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
  constructor(private router: Router, private at: ActivatedRoute, private ot: OrangTuaService, private authService: AuthService) {
    this.email = authService.email
  }

  kirim() {
  
    this.tglKirim = format(new Date(), "yyyy-MM-dd")
   
    if(this.pesan==""){
      alert('Tulis pesan anda')
    }else{
      this.ot.chatKeKursusService(this.nama_saya + ": " + this.pesan, this.tglKirim, this.idortu, this.idKepada).subscribe(
        (data) => {
          if (data['result'] == 'success') {
            // alert("Pesan Terkirim")
            this.pesans.push(this.nama_saya + ": " + this.pesan)
            this.pesan = ''
  
  
          }
        }
      )
    }


    
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
          this.ot.detailPesanOrtuKursusService(this.idortu, this.idKepada).subscribe(
            (data) => {
              this.list_pesan = data['data']
              this.nama_kepada = data['data'][0].nama
              this.idchat = data['data'][0].idchat
              // if(data['data'])
            }
          )
          // Update status pesan
          this.ot.updateStatusPesanKursusService(this.idKepada).subscribe(
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
  onBackClick() {
    console.log("Login Clicked");
    this.router.navigate(['./list-pesan-ortu/'+this.idortu]);
    // window.location.reload(['./list-pesan-ortu/'+this.idortu])
  }
  async ngOnInit() {
    this.listPesan()
  }

}
