import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';

@Component({
  selector: 'app-kursus-orang-tua',
  templateUrl: './kursus-orang-tua.component.html',
  styleUrls: ['./kursus-orang-tua.component.scss'],
})
export class KursusOrangTuaComponent implements OnInit {
  email = ''
  id:number
  list_kursus_privat:[]
  constructor(private ot: OrangTuaService,private authService: AuthService) 
  { 
    this.email = authService.email
  }

  listKursusPrivatOrtu() {
    // Get idortu
    this.ot.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.id = data['data'][0].idorang_tua
          console.log('id'+this.id)

          // Get list kursus privat
          this.ot.listKursusPrivatOrtuService(this.id).subscribe(
            (data)=>{
              if (data['result'] == 'success') {
                this.list_kursus_privat = data['data']
                // console.log('idlo'+data['data'][0].idbuka_lowongan)
                
              }
            }
          )
        }
      }
    )
  }

  async ngOnInit() {
    this.listKursusPrivatOrtu()
   }

}
