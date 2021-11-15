
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { environment } from '@env/environment.prod';

@Injectable({
	providedIn: 'root'
})

export class UsersService {

  private urlAllUsers = `${environment.hostServerUrl}/users`;

    constructor(
        private httpClient: HttpClient
         ) { }

         public getAllUsers(): Observable<Object> {
          return Observable.create((observer: Subscriber<any>) => {
            const subs = this.httpClient.get(`${this.urlAllUsers}`)
              .subscribe((data: any) => {
                observer.next(data);
              }, error => {
                observer.error(error);
              }, () => {
                observer.complete();
              });

            return () => {
              subs.unsubscribe();
            };
          });
        }
}
