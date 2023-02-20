import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GuruPrivatService } from 'src/app/services/guru-privat/guru-privat.service';

@Component({
  selector: 'app-presensi-kursus-privat',
  templateUrl: './presensi-kursus-privat.component.html',
  styleUrls: ['./presensi-kursus-privat.component.scss'],
})
export class PresensiKursusPrivatComponent implements OnInit {
email=''
idguru:number
list_lamaran_diterima:[]
list_riwayat_absen:[]
idlowongan:number=0

  constructor(private gp:GuruPrivatService,private authService: AuthService,
    private alertController: AlertController) { 
    this.email = authService.email

  }

  @ViewChild('popover') popover;

  isOpen = false;
  pesan=''

  // presentPopover(e: Event) {
  //   this.popover.event = e;
  //   this.isOpen = true;
  // }

  listRiwayatAbsen(){
    // this.gp.listRiwayatAbsenService().subscribe(
    //   (data)=>{
    //     if (data['result'] == 'success') {
    //       this.list_riwayat_absen = data['data']
    //     }

    //   }
    // )
  }



  listDaftarLamaranDiterima(){
    // Get id guru privat
    this.gp.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.idguru = data['data'][0].idguru_privat

          // Get List lamaran
          this.gp.listLamaranDiterimaService(this.idguru).subscribe(
            (data) => {
              if (data['result'] == 'success') {
                this.list_lamaran_diterima = data['data']
                // this.idlowongan=data['data']
              }
            }
          )
        }
        else{
          this.list_lamaran_diterima = data['data']
          console.log('er '+data['result'])
          // this.list_lamaran_diterima = data['result']['data']

          // this.pesan="Riwayat tidak ditemukan"
          // console.log("tressd: "+ data['result'])

        }
      }
    )
  }
  async ngOnInit() {
    this.listDaftarLamaranDiterima()
    // this.listRiwayatAbsen()
  }

}
