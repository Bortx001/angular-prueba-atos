export class PostsLisModel {
    postsList: {
        id: number,
        userId: number,
        title: string,
        body: string,
    }[] = [];


    constructor( jsonItem: any ) {
  
        if ( jsonItem ) {
            jsonItem.forEach(item => {
                this.postsList.push({
                    id: item.id,
                    userId: item.userId,
                    title: item.title,
                    body: item.body
                });
            });
        }
    }

    public getAllPosts() {
        return this.postsList;
    }

    public getPostDetail(id: number) {
        return this.getAllPosts().filter(x => x.id === id)[0];
    }

    public getPostsByUser(id: number ) {
        return this.getAllPosts().filter(x => x.userId === id);
    }
}
