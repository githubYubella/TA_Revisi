import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailPesanOrtuComponent } from './detail-pesan-ortu.component';

describe('DetailPesanOrtuComponent', () => {
  let component: DetailPesanOrtuComponent;
  let fixture: ComponentFixture<DetailPesanOrtuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPesanOrtuComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPesanOrtuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
