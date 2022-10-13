import { v4 as uuid4 } from "uuid";
import { parseNearAmount } from "near-api-js/lib/utils/format";

const GAS = 100000000000000;

export function createSneaker(sneaker) {
  sneaker.id = uuid4();
  sneaker.price = parseNearAmount(sneaker.price + "");
  sneaker.availableSneakers = Number(sneaker.availableSneakers);
  return window.contract.setSneaker({ sneaker });
}


export function addSneakers( id, _ammount ) {
  const ammount =  parseInt(_ammount);
  return window.contract.addSneakers( { id: id, _ammount: ammount }, GAS );
}

export function oneStarRating( id ) {
  return window.contract.oneStarRating( { id: id }, GAS );
}

export function twoStarRating( id ) {
  return window.contract.twoStarRating( { id: id }, GAS );
}

export function threeStarRating( id ) {
  return window.contract.threeStarRating( { id: id }, GAS );
}


export function getSneakers() {
  return window.contract.getSneakers();
}

export async function buySneaker({ id, price}) {
  await window.contract.BuySneaker({ id: id }, GAS, price);
}