import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postingan-lowongan',
  templateUrl: './postingan-lowongan.component.html',
  styleUrls: ['./postingan-lowongan.component.scss'],
})
export class PostinganLowonganComponent implements OnInit {
  email = ""
  id: number

  list_postingan = []
  judul_lowongan = ''
  handlerMessage = '';
  idnonaktif:number

  constructor(private router: Router, private alertController: AlertController, public ot: OrangTuaService, private authService: AuthService) {
    this.email = authService.email
  }

 



  async getProfil() {

    let data = await this.ot.profilService(this.email).toPromise()
    if (data['result'] == 'success') {
      this.id = data['data'][0].idorang_tua
      console.log(data['data'][0])
      console.log(", postingan ID: " + this.id)
      // this.listPostinganLowongan()
    }
  }

  listPostinganLowongan() {
    this.ot.listPostinganLowonganService(this.id).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.list_postingan = data['data']
          this.idnonaktif=data['data'][0].idbuka_lowongan
        }
        // this.list_postingan = data['data']
        console.log("list: " + this.list_postingan)
        // this.judul_lowongan = data['data']
      }
    )
  }

  async ngOnInit() {
    await this.getProfil()
    this.listPostinganLowongan()
    // console.log("oninit: " + this.id)
  }

}
