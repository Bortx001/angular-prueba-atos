import { UsersService } from '@app/services/users/users.service';

export class CommentsLisModel {
    totalComments: number = 0;
    commentsList: {
        id: number,
        postId: number,
        body: string,
        name: string
        email: string,
    }[] = [];


    constructor( jsonItem: any ) {
  
        if ( jsonItem ) {
            jsonItem.forEach(item => {
                this.commentsList.push({
                    id: item.id,
                    postId: item.postId,
                    body: item.body,
                    name: item.name,
                    email: item.email
                });
            });

            this.totalComments = this.commentsList.length;
        }
    }

    public getAllComments() {
        return this.commentsList;
    }

    public getUserWithEmail( id: number ) {
        const item = this.getAllComments().filter(x => x.id === id)[0];
        return `${item.id} - ${ item.email}`;
    }

    public getCommentDetail(id: number) {
        return this.getAllComments().filter(x => x.id === id)[0];
    }

}
