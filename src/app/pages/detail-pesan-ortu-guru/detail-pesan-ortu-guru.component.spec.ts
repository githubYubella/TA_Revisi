import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailPesanOrtuGuruComponent } from './detail-pesan-ortu-guru.component';

describe('DetailPesanOrtuGuruComponent', () => {
  let component: DetailPesanOrtuGuruComponent;
  let fixture: ComponentFixture<DetailPesanOrtuGuruComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPesanOrtuGuruComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPesanOrtuGuruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
