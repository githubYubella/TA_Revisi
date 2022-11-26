import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PenarikanDanaGuruComponent } from './penarikan-dana-guru.component';

describe('PenarikanDanaGuruComponent', () => {
  let component: PenarikanDanaGuruComponent;
  let fixture: ComponentFixture<PenarikanDanaGuruComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PenarikanDanaGuruComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PenarikanDanaGuruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
