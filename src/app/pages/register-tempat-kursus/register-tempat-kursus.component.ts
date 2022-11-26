import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { CapacitorGoogleMaps } from '@capacitor/google-maps/dist/typings/implementation';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { environment } from 'src/environments/environment';
import { TempatKursusService } from '../../services/tempat-kursus/tempat-kursus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-tempat-kursus',
  templateUrl: './register-tempat-kursus.component.html',
  styleUrls: ['./register-tempat-kursus.component.scss'],
})
export class RegisterTempatKursusComponent {
  // @ViewChild('map') map: ElementRef<HTMLElement>;
  // newMapw: GoogleMap;
  // loc_x: number
  // loc_y: number
  email_regis: string = ""
  pass_regis: string = ""
  nama_regis: string = ""
  informasi_regis: string = ""
  alamat_regis: string = ""
  gambar_regis: string = ""
  image: any

  keahlian_list = []
  dipilih: number

  input_x:number
  input_y:number
  kecamatan:string
  kelurahan:string
  provinsi_list:[]
  


  onFileSelected(event) {
    // console.log(event)
    this.image = event.target.files[0]
    // this.conString=this.selected.readAsText(this.selected,'s')
    console.log(this.image)
  }



  // async now() {
  //   this.geo.getCurrentPosition().then(async (resp) => {
  //     console.log(resp.coords.latitude, ',', resp.coords.longitude)
  //     this.loc_x = resp.coords.latitude
  //     this.loc_y = resp.coords.longitude

  //     this.newMapw = await GoogleMap.create({
  //       id: 'capacitor-google-maps',
  //       element: this.map.nativeElement,
  //       apiKey: environment.key,
  //       config: {
  //         center: {
  //           lat: resp.coords.latitude,
  //           lng: resp.coords.longitude,
  //         },

  //         zoom: 17,
  //       },

  //     });

  //     // this.addMarker(resp.coords.latitude,resp.coords.longitude)
  //     const marker = this.newMapw.addMarker({
  //       coordinate: {
  //         lat: resp.coords.latitude,
  //         lng: resp.coords.longitude
  //       },
  //       draggable: true


  //     })
  //     // !JIKA ZOOM DI SET CAMARA ADA VALUENYA, MAKA FOKUS ZOOM HANYA DISINI!
  //     await this.newMapw.setCamera({
  //       coordinate: {
  //         lat: resp.coords.latitude,
  //         lng: resp.coords.longitude

  //       },
  //       zoom: 14,
  //     })
  //   })

  // }


  ngAfterViewInit() {
    // this.createMap()
    // console.log("tes "+this.map)
    // "tes " + this.now()
    this.category()
    // this.tujuan()
        fetch('http://dev.farizdotid.com/api/daerahindonesia/provinsi').then(res => res.json())
    .then(json => {
      this.provinsi_list=json['provinsi']
       console.log(json['provinsi'])  
 
 });
  }


  category() {
    this.tk.listKeahlianService().subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.keahlian_list = data['data']


        }

      }
    )
    

    // this.tk.listProvinsi().subscribe(
    //   (data)=>{
    //     this.provinsi_list=data
    //   }
    // )
  }



  register() {

    const uploadData = new FormData();
    uploadData.append('email', this.email_regis);
    uploadData.append('password', this.pass_regis);
    uploadData.append('nama', this.nama_regis);
    uploadData.append('informasi', this.informasi_regis);
    uploadData.append('alamat', this.alamat_regis);
    uploadData.append('lat', this.input_x.toString());
    uploadData.append('long', this.input_y.toString());
    uploadData.append('kecamatan', this.kecamatan.toString());
    uploadData.append('kelurahan', this.kelurahan.toString());


    uploadData.append('image', this.image, this.image.name);
    uploadData.append('idkeahlian', this.dipilih.toString());

    this.tk.registerService(uploadData).subscribe((resp) => {
      console.log(resp);
      if (resp['result'] == 'success') {
        alert("Register Success")
        this.router.navigate(['/'])


      }
      else {
        alert("Register Error : " + resp['message'])
      }
    })


    // this.http.post('https://list-coba.000webhostapp.com/upload2.php', uploadData).subscribe(res => {
    //   console.log(res);
    //   if (res['result'] == 'sukses') {
    //     alert('Sukses')
    //   } else {
    //     alert('gagal')
    //   }
    // });
  }

  constructor(private router: Router, public geo: Geolocation, public tk: TempatKursusService) { }

  // ngOnInit() {


  // }








}
