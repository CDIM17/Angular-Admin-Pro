import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable,interval, Subscription } from 'rxjs';
import { retry,take,map,filter } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit,OnDestroy {

  public intervalSubs!: Subscription;

  constructor() {

    /*this.retornaObservable().pipe(
      retry(2)
    ).subscribe(
      valor => console.log('Subs:',valor),
      (err) => console.warn('Error',err),
      () => console.info('Obs terminado')
    )*/

    this.intervalSubs = this.retornaIntervalo().subscribe(console.log)

   }

  ngOnInit(): void {
  }

  retornaIntervalo():Observable<number>
  {
    return interval(100).pipe(
      //take(10),
      map(valor => valor + 1),
      filter(valor => (valor % 2 == 0))
    );

  }

  retornaObservable():Observable<number>
  {
      let i = -1;
  
  
      const obs$ = new Observable<number>(observer => {
  
        const intervalo = setInterval( () => {
  
          i++;
          observer.next(i);
  
          if(i===4)
          {
            clearInterval(intervalo);
            observer.complete();
          }
  
          if(i === 2)
          {
            console.log('i = 2.. error');
            observer.error('i llego al valor de 2');
          }
  
        },1000 )
  
      });

      return obs$;

  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

}
