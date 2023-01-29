import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KumpulanGuruPrivatComponent } from './kumpulan-guru-privat.component';

describe('KumpulanGuruPrivatComponent', () => {
  let component: KumpulanGuruPrivatComponent;
  let fixture: ComponentFixture<KumpulanGuruPrivatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KumpulanGuruPrivatComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KumpulanGuruPrivatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
