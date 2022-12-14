import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './services/auth/auth.service';
import { OrangTuaService } from './services/orang-tua/orang-tua.service';
import { TempatKursusService } from './services/tempat-kursus/tempat-kursus.service';
import { UserService } from './services/user/user.service';

import { BukaLowonganComponent } from './pages/buka-lowongan/buka-lowongan.component';
import { BukaLowongan2Component } from './pages/buka-lowongan2/buka-lowongan2.component';
import { DetailKursusComponent } from './pages/detail-kursus/detail-kursus.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginTempatKursusComponent } from './pages/login-tempat-kursus/login-tempat-kursus.component';
import { RegisterTempatKursusComponent } from './pages/register-tempat-kursus/register-tempat-kursus.component';
import { HomeTempatKursusComponent } from './pages/home-tempat-kursus/home-tempat-kursus.component';
import { PengaturanTempatKursusComponent } from './pages/pengaturan-tempat-kursus/pengaturan-tempat-kursus.component';
import { HomeOrangTuaComponent } from './pages/home-orang-tua/home-orang-tua.component';
import { PostinganLowonganComponent } from './pages/postingan-lowongan/postingan-lowongan.component';
import { PendaftarLowonganComponent } from './pages/pendaftar-lowongan/pendaftar-lowongan.component';
import { EditLowonganComponent } from './pages/edit-lowongan/edit-lowongan.component';
import { RegisterOrangTuaComponent } from './pages/register-orang-tua/register-orang-tua.component';
import { RegisterGuruPrivatComponent } from './pages/register-guru-privat/register-guru-privat.component';
import { GuruPrivatService } from './services/guru-privat/guru-privat.service';
import { HomeGuruPrivatComponent } from './pages/home-guru-privat/home-guru-privat.component';
import { DetailLowonganComponent } from './pages/detail-lowongan/detail-lowongan.component';
import { LamarLowonganComponent } from './pages/lamar-lowongan/lamar-lowongan.component';
import { DetailPendaftarComponent } from './pages/detail-pendaftar/detail-pendaftar.component';
import { KontrakComponent } from './pages/kontrak/kontrak.component';
import { DaftarLamaranGuruPrivatComponent } from './pages/daftar-lamaran-guru-privat/daftar-lamaran-guru-privat.component';
import { DetailLowonganDiterimaComponent } from './pages/detail-lowongan-diterima/detail-lowongan-diterima.component';
import { PresensiKursusPrivatComponent } from './pages/presensi-kursus-privat/presensi-kursus-privat.component';
import { BukaAbsenGuruComponent } from './pages/buka-absen-guru/buka-absen-guru.component';
import { EditAbsenGuruComponent } from './pages/edit-absen-guru/edit-absen-guru.component';
import { KursusOrangTuaComponent } from './pages/kursus-orang-tua/kursus-orang-tua.component';
import { AbsenOrangTuaComponent } from './pages/absen-orang-tua/absen-orang-tua.component';
import { DetailKontrakOrangTuaComponent } from './pages/detail-kontrak-orang-tua/detail-kontrak-orang-tua.component';
import { RegisterAdminComponent } from './pages/register-admin/register-admin.component';
import { AdminService } from './services/admin/admin.service';
import { BayarOrangTuaComponent } from './pages/bayar-orang-tua/bayar-orang-tua.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { ProfilGuruPrivatComponent } from './pages/profil-guru-privat/profil-guru-privat.component';
import { SaldoGuruPrivatComponent } from './pages/saldo-guru-privat/saldo-guru-privat.component';
import { RiwayatTransaksiGuruPrivatComponent } from './pages/riwayat-transaksi-guru-privat/riwayat-transaksi-guru-privat.component';
import { PenarikanDanaGuruComponent } from './pages/penarikan-dana-guru/penarikan-dana-guru.component';
import { PengaturanOrangTuaComponent } from './pages/pengaturan-orang-tua/pengaturan-orang-tua.component';
import { PengaturanGuruPrivatComponent } from './pages/pengaturan-guru-privat/pengaturan-guru-privat.component';
import { PesanOrtuComponent } from './pages/pesan-ortu/pesan-ortu.component';
import { ListPesanOrtuComponent } from './pages/list-pesan-ortu/list-pesan-ortu.component';
import { IonicRatingComponentModule } from 'ionic-rating-component'; 
import { DetailPesanOrtuComponent } from './pages/detail-pesan-ortu/detail-pesan-ortu.component'; 
import { ListPesanTempatKursusComponent } from './pages/list-pesan-tempat-kursus/list-pesan-tempat-kursus.component';
import { DetailPesanTempatKursusComponent } from './pages/detail-pesan-tempat-kursus/detail-pesan-tempat-kursus.component';
import { DetailPesanOrtuGuruComponent } from './pages/detail-pesan-ortu-guru/detail-pesan-ortu-guru.component';
import { ListPesanGuruPrivatComponent } from './pages/list-pesan-guru-privat/list-pesan-guru-privat.component';
import { DetailPesanGuruPrivatComponent } from './pages/detail-pesan-guru-privat/detail-pesan-guru-privat.component';



import { AuthGuard } from './guards/auth/auth.guard';
import { GuestGuard } from './guards/guest/guest.guard';


