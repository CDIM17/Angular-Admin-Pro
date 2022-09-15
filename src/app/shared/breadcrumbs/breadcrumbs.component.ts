import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter,map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit,OnDestroy {

  public titulo!:string;
  public tituloSubs$!: Subscription;

  constructor(private router:Router) { 

    this.tituloSubs$ = this.getDataRutas();
   
  }

  ngOnInit(): void {
  }

  getDataRutas()
  {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event:any) => (event.snapshot.firstChild === null)),
      map( (data:any) => data.snapshot.data)

    ).subscribe(({titulo}) => {
      this.titulo = titulo;
      document.title = `AdminPro - ${titulo}`;
    })

  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

}
