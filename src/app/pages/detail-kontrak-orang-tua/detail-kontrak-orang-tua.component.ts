import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';

@Component({
  selector: 'app-detail-kontrak-orang-tua',
  templateUrl: './detail-kontrak-orang-tua.component.html',
  styleUrls: ['./detail-kontrak-orang-tua.component.scss'],
})
export class DetailKontrakOrangTuaComponent implements OnInit {
  kesepakatan = ''
  biaya_jasa: number
  tanggal_mulai = ''
  constructor(private at: ActivatedRoute, private ot: OrangTuaService) { }

  getDetailKontrak() {
    var id: number = this.at.snapshot.params['id']
    this.ot.detailKontrakSerivce(id).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.kesepakatan = data['data'][0].kesepakatan
          this.biaya_jasa = data['data'][0].biaya_jasa
          this.tanggal_mulai = data['data'][0].tgl_mulai
        }
      }
    )

  }

  async ngOnInit() {
    this.getDetailKontrak()
  }

}
