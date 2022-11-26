import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GuruPrivatService } from 'src/app/services/guru-privat/guru-privat.service';

@Component({
  selector: 'app-lamar-lowongan',
  templateUrl: './lamar-lowongan.component.html',
  styleUrls: ['./lamar-lowongan.component.scss'],
})
export class LamarLowonganComponent implements OnInit {
 file:any
 tanggal_daftar:any
 note:string=''
 email=''
 idguru:number
  constructor(public at: ActivatedRoute,private gp:GuruPrivatService,
    private authService: AuthService,private router:Router) {
      this.email = authService.email

     }

getGuru() {
    this.gp.profilService(this.email).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.idguru = data['data'][0].idguru_privat
          // console.log("syal: "+data['data'][0].idguru_privat)
        }
      }
    )
  }

  kirimLamaran() {
    
    // if(this.file == null ){
    //   alert('upload berkas')
    // }
    var idLowongan: number = this.at.snapshot.params['id']
    this.tanggal_daftar=format( Date.now(), "yyyy-MM-dd")

    const uploadData = new FormData();
    uploadData.append('idlowongan', idLowongan.toString());
    uploadData.append('idguru', this.idguru.toString());
    uploadData.append('file', this.file, this.file.name);
    uploadData.append('tgl_daftar', this.tanggal_daftar);
    uploadData.append('note', this.note);

    this.gp.kirimLamaranService(uploadData).subscribe((resp) => {
      const parse = JSON.parse(JSON.stringify(resp))
      console.log(resp);
      if (parse['result'] == 'success') {
        alert("Register Success")
        this.router.navigate(['/'])


      }
      else {
        alert("Register Error : " + resp['message'])
      }
    })
  }

  onFileSelected(event) {
    this.file = event.target.files[0]
    console.log(this.file)
    
  }

  async ngOnInit() {
    this.getGuru()
    console.log('tgl'+this.idguru)
  }

}
