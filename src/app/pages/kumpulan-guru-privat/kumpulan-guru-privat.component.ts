import { Component, OnInit } from '@angular/core';
import { OrangTuaService } from 'src/app/services/orang-tua/orang-tua.service';

@Component({
  selector: 'app-kumpulan-guru-privat',
  templateUrl: './kumpulan-guru-privat.component.html',
  styleUrls: ['./kumpulan-guru-privat.component.scss'],
})
export class KumpulanGuruPrivatComponent implements OnInit {
  
  search_bidang=''
  kumpulan_guru_privat=[]
  jenjang_dipilih=''
  jenisKelamin_dipilih = ''

  constructor(
    private ot:OrangTuaService
  ) { }

  searchbar(ev: any){
    let search_value = ev.target.value
    this.search_bidang = search_value
    // console.log(this.search_bidang)
    this.listGuru()
    // this.listKursus()
  }

  searchbarComboboxPendidikan(ev: any){
    let search_value = ev.target.value
    this.jenjang_dipilih = ev.target.value
    console.log(this.jenjang_dipilih.toString())
    // this.listKursus()
    this.listGuru()

  }
  searchbarComboboxKelamin(ev: any){
    let search_value = ev.target.value
    this.jenisKelamin_dipilih = ev.target.value
    console.log(this.jenisKelamin_dipilih.toString())
    // this.listKursus()
    this.listGuru()

  }

  listGuru() {
    var kosong=""
    this.ot.listGuruPrivatService(this.search_bidang,this.jenjang_dipilih,this.jenisKelamin_dipilih).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.kumpulan_guru_privat = data['data']
        }else{
          kosong="tidak ada data"
          this.kumpulan_guru_privat = data['data']
          console.log('er '+data['result'])
        }
      }
    )

  }

  async ngOnInit() { 
    this.listGuru()
  }

}
