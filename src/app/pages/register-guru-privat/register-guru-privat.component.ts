import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { GuruPrivatService } from 'src/app/services/guru-privat/guru-privat.service';
import { TempatKursusService } from 'src/app/services/tempat-kursus/tempat-kursus.service';

@Component({
  selector: 'app-register-guru-privat',
  templateUrl: './register-guru-privat.component.html',
  styleUrls: ['./register-guru-privat.component.scss'],
})
export class RegisterGuruPrivatComponent implements OnInit {
  email = ''
  password = ''
  nama = ''
  jenisKelamin_dipilih = ''
  telepon = ''
  jenjang_dipilih = ''
  tempat_pendidikan = ''
  tgl_lahir = ''
  input_x = ''
  input_y = ''
  gambar = ''
  alamat = ''
  kecamatan = ''
  kelurahan = ''
  image: any
  berkas: any
  pengalaman = ''

  keahlian_list = []
  keahlian_dipilih: string[] = []

  constructor(private tk: TempatKursusService, private router: Router, private gp: GuruPrivatService) { }

  async setTanggalLahir(event) {
    this.tgl_lahir = format(new Date(event.target.value), "yyyy-MM-dd")
    console.log('tgl_mulai' + this.tgl_lahir)
  }
  checked
  category() {

    this.tk.listKeahlianService().subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.keahlian_list = data['data']
          this.checked = false

        }

      }
    )
  }

  onFileSelectedGambar(event) {
    // console.log(event)
    this.image = event.target.files[0]
    // this.berkas = event.target.files[1]

    // this.conString=this.selected.readAsText(this.selected,'s')
    console.log(this.image)
    // console.log(this.berkas)

  }

  checkBoxterpilih: string[]
  register_guru_privat() {
    const uploadData = new FormData();
    this.checkBoxterpilih = this.keahlian_dipilih.filter((item) => item)
    console.log(this.checkBoxterpilih)

    uploadData.append('email', this.email);
    uploadData.append('password', this.password);
    uploadData.append('jenis_kelamin', this.jenisKelamin_dipilih);
    // uploadData.append('berkas_cv',this.berkas.files, this.berkas.name);

    uploadData.append('tempat_jenjang_terakhir', this.tempat_pendidikan);
    uploadData.append('jenjang_terakhir', this.jenjang_dipilih.toString());
    uploadData.append('telepon', this.telepon);
    uploadData.append('lat', this.input_x.toString());
    uploadData.append('long', this.input_y.toString());
    uploadData.append('nama', this.nama);
    uploadData.append('image', this.image, this.image.name);
    uploadData.append('tgl_lahir', this.tgl_lahir);
    uploadData.append('pengalaman', this.pengalaman);


    uploadData.append('alamat', this.alamat);

    uploadData.append('kecamatan', this.kecamatan.toString());
    uploadData.append('kelurahan', this.kelurahan.toString());

    this.checkBoxterpilih.forEach((item,i) => {
      console.log('string for' + item)

      //   uploadData.append('idkeahlian',i);
      uploadData.append("idkeahlian["+ i+"]",item.toString());
      // console.log('string'+this.checkBoxterpilih.toString())
    })

    this.gp.registergpService(uploadData).subscribe((resp) => {
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

  async ngOnInit() {
    this.category()
  }

}
