import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';
import { TempatKursusService } from 'src/app/services/tempat-kursus/tempat-kursus.service';

@Component({
  selector: 'app-list-pesan-ortu',
  templateUrl: './list-pesan-ortu.component.html',
  styleUrls: ['./list-pesan-ortu.component.scss'],
})
export class ListPesanOrtuComponent implements OnInit {
  listChat = []
  listChatGuru = []

  idortu: number

  constructor(private ot: OrangTuaService, private at: ActivatedRoute) { }

  listKursus() {
    this.ot.listPesanOrtuKursusService(this.idortu).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.listChat = data['data']

          // list pesan ortu dengan guru privat
          this.ot.listPesanOrtuGuruService(this.idortu).subscribe(
            (data) => {
              this.listChatGuru = data['data']

            }
          )

        }
      }
    )

  }

  listGuru() {
    // this.ot.listPesanOrtuKursusService().subscribe(
    //   (data) => {
    //     if (data['result'] == 'success') {
    //       this.listChat = data['data']

          // list pesan ortu dengan guru privat
          // this.ot.listPesanOrtuGuruService().subscribe(
          //   (data) => {
          //     if (data['result'] == 'success') {
          //       this.listChatGuru = data['data']
          //     }

          //   }
          // )

      //   }
      // }
    // )

  }
  doRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.listKursus();
      // this.listInbox();
    }, 100);
  }

  async ngOnInit() {
    this.idortu = this.at.snapshot.params['idortu']

    this.listKursus()
    this.listGuru()
    console.log("id" + this.idortu)
    // await window.location.reload()



  }

}
