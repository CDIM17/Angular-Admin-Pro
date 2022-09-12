import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule} from '@angular/forms';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';

import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    IncrementadorComponent,
    DoughnutChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports:[
    IncrementadorComponent,
    DoughnutChartComponent
  ]
})
export class ComponentsModule { }
