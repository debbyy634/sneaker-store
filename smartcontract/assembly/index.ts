import { Sneaker, sneakerStorage } from './model';
import { context, ContractPromiseBatch, u128 } from "near-sdk-as";





/**
   * @dev allow other users to buy a sneaker from the marketplace
   * @param id of sneaker to be bought
   * @notice sneaker owners are not allowed to buy sneaker
   * @notice available sneakers must be greater than zero to facilitate the transaction.
   */
export function BuySneaker(id: string): void {
    const sneaker = getSneaker(id);
    if (sneaker == null) {
        throw new Error("Event not found");
    }
    assert(sneaker.owner.toString() != context.sender.toString(),"owner can't buy sneaaker");
    assert(sneaker.availableSneakers > 0 ,"sold out");
    assert(sneaker.price.toString() == context.attachedDeposit.toString(), "attached deposit should be equal to sneaker price");
    ContractPromiseBatch.create(sneaker.owner).transfer(context.attachedDeposit);
    sneaker.increamentSold();
    sneaker.decreamentSneakeravailable();
    sneakerStorage.set(sneaker.id, sneaker);
}



/**
   * @dev allow users to add a new sneaker to the block-chain
   * @param sneaker to be added to the block-chain
   */
 export function setSneaker(sneaker: Sneaker): void {
  let storedSneaker = sneakerStorage.get(sneaker.id);
  if (storedSneaker !== null) {
      throw new Error(`a sneaker with id=${sneaker.id} already exists`);
  }
  assert(sneaker.image.length > 0, "Empty image url");
  sneakerStorage.set(sneaker.id, Sneaker.fromPayload(sneaker));
}


/**
   * @dev to retrive a sneaker from the mapping
   * @param id of the sneaker to be retrieved
   */
export function getSneaker(id: string): Sneaker | null {
  return sneakerStorage.get(id);
}


/**
 * 
 * @returns an array of objects that represent an event
 */
 export function getSneakers(): Array<Sneaker> {
  return sneakerStorage.values();
}

  /**
   * @dev allows sneaker owners to add a new sneaker to the marketplace
   * @param id of sneaker
   * @param _ammount of available sneakers to be added to the marketplace
   * @notice only sneaker owners are allowed to add a new sneaker to the marketplace
   */
  export function addSneakers(id: string, _ammount: u32): void {
    const sneaker = getSneaker(id);
    if (sneaker == null) {
      throw new Error("sneaker not found");
    }
    assert(sneaker.owner.toString() == context.sender.toString(),"You don't have permission to add more sneaker");
    sneaker.addmoreSneaker(_ammount); 
    sneakerStorage.set(sneaker.id, sneaker); 
  }

  
  export function editSneakers(id:string, brand:string, description: string, image:string): void{
    const sneaker = getSneaker(id);
    if(sneaker == null){
      throw new Error("sneaker not found"); 
    }
    const newSneaker = new Sneaker();
    newSneaker.brand = brand;
    newSneaker.description = description;
    newSneaker.image = image;

    assert(sneaker.owner.toString() == context.sender.toString(),"You don't have permission to edit sneakers");
    sneakerStorage.set(sneaker.id, newSneaker);
  }

  export function hideOrShowVisibility():void{
    const sneaker = getSneaker(id);
    if (sneaker == null) {
      throw new Error("sneaker not found");
    }
    assert(sneaker.owner.toString() == context.sender.toString(),"You don't have permission to hide or show visibility");
    sneaker.hideOrShowVisibility();
    sneakerStorage.set(sneaker.id, sneaker); 
  }

 /**
   * @dev allow users to rate sneaker one star
   * @param id of sneaker to be rated
   * @notice sneaker owners are not allowed to rate their own sneakers
   */

  export function oneStarRating(id: string): void {
    const sneaker = getSneaker(id);
    if (sneaker == null) {
      throw new Error("sneaker not found");
    }
    assert(sneaker.owner.toString() != context.sender.toString(),"You can't rate your own sneaker");
    sneaker.oneStarRate(); 
    sneakerStorage.set(sneaker.id, sneaker); 
  }


 /**
   * @dev allow users to rate sneaker two star
   * @param id of sneaker to be rated
   * @notice sneaker owners are not allowed to rate their own sneakers
   */
  export function twoStarRating(id: string): void {
    const sneaker = getSneaker(id);
    if (sneaker == null) {
      throw new Error("sneaker not found");
    }
    assert(sneaker.owner.toString() != context.sender.toString(),"You can't rate your own sneaker");
    sneaker.twoStarRate(); 
    sneakerStorage.set(sneaker.id, sneaker); 
  }



  /**
   * @dev allow users to rate sneaker three star
   * @param id of sneaker to be rated
   * @notice sneaker owners are not allowed to rate their own sneakers
   */
  export function threeStarRating(id: string): void {
    const sneaker = getSneaker(id);
    if (sneaker == null) {
      throw new Error("sneaker not found");
    }
    assert(sneaker.owner.toString() != context.sender.toString(),"You can't rate your own sneaker");
    sneaker.threeStarRate(); 
    sneakerStorage.set(sneaker.id, sneaker); 
  }


  
