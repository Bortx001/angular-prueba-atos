import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '@app/services/posts/posts.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PostDetailModel } from '@app/models/postDetail.model';
import { CommentsLisModel } from '@app/models/comments.model';
import { UtilsService } from '@app/services/utils/utils.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './postDetail.page.html',
  styleUrls: ['./postDetail.page.scss']
})
export class PostDetailPage implements OnInit, OnDestroy {

  private allPostsSubscription: Subscription = null;
  public post: PostDetailModel;
  public comments: CommentsLisModel;
  public panelOpenState = false;
  public postCreator: string;
  public users = this.utilsService.allUsers;

  constructor(
    private postServices: PostsService,
    private activatedRoute: ActivatedRoute,
    private utilsService: UtilsService
  ) { }

  ngOnDestroy() {
    if (this.allPostsSubscription !== null) {
      this.allPostsSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if ( params['id'] ) {
        this.getPostDetail( params['id'] );
      }
    }).unsubscribe();
    
  }

  private getPostDetail( id: number ) {
    this.allPostsSubscription = this.postServices.getPostDetail(id).subscribe((response: PostDetailModel) => {
      this.post = new PostDetailModel( response );
      this.getComments( id );

      if ( this.users ) { // No es la manera más optima pero lo he incluido por el use entre objetos en cache y/o services
        this.postCreator = this.users.getUserDetail( this.post.userId );
      }
      
    });
  }

  private getComments( id: number ) {
    this.allPostsSubscription = this.postServices.getCommentsByUser(id).subscribe((response: CommentsLisModel) => {
      this.comments = new CommentsLisModel( response );
    });
  }

}
