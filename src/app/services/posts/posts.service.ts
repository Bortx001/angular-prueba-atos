
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { environment } from '@env/environment.prod';
import { PostInterface } from '@app/interfaces/post.interface';
import { NewPostInterface } from '@app/interfaces/newPost.interface';


@Injectable({
	providedIn: 'root'
})

export class PostsService {
  /* AQUI SE USA EL MISMO ENDPOINT TODO EL RATO, PERO LOS HE DIFERENCIADO POR MANTENER LA COHERENCIA */
  private urlAllPosts = `${environment.hostServerUrl}/posts`;
  private urlDeletePosts = `${environment.hostServerUrl}/posts/`;
  private urlEditPost = `${environment.hostServerUrl}/posts/`;
  private urlCreatePost = `${environment.hostServerUrl}/posts/`;

  private urlPostDetail = `${environment.hostServerUrl}/posts/`;

  private urlAllComments = `${environment.hostServerUrl}/comments/`; 
  private urlCommentsByUser = `${environment.hostServerUrl}/posts/`; 



    constructor(
        private httpClient: HttpClient
         ) { }

         public getAllPosts(): Observable<Object> {
          return Observable.create((observer: Subscriber<any>) => {
            const subs = this.httpClient.get(`${this.urlAllPosts}`)
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

        public deletePost(id: number): Observable<Object> {
          return Observable.create((observer: Subscriber<any>) => {
            const subs = this.httpClient.delete(`${this.urlDeletePosts}${id}`)
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

        public editPost(post: PostInterface): Observable<Object> {
          return Observable.create((observer: Subscriber<any>) => {
            const subs = this.httpClient.put(`${this.urlEditPost}${post.id}`, post)
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

        public createPost(post: NewPostInterface): Observable<Object> {
          return Observable.create((observer: Subscriber<any>) => {
            const subs = this.httpClient.post(`${this.urlCreatePost}`, post)
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

        public getPostDetail(id: number): Observable<Object> {
          return Observable.create((observer: Subscriber<any>) => {
            const subs = this.httpClient.get(`${this.urlPostDetail}${id}`)
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
        

        public getAllComments(): Observable<Object> {
          return Observable.create((observer: Subscriber<any>) => {
            const subs = this.httpClient.get(`${this.urlAllComments}`)
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

        public getCommentsByUser(id: number): Observable<Object> {
          return Observable.create((observer: Subscriber<any>) => {
            const subs = this.httpClient.get(`${this.urlCommentsByUser}${id}/comments`)
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
