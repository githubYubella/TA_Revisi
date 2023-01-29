import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailKumpulanGuruPrivatComponent } from './detail-kumpulan-guru-privat.component';

describe('DetailKumpulanGuruPrivatComponent', () => {
  let component: DetailKumpulanGuruPrivatComponent;
  let fixture: ComponentFixture<DetailKumpulanGuruPrivatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailKumpulanGuruPrivatComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailKumpulanGuruPrivatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
