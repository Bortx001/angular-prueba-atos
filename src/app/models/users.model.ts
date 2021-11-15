export class UsersLisModel {
    usersList: {
        id: number,
        email: number,
        username: string,
        name: string,
        phone: string,
        website: string,
        address: {
            city: string,
            suite: string,
            zipcode: string,
            street: string,
            geo: {
                lat: number,
                lng: number
            }
        },
        company: { // company no voy a implementarlo
            bs: string,
            catchPhrase: string,
            name: string
        }
    }[] = [];


    constructor( jsonItem: any ) {
  
        if ( jsonItem ) {
            jsonItem.forEach(item => {
                let adress = null;

                if ( item.address ) {
                    adress = {
                        city: item.address.city,
                        suite: item.address.suite,
                        zipcode: item.address.zipcode,
                        street: item.address.street,
                        geo: item.address.geo
                    }
                }
     
                this.usersList.push({
                    id: item.id,
                    email: item.email,
                    username: item.username,
                    name: item.name,
                    phone: item.phone,
                    website: item.website,
                    address: adress,
                    company: null
                });
            });
        }
    }

    public getAllUsers() {
        return this.usersList;
    }

    public getUserDetail(id: number) {
        if ( this.getAllUsers() ) {
         const user =  this.getAllUsers().filter(x => x.id === id)[0];
         return `${user.username} - ${user.email}`;
        }
    }
}
