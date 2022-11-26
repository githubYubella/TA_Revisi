import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { GuruPrivatService } from 'src/app/services/guru-privat/guru-privat.service';

@Component({
  selector: 'app-edit-absen-guru',
  templateUrl: './edit-absen-guru.component.html',
  styleUrls: ['./edit-absen-guru.component.scss'],
})
export class EditAbsenGuruComponent implements OnInit {
  tanggal_buka = ''
  materi = ''

  constructor(private gp: GuruPrivatService, private at: ActivatedRoute,
    private router:Router) { }
hapusAbsen(){
  var id: number = this.at.snapshot.params['id']
  this.gp.hapusAbsenService(id).subscribe(
    (data)=>{
      if (data['result'] == 'success') {
        alert("Data Absen Berhasil di Hapus")

        // this.router.navigate(['/'])
        window.location.href='/presensi-guru-privat';
        // this.router.navigate(['/presensi-guru-privat'])
        this.gp.listRiwayatAbsenService().subscribe(

        )
  
      }
      else {
        alert("Data Lowongan Gagal di Edit");
        // this.router.navigate(['/'])
  
      }
    }
  )

}

editAbsen(){
  var id: number = this.at.snapshot.params['id']
this.gp.editAbsenService(this.tanggal_buka,this.materi,id).subscribe(
  (data)=>{
    if (data['result'] == 'success') {
      alert("Data Absen Berhasil di Edit")
      this.materi=''
      this.tanggal_buka=format(Date.now(), "yyyy-MM-dd")
      // window.location.reload()

      // this.router.navigate(['/postingan-lowongan'])

    }
    else {
      alert("Data Lowongan Gagal di Edit");
      // this.router.navigate(['/'])

    }
  }
)

}
  async setTanggalBukaAbsen(event) {
  this.tanggal_buka = format(new Date(event.target.value), "yyyy-MM-dd")
}
getDetailAbsen() {
  var id: number = this.at.snapshot.params['id']

  this.gp.detailAbsenService(id).subscribe(
    (data) => {
      if (data['result'] == 'success') {
        this.tanggal_buka = data['data'][0].tanggal_buka

        this.materi = data['data'][0].materi


      }
    }
  )
}

  async ngOnInit() {


  this.getDetailAbsen()
}

}
