import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';

@Component({
  selector: 'app-riwayat-transaksi-orang-tua',
  templateUrl: './riwayat-transaksi-orang-tua.component.html',
  styleUrls: ['./riwayat-transaksi-orang-tua.component.scss'],
})
export class RiwayatTransaksiOrangTuaComponent implements OnInit {
  list_transaksi: []
  email = ""
  idortu: number
  constructor(private authService: AuthService, private ot: OrangTuaService) {
    this.email = authService.email
  }
  listRiwayatTransaksi() {
    // get idortu
    this.ot.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.idortu = data['data'][0].idorang_tua

          // get list transaksi 
          this.ot.listRiwayatTransaksiService(this.idortu).subscribe(
            (data)=>{
              if(data['result'] == 'success'){
                this.list_transaksi=data['data']
              }
            }
          )
        }


      }
    )
  }


  async ngOnInit() { 
    this.listRiwayatTransaksi()
  }

}
