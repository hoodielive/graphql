import myCurrentLocation,  { getGreeting, message, name } from "./myModule";
import addition, { subtract } from './math'

console.log(message);
console.log(name)
console.log(myCurrentLocation)
console.log(getGreeting('Osa'))

console.log(addition(4, 5))
console.log(subtract(3, 9))