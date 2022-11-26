import { Component, OnInit } from '@angular/core';
import { TempatKursusService } from '../../services/tempat-kursus/tempat-kursus.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login-tempat-kursus',
  templateUrl: './login-tempat-kursus.component.html',
  styleUrls: ['./login-tempat-kursus.component.scss'],
})
export class LoginTempatKursusComponent {

  login_password: string = ""
  login_email: string = ""
  email: string = ""
  password: string = ""
  nama: string = ""
  role:string=''
  nana = "yuy"

  // async login() {
  //   this.tk.loginService(this.login_email, this.login_password).subscribe(
  //     (data) => {
  //       if (data['result'] == 'success') {

  //         this.email = this.login_email;
  //         this.storage.set('email_save', this.email);
  //         alert("Login Success");
  //         this.router.navigate(['/home-tempat-kursus']);
  //         this.login_password = '';
  //         this.login_email = '';


  //       }
  //     }
  //   )
  // }

 
  periksaRole() {
    this.us.cekRoleService(this.email).subscribe(
      (data) => {
        // this.role='guru_privat';
        this.role = data;
        this.storage.set('role_save', this.role);
        // this.storage.set('role_save', 'role');


        console.log("role:" + this.role)
      }
    )
  }


  constructor( public us: UserService,public tk: TempatKursusService, private storage: Storage, private router: Router) { }

  async ngOnInit() {
    // await this.storage.create();
    // this.email = await this.storage.get('email_save');
    // this.role= await this.storage.get('role_save');

    console.log("simpan: " + this.email);
  }

}
