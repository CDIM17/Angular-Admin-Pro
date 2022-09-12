import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType,Color } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

 @Input() title:string = 'Sin Titulo'; 
 @Input() dataChart:number[] = [ 350, 450, 100 ];

 // Doughnut
 @Input('labels') doughnutChartLabels: any[] = ['A','B','C'];

 public doughnutChartData!: ChartData<'doughnut'> 

@Input('type') public doughnutChartType: ChartType = 'doughnut';


  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
   console.log(event, active);
 }

 public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
   console.log(event, active);
 }

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges()
  {
    this.doughnutChartData = {

      labels: this.doughnutChartLabels,
   
      datasets: [
        { 
          data: this.dataChart,
          backgroundColor: ['#6857E6','#009FEE','#F02059'] 
        }
      ]
    };
  }

}
