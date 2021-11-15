export class UserModel {
        id: number;
        email: number;
        username: string;
        name: string;
        phone: string;
        website: string;
        address: {
            city: string,
            suite: string,
            zipcode: string,
            street: string,
            geo: {
                lat: number,
                lng: number
            }
        };
        company: { // company no voy a implementarlo
            bs: string,
            catchPhrase: string,
            name: string
        }

    constructor( jsonItem: any ) {
  
        if ( jsonItem ) {

                let adress = null;

                if ( jsonItem.address ) {
                    adress = {
                        city: jsonItem.address.city,
                        suite: jsonItem.address.suite,
                        zipcode: jsonItem.address.zipcode,
                        street: jsonItem.address.street,
                        geo: jsonItem.address.geo
                    }
                }

                this.id = jsonItem.id;
                this.email = jsonItem.email,
                this.username = jsonItem.username,
                this.name = jsonItem.name,
                this.phone = jsonItem.phone,
                this.website = jsonItem.website,
                this.address = jsonItem.address;
                this.company = jsonItem.company
        }
    }

}
