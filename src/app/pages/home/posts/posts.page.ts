import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsLisModel } from '@app/models/postList.model';
import { PostsService } from '@app/services/posts/posts.service';
import { UsersService } from '@app/services/users/users.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsService } from '@app/services/utils/utils.service';
import { FormControl } from '@angular/forms';
import { UsersLisModel } from '@app/models/users.model';
import { map, startWith } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss']
})
export class PostsPage implements OnInit, OnDestroy {
  myControl = new FormControl();
  public noData = false;

  options: User[] = [{id: 0 , name: 'All'}, {id: 9999, name: 'Show no data'}];

  filteredOptions: Observable<User[]>;

  private allPostsSubscription: Subscription = null;
  private allUsersSubscription: Subscription = null;
  
  public posts;
  public allPosts: PostsLisModel[] = [];
  public users = this.utilsService.allUsers;

  constructor(
    private postServices: PostsService,
    private router: Router,
    private utilsService: UtilsService,
    private usersService: UsersService
  ) { }

  ngOnDestroy() {
    if (this.allPostsSubscription !== null) {
      this.allPostsSubscription.unsubscribe();
    }

    if (this.allUsersSubscription !== null) {
      this.allUsersSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.getAllPosts();
    this.getAllUsers();
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();
    // return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private getAllPosts() {
    this.allPostsSubscription = this.postServices.getAllPosts().subscribe((response: Array<PostsLisModel>) => {
      this.posts = new PostsLisModel( response );
      this.allPosts = this.posts.getAllPosts();
    });
  }

  public detail(id: number) {
    this.router.navigate([`/home/post-detail/${id}`]);
  }

  private getAllUsers() {
    this.allUsersSubscription = this.usersService.getAllUsers().subscribe((response: UsersLisModel) => {
      const allUsers = new UsersLisModel( response ); 

      allUsers.getAllUsers().forEach(element => {
        this.options.push({
          id: element.id,
          name: element.name
        });  
      });

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.name)),
        map(name => (name ? this._filter(name) : this.options.slice())),
      );
    });
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  filterByUser(user: User) { // NO VEO NECESARIO LLAMAR AL SERVICIO DE https://jsonplaceholder.typicode.com/users/1/posts
    if ( user.id > 0 ) {
      this.allPosts = this.posts.getPostsByUser( user.id );
    } else {
      this.allPosts = this.posts.getAllPosts();
    }

    if ( this.allPosts.length > 0) {
      this.noData = false;
    } else {
      this.noData = true;
    }
    
}

}