const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login-tempat-kursus',
    component: LoginTempatKursusComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register-tempat-kursus',
    component: RegisterTempatKursusComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'home-tempat-kursus',
    component: HomeTempatKursusComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home-orang-tua',
    component: HomeOrangTuaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pengaturan-tempat-kursus',
    component: PengaturanTempatKursusComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail-kursus/:idkursus',
    component: DetailKursusComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'buka-lowongan',
    component: BukaLowonganComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'buka-lowongan2',
    component: BukaLowongan2Component,
    canActivate: [AuthGuard]
  },
  {
    path: 'postingan-lowongan',
    component: PostinganLowonganComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pendaftar-lowongan/:id',
    component: PendaftarLowonganComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-lowongan/:id',
    component: EditLowonganComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register-orang-tua',
    component: RegisterOrangTuaComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'register-guru-privat',
    component: RegisterGuruPrivatComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'home-guru-privat',
    component: HomeGuruPrivatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail-lowongan/:id',
    component: DetailLowonganComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lamar-lowongan/:id',
    component: LamarLowonganComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail-pendaftar/:idPendaftar/:idLowongan',
    component: DetailPendaftarComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'kontrak/:idPendaftar/:idLowongan',
    component: KontrakComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'daftar-lamaran-guru-privat',
    component: DaftarLamaranGuruPrivatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail-lowongan-diterima/:id',
    component: DetailLowonganDiterimaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'presensi-guru-privat',
    component: PresensiKursusPrivatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'buka-absen-guru/:id',
    component: BukaAbsenGuruComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-absen-guru/:id',
    component: EditAbsenGuruComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'kursus-orang-tua',
    component: KursusOrangTuaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'absen-orang-tua/:id',
    component: AbsenOrangTuaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail-kontrak-orang-tua/:id',
    component: DetailKontrakOrangTuaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register-admin',
    component: RegisterAdminComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'bayar-orang-tua/:idLowongan/:idGuru/:idOrtu',
    component: BayarOrangTuaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home-admin',
    component: HomeAdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profil-guru-privat',
    component: ProfilGuruPrivatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'saldo-guru-privat',
    component: SaldoGuruPrivatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'riwayat-transaksi-guru-privat',
    component: RiwayatTransaksiGuruPrivatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'penarikan-dana-guru/:id',
    component: PenarikanDanaGuruComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pengaturan-orang-tua',
    component: PengaturanOrangTuaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pengaturan-guru-privat',
    component: PengaturanGuruPrivatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail-kursus/:idkursus/pesan-ortu/:idortu',
    component: PesanOrtuComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-pesan-ortu/:idortu',
    component: ListPesanOrtuComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail-pesan-ortu/:idkepada',
    component: DetailPesanOrtuComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-pesan-tempat-kursus/:idkursus',
    component: ListPesanTempatKursusComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail-pesan-tempat-kursus/:idkepada',
    component: DetailPesanTempatKursusComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail-pesan-ortu-guru/:idkepada',
    component: DetailPesanOrtuGuruComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-pesan-guru-privat/:idguru',
    component: ListPesanGuruPrivatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail-pesan-guru-privat/:idkepada',
    component: DetailPesanGuruPrivatComponent,
    canActivate: [AuthGuard]
  },
 
  
  // {path: 'detail/:id', component:ProductdetailComponent},
  // {path : 'cegahcovid', component: CegahcovidComponent},
  // {path: 'detail/:id', component: ProductdetailComponent},
  // {path: 'movies',component:MovielistComponent},
  // {path: 'moviesdetail/:id',component:MoviedetailComponent},
  // {path: 'productform', component: ProductformComponent},
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  declarations: [
    AppComponent, LoginTempatKursusComponent, RegisterTempatKursusComponent, HomeTempatKursusComponent,
    PengaturanTempatKursusComponent, DetailKursusComponent, BukaLowonganComponent, BukaLowongan2Component, LoginComponent,
    HomeOrangTuaComponent, PostinganLowonganComponent, PendaftarLowonganComponent,
    EditLowonganComponent,RegisterOrangTuaComponent,RegisterGuruPrivatComponent,HomeGuruPrivatComponent,
    DetailLowonganComponent,LamarLowonganComponent,DetailPendaftarComponent,KontrakComponent,
    DaftarLamaranGuruPrivatComponent,DetailLowonganDiterimaComponent,PresensiKursusPrivatComponent,
    BukaAbsenGuruComponent,EditAbsenGuruComponent,KursusOrangTuaComponent,AbsenOrangTuaComponent,
    DetailKontrakOrangTuaComponent,RegisterAdminComponent,BayarOrangTuaComponent,
    HomeAdminComponent,ProfilGuruPrivatComponent,SaldoGuruPrivatComponent,RiwayatTransaksiGuruPrivatComponent,
    PenarikanDanaGuruComponent,PengaturanOrangTuaComponent,PengaturanGuruPrivatComponent,
    PesanOrtuComponent,ListPesanOrtuComponent,DetailPesanOrtuComponent,
    ListPesanTempatKursusComponent,DetailPesanTempatKursusComponent,
    DetailPesanOrtuGuruComponent,ListPesanGuruPrivatComponent,DetailPesanGuruPrivatComponent,
    

    
  ],
  imports: [IonicRatingComponentModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    OrangTuaService,
    Geolocation,
    TempatKursusService,
    UserService,
    AuthService,GuruPrivatService,AdminService,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
