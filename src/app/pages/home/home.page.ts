import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '@app/services/users/users.service';
import { PostsService } from '@app/services/posts/posts.service';
import { UtilsService } from '@app/services/utils/utils.service';
import { UsersLisModel } from '@app/models/users.model';
import { CommentsLisModel } from '@app/models/comments.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {
  private allUsersSubscription: Subscription = null;
  private allCommentsSubscription: Subscription = null;

  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
    private utilsService: UtilsService,
    private router: Router
  ) { }

  ngOnDestroy() {
    if (this.allUsersSubscription !== null) {
      this.allUsersSubscription.unsubscribe();
    }

    if (this.allCommentsSubscription !== null) {
      this.allCommentsSubscription.unsubscribe();
    }
    
  }

  ngAfterViewInit() {}

  ngOnInit() {
    // Al ser datos generales los genero en la carga inicial de la home.
    this.getAllUsers();
    this.getAllComents();
  }

  private getAllUsers() {
    this.allUsersSubscription = this.usersService.getAllUsers().subscribe((response: UsersLisModel) => {
      const allUsers = new UsersLisModel( response ); 
      this.utilsService.allUsers = allUsers; // Para esto se podría realizar un service de cacheo pero para usarlo en esta prueba no voy a complicarlo...
    });
  }

  private getAllComents() {
    this.allCommentsSubscription = this.postsService.getAllComments().subscribe((response: CommentsLisModel) => {
      const allComments = new CommentsLisModel( response );
    });
  }

  public nav(url: string) {
    this.router.navigate([url]);
}
}
