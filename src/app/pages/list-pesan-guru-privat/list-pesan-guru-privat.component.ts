import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuruPrivatService } from 'src/app/services/guru-privat/guru-privat.service';

@Component({
  selector: 'app-list-pesan-guru-privat',
  templateUrl: './list-pesan-guru-privat.component.html',
  styleUrls: ['./list-pesan-guru-privat.component.scss'],
})
export class ListPesanGuruPrivatComponent implements OnInit {
  listChat = []
  idguru: number
  constructor(private gp: GuruPrivatService, private at: ActivatedRoute) { }

  doRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.listPesan();
      // this.listInbox();
    }, 100);
  }

  listPesan() {
    this.gp.listPesanService(this.idguru).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.listChat = data['data']
        }
      }
    )
  }


  async ngOnInit() { 
    this.idguru = this.at.snapshot.params['idguru']

    this.listPesan()
  }

}
