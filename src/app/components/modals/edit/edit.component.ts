import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostInterface } from '@app/interfaces/post.interface';
import { PostsService } from '@app/services/posts/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit.component.html',
  styleUrls: ['edit.component.scss']
})
export class EditDialogComponent implements OnInit{
  public editablePost: FormGroup;
  public defaultTitle;
  public defaultBody;
  
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private formBuilder: FormBuilder,
    private postsService: PostsService,
    @Inject(MAT_DIALOG_DATA) public data: { item: PostInterface }) {

  }
  ngOnInit() {
    this.defaultTitle = this.data.item.title;
    this.defaultBody = this.data.item.body;

    this.createFormsControl();
  }
  

  private createFormsControl() {
    this.editablePost = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]]
    });

  }

  public editPost() {
    const sendEditPost = {
      id: this.data.item.id,
      title: this.editablePost.controls['title'].value,
      body: this.editablePost.controls['title'].value,
      userId: this.data.item.userId
    };

    this.postsService.editPost(sendEditPost).subscribe((response: boolean) => {
      if ( response ) {
        this.close(response)
      }
    });

  }

  public close(result?: any) {
    if (result) {
      this.dialogRef.close(result);
    } else {
      this.dialogRef.close();
    }
  }

}
