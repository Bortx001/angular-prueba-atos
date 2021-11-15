import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewPostInterface } from '@app/interfaces/newPost.interface';
import { PostsService } from '@app/services/posts/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new.component.html',
  styleUrls: ['new.component.scss']
})
export class NewDialogComponent implements OnInit{
  public createPost: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<NewDialogComponent>,
    private formBuilder: FormBuilder,
    private postsService: PostsService,
    @Inject(MAT_DIALOG_DATA) public data: {}) {

  }
  ngOnInit() {
    this.createFormsControl();
  }
  

  private createFormsControl() {
    this.createPost = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]]
    });

  }

  public newPost() {
    const sendNewPost = {
      title: this.createPost.controls['title'].value,
      body: this.createPost.controls['title'].value,
      userId: 1 // LO HE PUESTO A  1 POR NO MONTAR UN SELECTOR DE USUARIO O UN SISTEMA LOGIN
    };


    this.postsService.createPost(sendNewPost).subscribe((response: boolean) => {
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
