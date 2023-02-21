import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format, nextDay } from 'date-fns';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';

@Component({
  selector: 'app-bayar-orang-tua',
  templateUrl: './bayar-orang-tua.component.html',
  styleUrls: ['./bayar-orang-tua.component.scss'],
})
export class BayarOrangTuaComponent implements OnInit {
  // tgl_sekarang = ''
  file: any
  // idortu: number

  bayar_bersih: number
  kode_bayar: string
  total_bayar: number
  tgl_bayar = ''
  list_admin: []
  bank_dipilih: number
  tgl_tagihan: string
  idtransaksi: number
  keterangan_pembayaran = ''
  idLowongan: number = this.at.snapshot.params['idLowongan']
  idGuru: number = this.at.snapshot.params['idGuru']
  idOrtu: number = this.at.snapshot.params['idOrtu']
  idadmin: number
  constructor(private ot: OrangTuaService, private at: ActivatedRoute,
    private router: Router) {

  }
  async setTanggalBayar(event) {
    this.tgl_bayar = format(new Date(event.target.value), "yyyy-MM-dd")
    console.log(this.tgl_bayar)

  }

  getDetailBayar() {
    var idLowongan: number = this.at.snapshot.params['idLowongan']
    console.log("idlow" + idLowongan)

    // this.ot.detailBayarSerivce(idLowongan).subscribe(
    //   (data) => {
    //     if (data['result'] == 'success') {

    //       this.bayar_bersih = data['bayar_bersih']
    //       this.kode_bayar = data['kode']
    //       this.total_bayar = data['total_bayar']
    //       this.tgl_tagihan = data['tgl_tagihan']
    //       this.idtransaksi = data['idtransaksi']
    //       // console.log('idtransaksi'+this.idtransaksi)
    //       // console.log('bersih '+this.bayar_bersih+". kode"+this.kode_bayar+". totalBYR= "+this.total_bayar)
    //     }
    //   }
    // )

    // Cek untuk melakukan pembayaran selanjutnya
    this.ot.cekKumpulanDetailBayarService(this.idOrtu, idLowongan, this.idGuru).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          // this.idadmin = data['data'][0].idadmin
          this.keterangan_pembayaran = 'Pembayaran berikutnya'
          // this.bayar_bersih = data['data'][0].bayar_bersih
          // this.kode_bayar = data['data'][0].kode
          // this.total_bayar = data['data'][0].total_bayar_bersih
          // this.tgl_tagihan = data['data'][0].tgl_tagihan
          // this.idtransaksi = data['data'][0].idtransaksi
          console.log('Sudah ada pembayaran pada lowongan ini sebelumya.')
        }
        else if (data['result'] == 'success_1') {
          this.keterangan_pembayaran = 'Pembayaran pertama'
          // this.ot.detailBayarSerivce(idLowongan).subscribe(
          //   (data) => {
          //     if (data['result'] == 'success') {
          //       this.bayar_bersih = data['bayar_bersih']
          //       this.kode_bayar = data['kode']
          //       this.total_bayar = data['total_bayar']
          //       this.tgl_tagihan = data['tgl_tagihan']
          //       this.idtransaksi = data['idtransaksi']
          //       // console.log('idtransaksi'+this.idtransaksi)
          //       // console.log('bersih '+this.bayar_bersih+". kode"+this.kode_bayar+". totalBYR= "+this.total_bayar)
          //     }
          //   }
          // )
        }
        this.ot.detailBayarSerivce(idLowongan).subscribe(
            (data) => {
              if (data['result'] == 'success') {

                this.bayar_bersih = data['bayar_bersih']
                this.kode_bayar = data['kode']
                this.total_bayar = data['total_bayar']
                this.tgl_tagihan = data['tgl_tagihan']
                this.idtransaksi = data['idtransaksi']
                this.idadmin = data['idadmin']

              }
            }
          )
      }
    )

  }

  kirimBuktiBayar() {
    // var idLowongan: number = this.at.snapshot.params['idLowongan']
    // var idGuru: number = this.at.snapshot.params['idGuru']
    // var idOrtu: number = this.at.snapshot.params['idOrtu']

    const uploadData = new FormData();
    uploadData.append('image', this.file, this.file.name);
    uploadData.append('tgl_bayar', this.tgl_bayar);
    uploadData.append('bayar_bersih', this.bayar_bersih.toString());
    uploadData.append('kode_bayar', this.kode_bayar);
    uploadData.append('idtransaksi', this.idtransaksi.toString());

    // uploadData.append('idadmin', this.bank_dipilih.toString());
    // uploadData.append('idOrtu', idOrtu.toString());
    // uploadData.append('idGuru', idGuru.toString());
    // uploadData.append('rating', this.valRate.toString());
    // uploadData.append('komentar',this.ulasan);
    // uploadData.append('tgl_tagihan',this.tgl_tagihan);



    // uploadData.append('idLowongan', idLowongan.toString());
    // console.log('kirim'+this.kode_bayar)
    this.ot.kirimBuktiService(uploadData).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          alert("Bukti Pembayaran telah dikirim.")
          this.router.navigate(['/'])
        }
        else {
          alert("Register Error : " + ['message'])
        }
      }
    )

    // this.gp.kirimLamaranService(uploadData).subscribe((resp) => {
    //   const parse = JSON.parse(JSON.stringify(resp))
    //   console.log(resp);
    //   if (parse['result'] == 'success') {
    //     alert("Register Success")
    //     this.router.navigate(['/'])


    //   }
    //   else {
    //     alert("Register Error : " + resp['message'])
    //   }
    // })
  }

  kirimBuktiBayarBerikutnya() {
    var idLowongan: number = this.at.snapshot.params['idLowongan']
    // var idGuru: number = this.at.snapshot.params['idGuru']
    // var idOrtu: number = this.at.snapshot.params['idOrtu']

    const uploadData = new FormData();
    uploadData.append('image', this.file, this.file.name);
    uploadData.append('tgl_bayar', this.tgl_bayar);
    uploadData.append('bayar_bersih', this.bayar_bersih.toString());
    uploadData.append('kode_bayar', this.kode_bayar);
    uploadData.append('idadmin', this.idadmin.toString());
    uploadData.append('idOrtu', this.idOrtu.toString());
    uploadData.append('idGuru', this.idGuru.toString());
    uploadData.append('tgl_tagihan',this.tgl_tagihan);
    uploadData.append('idLowongan', idLowongan.toString());

    this.ot.kirimBuktiBerikutnyaService(uploadData).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          alert("Bukti Pembayaran telah dikirim.")
          this.router.navigate(['/'])
        }
        else {
          alert("Register Error : " + ['message'])
        }
      }
    )
  }

  onFileSelected(event) {
    this.file = event.target.files[0]
    console.log(this.file)
  }

  async ngOnInit() {
    this.getDetailBayar()
    var today = new Date();
    var nextdate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10);
    console.log("tgl bayar" + format(nextdate, "yyyy-MM-dd"))

  }

}
