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
   



    public increamentSold(): void {
        this.sneakersSold = this.sneakersSold + 1;
    }

    public decreamentSneakeravailable(): void {
        this.availableSneakers = this.availableSneakers - 1;
    }

    public oneStarRate(): void {
        this.onestarRating = this.onestarRating + 1;
    }

    public twoStarRate(): void {
        this.twostarRating = this.twostarRating + 1;
    }

    public threeStarRate(): void {
        this.threestarRating = this.threestarRating + 1;
    }

    public addmoreSneaker(number: u32 = 1): void {
        this.availableSneakers = this.availableSneakers + number;
    }


}

export const sneakerStorage = new PersistentUnorderedMap<string, Sneaker>("LISTED_EVENTS");


