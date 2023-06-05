import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { GuruPrivatService } from 'src/app/services/guru-privat/guru-privat.service';

@Component({
  selector: 'app-penarikan-dana-guru',
  templateUrl: './penarikan-dana-guru.component.html',
  styleUrls: ['./penarikan-dana-guru.component.scss'],
})
export class PenarikanDanaGuruComponent implements OnInit {
  nominal: number = 0
  no_rek: string = ''
  tgl_sekarang: string
  constructor(private gp: GuruPrivatService, private at: ActivatedRoute,
    private router: Router) { }

  tarikDana() {
    if (this.nominal == 0 || this.no_rek == "") {
      alert('Harap lengkapi data')
    }
    else {
      var idguru: number = this.at.snapshot.params['id']

      this.tgl_sekarang = format(Date.now(), "yyyy-MM-dd")
      this.gp.tarikDanaService(idguru, this.nominal, parseInt(this.no_rek), this.tgl_sekarang).subscribe(
        (data) => {
          if (data['result'] == 'success') {
            alert('Penarikan Dana sedang diproses. Silahkan cek rekening Anda')
            // this.router.navigate(['/'])

          }else
          {
            alert(data['message'])
          }
        }
      )
    }

  }

  async ngOnInit() {
    console.log('tgl skg: ' + this.tgl_sekarang)
  }

}
