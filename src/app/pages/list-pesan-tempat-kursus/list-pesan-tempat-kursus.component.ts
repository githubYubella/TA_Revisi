import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';
import { TempatKursusService } from 'src/app/services/tempat-kursus/tempat-kursus.service';

@Component({
  selector: 'app-list-pesan-tempat-kursus',
  templateUrl: './list-pesan-tempat-kursus.component.html',
  styleUrls: ['./list-pesan-tempat-kursus.component.scss'],
})
export class ListPesanTempatKursusComponent implements OnInit {
  listChat = []
  idkursus:number
  constructor(private tk:TempatKursusService,private ot:OrangTuaService,private at: ActivatedRoute) { }
  
  
  doRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.listPesan();
      // this.listInbox();
    }, 100);
  }
  listPesan() {
    this.tk.listPesanService(this.idkursus).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.listChat = data['data']
        }
      }
    )
  }

  async ngOnInit() { 
    this.idkursus = this.at.snapshot.params['idkursus']
    this.listPesan()

  }

}
