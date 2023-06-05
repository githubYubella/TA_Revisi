import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';
import { TempatKursusService } from 'src/app/services/tempat-kursus/tempat-kursus.service';

@Component({
  selector: 'app-kirim-ulasan-untuk-tempat-kursus',
  templateUrl: './kirim-ulasan-untuk-tempat-kursus.component.html',
  styleUrls: ['./kirim-ulasan-untuk-tempat-kursus.component.scss'],
})
export class KirimUlasanUntukTempatKursusComponent implements OnInit {
  idkurus: number = this.at.snapshot.params['idkursus']
  idortu: number = this.at.snapshot.params['idOrtu']
  valRate: number = 0
  ulasan = ''
  constructor(public at: ActivatedRoute, public tk: TempatKursusService,
    private ot: OrangTuaService, private router: Router) { }

  kirimUlasan() {
    if (this.valRate == 0 || this.ulasan == "") {
      alert('Harap lengkapi data')
    } else {


      this.ot.kirimUlasanTempatKursusService(this.idkurus, this.idortu, this.valRate, this.ulasan).subscribe(
        (data) => {
          if (data['result'] == 'success') {
            alert('Ulasan berhasil dikirim.')
            this.router.navigateByUrl('/')
          }
        }
      )
    }
  }

  async ngOnInit() {
    // console.log("kursus adalah "+this.idkurus+", ortu "+this.idortu)
  }

}
