import { Sneaker, sneakerStorage, sneakersRatedStorage } from './model';
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
    sneaker.incrementSold();
    sneakerStorage.set(sneaker.id, sneaker);
}



/**
   * @dev allow users to add a new sneaker to the blockchain
   * @param sneaker to be added to the blockchain
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
 * @returns an array of objects that represent sneakers from the marketplace
 */
 export function getSneakers(): Array<Sneaker> {
  return sneakerStorage.values();
}

  /**
   * @dev allows sneaker owners to add a new sneaker to the marketplace
   * @param id of sneaker
   * @param _amount of available sneakers to be added to the marketplace
   * @notice only sneaker owners are allowed to add a new sneaker to the marketplace
   */
  export function addSneakers(id: string, _amount: u32): void {
    const sneaker = getSneaker(id);
    if (sneaker == null) {
      throw new Error("sneaker not found");
    }
    assert(_amount > u32.MIN_VALUE, "Invalid amount");
    assert(sneaker.owner.toString() == context.sender.toString(),"You don't have permission to add more sneaker");
    sneaker.addmoreSneaker(_amount); 
    sneakerStorage.set(sneaker.id, sneaker); 
  }


 /**
   * @dev allow users to rate a sneaker with one, two or three stars
   * @param id of sneaker to be rated
   * @notice sneaker owners are not allowed to rate their own sneakers
   */

  export function rateSneaker(id: string, rate: u16): void {
    assert(rate == 1 || rate == 2 || rate == 3, "Rate must be between 1 and 3");
    const sneaker = getSneaker(id);
    if (sneaker == null) {
      throw new Error("sneaker not found");
    }
    assert(sneaker.owner.toString() != context.sender.toString(),"You can't rate your own sneaker");
    const sneakersRated = sneakersRatedStorage.get(context.sender);
    if(sneakersRated == null){
      sneakersRatedStorage.set(context.sender, [id]);
    }else{
      assert(sneakersRated.indexOf(id) == -1, "You have already rated this sneaker");
      sneakersRated.push(id);
      sneakersRatedStorage.set(context.sender, sneakersRated);
    }
    
    sneaker.addRate(rate);
  
    sneakerStorage.set(sneaker.id, sneaker); 
  }

