import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';

@Component({
  selector: 'app-register-orang-tua',
  templateUrl: './register-orang-tua.component.html',
  styleUrls: ['./register-orang-tua.component.scss'],
})
export class RegisterOrangTuaComponent implements OnInit {
  email = ''
  password = ''
  nama = ''
  jenisKelamin_dipilih = ''
  telepon = ''
  nama_siswa = ''
  alamat = ''
  kecamatan = ''
  kelurahan = ''
  input_x: number
  input_y: number
  constructor(private ot: OrangTuaService, private router: Router) { }

  register_orang_tua() {
    this.ot.registerService(this.email, this.password, this.nama, this.jenisKelamin_dipilih,
      this.telepon, this.nama_siswa, this.alamat, this.kecamatan, this.kelurahan, this.input_x, this.input_y).subscribe(
        (data) => {
          if (data['result'] == 'success') {
            alert("Register Success")
            this.router.navigate(['/'])

          } else {
            alert("Register Error : " + "Email atau Password tidak boleh kosong.")
          }
        }
      )
  }
  ngOnInit() { }

}
