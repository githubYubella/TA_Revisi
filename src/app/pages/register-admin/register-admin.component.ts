import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.scss'],
})
export class RegisterAdminComponent implements OnInit {
email=''
password=''
nomor_rekening=''
bank=''
  constructor(private ad:AdminService,private router:Router) { }
  register_admin() {
    this.ad.registerService(this.email, this.password, this.nomor_rekening, this.bank).subscribe(
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
  ngOnInit() {}

}
