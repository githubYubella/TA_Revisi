import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GuruPrivatService } from 'src/app/services/guru-privat/guru-privat.service';

@Component({
  selector: 'app-saldo-guru-privat',
  templateUrl: './saldo-guru-privat.component.html',
  styleUrls: ['./saldo-guru-privat.component.scss'],
})
export class SaldoGuruPrivatComponent implements OnInit {
saldo:number
email=''
idguru:number
  constructor(private gp:GuruPrivatService, private authService:AuthService) { 
    this.email=authService.email
  }
  getProfil() {
    this.gp.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.saldo = data['data'][0].dompet
          this.idguru = data['data'][0].idguru_privat
        }
      }
    )
  }

  async ngOnInit() {
    this.getProfil()
  }

}
