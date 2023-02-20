import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';

@Component({
  selector: 'app-detail-pendaftar',
  templateUrl: './detail-pendaftar.component.html',
  styleUrls: ['./detail-pendaftar.component.scss'],
})
export class DetailPendaftarComponent implements OnInit {
  idPendaftar: number = this.at.snapshot.params['idPendaftar']
  idLowongan: number = this.at.snapshot.params['idLowongan']

  pengalaman: string = ''
  berkas_pendaftar: string = ''
  berkas_profil_guru: string = ''

  note: string = ''
  tempat_pendidikan: string = ''
  pendidikan: string = ''
  nama: string = ''
  gambar: string = ''
  tgl_lahir: string = ''
  telepon: string = ''
  usia: number
  jenis_kelamin: string = ''
  list_history_kontrak: []
  biaya_tawar: number
  valRate = 0
  komentars: []

  constructor(private at: ActivatedRoute, private ot: OrangTuaService, private router: Router,
    private alertController: AlertController) { }

  async terima() {
    const alert = await this.alertController.create({
      header: 'Apakah Anda yakin ingin menerima kandidat ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          // handler: () => {
          //   this.handlerMessage = 'Alert canceled';
          // },
        },
        {
          text: 'Ya',
          role: 'confirm',
          handler: () => {
            this.router.navigateByUrl('/kontrak/' + this.idPendaftar + "/" + this.idLowongan)

          }

          // handler: () => {
          //   this.ot.terimaPendaftarSerivce(this.idLowongan,this.idPendaftar).subscribe(
          //     (data)=>{
          //       if(data['result']='success'){
          //         this.router.navigateByUrl('/')

          //       }
          //     }
          //   )
          // },
        },
      ],
    });

    await alert.present();

    // const { role } = await alert.onDidDismiss();
    // this.roleMessage = `Dismissed with role: ${role}`;
  }



  getDetailPendaftar() {
    this.ot.detailPendaftarSerivce(this.idLowongan, this.idPendaftar).subscribe(
      (data) => {
        if (data['result'] = 'success') {
          this.pengalaman = data['data'][0].pengalaman//o
          this.berkas_pendaftar = data['data'][0].berkas_pendaftar
          this.berkas_profil_guru = data['data'][0].berkas_guru
          this.note = data['data'][0].note_pendaftar
          this.tempat_pendidikan = data['data'][0].tempat_jenjang_terakhir//k
          this.pendidikan = data['data'][0].jenjang_terakhir//k
          this.nama = data['data'][0].nama_guru_privat//ok
          this.gambar = data['data'][0].gambar//k
          this.jenis_kelamin = data['data'][0].jenis_kelamin//k

          this.tgl_lahir = data['data'][0].tgl_lahir //k
          var tahun_lahir = new Date(this.tgl_lahir).getFullYear()
          var tgl_sekarang = new Date();
          var tahunSkg = new Date(tgl_sekarang).getFullYear()
          this.usia = tahunSkg - tahun_lahir//o

          this.telepon = data['data'][0].telepon//k
          this.biaya_tawar = data['data'][0].biaya_tawar//k

          // get History
          this.ot.historyKontrakGuruSerivce(this.idPendaftar).subscribe(
            (data) => {
              if (data['result'] == 'success') {
                this.list_history_kontrak = data['data']

                // Get ulasan
                this.ot.historyUlasanGuruSerivce(this.idPendaftar).subscribe(
                  (data2) => {
                    this.komentars = data2['data']  
                    this.valRate = data2.rerata_rating
                    console.log("rara" + this.valRate)
                  }

                )
              }
            }
          )





        }
      }
    )
  }

  async ngOnInit() {
    this.getDetailPendaftar()
    console.log(this.idPendaftar + "-" + this.idLowongan)
  }

}
