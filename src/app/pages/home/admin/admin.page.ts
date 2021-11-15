import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostsLisModel } from '@app/models/postList.model';
import { PostsService } from '@app/services/posts/posts.service';
import { Subscription } from 'rxjs';
import { EditDialogComponent } from '@app/components/modals/edit/edit.component';
import { PostInterface } from '@app/interfaces/post.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewDialogComponent } from '@app/components/modals/new/new.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss']
})
export class AdminPage implements OnInit, OnDestroy {

  private allPostsSubscription: Subscription = null;
  public posts;
  public allPosts: PostsLisModel[] = [];

  constructor(
    private postServices: PostsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnDestroy() {
    if (this.allPostsSubscription !== null) {
      this.allPostsSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.getAllPosts();
  }

  private getAllPosts() {
    this.allPostsSubscription = this.postServices.getAllPosts().subscribe((response: Array<PostsLisModel>) => {
      this.posts = new PostsLisModel( response );
      this.allPosts = this.posts.getAllPosts();
    });
  }

  public deletePost(item: PostInterface) {

    this.postServices.deletePost(item.id).subscribe((response: any) => {
      if ( response ) {
        this.snackBar.open(`Item ${item.id} deleted!! `,'', { duration: 2000 });
      }
    }).unsubscribe;
    
  }

  public editPost (item: PostInterface ) {
    const dialogConfig = {
      data: { item }
    };
    const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.snackBar.open(`Item ${result.id} updated!! `,'', { duration: 2000 });
        this.getAllPosts();
      }
    });
  }

  public newPost() {
    const dialogConfig = {};
    const dialogRef = this.dialog.open(NewDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.snackBar.open(`Item ${result.id} created!! `,'', { duration: 2000 });
        this.getAllPosts();
      }
    });
  }

}
