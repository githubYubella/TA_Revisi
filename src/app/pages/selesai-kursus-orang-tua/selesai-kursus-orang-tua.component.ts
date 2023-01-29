import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';

@Component({
  selector: 'app-selesai-kursus-orang-tua',
  templateUrl: './selesai-kursus-orang-tua.component.html',
  styleUrls: ['./selesai-kursus-orang-tua.component.scss'],
})
export class SelesaiKursusOrangTuaComponent implements OnInit {
  valRate: number
  ulasan: string
  tanggal_selesai = format(Date.now(), "yyyy-MM-dd")
  idlowongan: number = this.at.snapshot.params['idlowongan']

  constructor(private ot: OrangTuaService, private at: ActivatedRoute,
    private router: Router) { }

    kirimUlasan(){
      this.ot.akhiriKursusService(this.idlowongan,this.valRate,this.ulasan,this.tanggal_selesai).subscribe(
        (data)=>{
          if(data['result']='success'){
            alert("Kontrak Kursus Telah Berakhir")
            this.router.navigateByUrl('/')

          }
        }
      )

    }
  async ngOnInit() { }

}
