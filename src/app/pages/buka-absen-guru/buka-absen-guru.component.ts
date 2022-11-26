import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GuruPrivatService } from 'src/app/services/guru-privat/guru-privat.service';

@Component({
  selector: 'app-buka-absen-guru',
  templateUrl: './buka-absen-guru.component.html',
  styleUrls: ['./buka-absen-guru.component.scss'],
})
export class BukaAbsenGuruComponent implements OnInit {
  tanggal_buka = ''
  materi = ''
  idguru: number
  email = ''
  constructor(private gp: GuruPrivatService, private authService: AuthService,
    private at: ActivatedRoute, private router: Router) {
    this.email = authService.email
  }

  async setTanggalBukaAbsen(event) {
    this.tanggal_buka = format(new Date(event.target.value), "yyyy-MM-dd")
  }

  getGuru() {
    this.gp.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.idguru = data['data'][0].idguru_privat

        }
      }
    )
  }

  simpan() {
    var idLowongan: number = this.at.snapshot.params['id']

    this.gp.bukaAbsenService(this.tanggal_buka, this.materi, idLowongan, this.idguru).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          alert('Absensi Telah Dibuka')
          

          this.tanggal_buka=format(Date.now(), "yyyy-MM-dd")

          this.materi = ''
          // this.router.navigate(['/presensi-guru-privat'])


        }
      }
    )

  }
  async ngOnInit() {
    this.getGuru()
  }

}
