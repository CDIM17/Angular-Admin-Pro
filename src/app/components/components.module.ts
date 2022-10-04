import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule} from '@angular/forms';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';

import { NgChartsModule } from 'ng2-charts';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';


@NgModule({
  declarations: [
    IncrementadorComponent,
    DoughnutChartComponent,
    ModalImagenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports:[
    IncrementadorComponent,
    DoughnutChartComponent,
    ModalImagenComponent
  ]
})
export class ComponentsModule { }
