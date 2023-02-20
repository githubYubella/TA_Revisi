import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuruPrivatService } from 'src/app/services/guru-privat/guru-privat.service';

@Component({
  selector: 'app-detail-riwayat-absen-guru',
  templateUrl: './detail-riwayat-absen-guru.component.html',
  styleUrls: ['./detail-riwayat-absen-guru.component.scss'],
})
export class DetailRiwayatAbsenGuruComponent implements OnInit {
   idLowongan: number = this.at.snapshot.params['id']
  list_riwayat_absen = []
  constructor(private gp: GuruPrivatService, private at: ActivatedRoute) { }

  getListRiwayatAbsen() {
    // Get List Riwayat Absen
 

    // console.log("idlow : "+this.idLowongan)
  


    this.gp.listRiwayatAbsenService(this.idLowongan).subscribe(
      
      (data) => {
        if (data['result'] == 'success') {
          this.list_riwayat_absen = data['data']
        }else{
          this.list_riwayat_absen = data['data']
        }
        

      }
    )
  }

  async ngOnInit() {
    this.getListRiwayatAbsen()
  }

}
