import { PersistentUnorderedMap, context, u128 } from "near-sdk-as";


@nearBindgen
export class Sneaker {
    id: string;
    brand: string;
    image: string;
    description: string;
    price: u128;
    owner: string;
    availableSneakers: u32;
    sneakersSold: u32;
    onestarRating: u32;
    twostarRating: u32;
    threestarRating: u32;

    public static fromPayload(payload: Sneaker): Sneaker {
        const sneaker = new Sneaker();
        sneaker.id = payload.id;
        sneaker.brand = payload.brand;
        sneaker.image = payload.image;
        sneaker.description = payload.description;
        sneaker.price = payload.price;
        sneaker.owner = context.sender;
        sneaker.availableSneakers = payload.availableSneakers;
        sneaker.sneakersSold = 0;
        sneaker.onestarRating = 0;
        sneaker.twostarRating = 0;
        sneaker.threestarRating = 0;
        return sneaker;
    }
   

    public incrementSold(): void {
        this.sneakersSold = this.sneakersSold + 1;
        this.availableSneakers = this.availableSneakers - 1;
    }


    public addRate(rate: u16): void {
        if(rate == 1){
            this.onestarRating = this.onestarRating + 1;
        }else if(rate == 2){
            this.twostarRating = this.twostarRating + 1;
        }else if(rate == 3){
            this.threestarRating = this.threestarRating + 1;
        }else {
            return;
        }
    }

    public addmoreSneaker(number: u32 = 1): void {
        this.availableSneakers = this.availableSneakers + number;
    }


}

export const sneakerStorage = new PersistentUnorderedMap<string, Sneaker>("LISTED_EVENTS");
// keeps track of sneakers ids rated by a user
export const sneakersRatedStorage = new PersistentUnorderedMap<string, string[]>("LISTED_EVENTS");


