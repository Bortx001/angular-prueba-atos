
export class PostDetailModel {
    id: number;
    userId: number;
    title: string;
    body: string;

    constructor( jsonItem: any ) {
  
        if ( jsonItem ) {
            this.id =jsonItem.id;
            this.userId =jsonItem.userId;
            this.title =jsonItem.title;
            this.body =jsonItem.body;
        }
    }
}
