import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListPesanTempatKursusComponent } from './list-pesan-tempat-kursus.component';

describe('ListPesanTempatKursusComponent', () => {
  let component: ListPesanTempatKursusComponent;
  let fixture: ComponentFixture<ListPesanTempatKursusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPesanTempatKursusComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListPesanTempatKursusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
