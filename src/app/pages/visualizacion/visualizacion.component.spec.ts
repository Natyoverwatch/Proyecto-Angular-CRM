import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacionComponent } from './visualizacion.component';

describe('VisualizacionComponent', () => {
  let component: VisualizacionComponent;
  let fixture: ComponentFixture<VisualizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
