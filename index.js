const Web = require( "webwebweb" );
Web.APIs[ "/make" ] = ( qs, body ) => {
  // Web.Rum()
  let drinkies = makeDrink();
  return {
    name: nameDrink( [].concat( drinkies.liquies, drinkies.juicies, drinkies.mixies ) ),
    ingredients: drinkies
  };
};
Web.APIs[ "/name" ] = ( qs, body ) => {
  // TODO: Have a reference drink name lookup
  // TODO: If it "almost" matches the drink, then add "almost" to the end of the name. e.g. Tequila Sunrise Almost
  return {
  };
};
Web.Run( 7411 );

const ingredients = require( "./ingredients.json" );
console.log( ingredients );

// Different Arrays for Liquors, Juices, Toppings
const drinks = require( "./drinks.json" );
const drinkNames = Object.keys( drinks ).map( name => {
  drinks[ name ].sort();
  const drinkReference = drinks[ name ].filter( x => !ingredients.mixers.includes( x ) ).join( "," );
  return { [drinkReference]: name };
}).reduce( (a, d) => Object.assign( a, d ) );
console.log( drinkNames );
function nameDrink( contains = [] ) {
  contains.sort();
  if( contains.length === 1 ) {
    return contains[ 0 ];
  }
  const drinkReference = contains.filter( x => !ingredients.mixers.includes( x ) ).join( "," );
  if( !drinkReference.includes( "," ) ) {
    return drinkReference;
  }
  return drinkNames[ drinkReference ] || "Untitled Drink";
}

function makeDrink( isGrownUpDrink = true ) {
  const numLiquors = isGrownUpDrink ? ( 1 + GetRandomInt( 3 ) ) : 0;
  const numJuices = GetRandomInt( 3 );
  const numMixers = GetRandomInt( 2 );
  let drinkies = {
    liquies: [],
    juicies: [],
    mixies: [],
    hasIce: GetRandomInt( 4 ) > 2,
    shakenNotStirred: GetRandomInt( 2 ) > 0,
    isOnFire: GetRandomInt( 10 ) > 8,
  };
  for( var i = 0; i < numLiquors; i++ ) {
    let random = ingredients.liquors[ GetRandomInt( ingredients.liquors.length ) ];
    if( !drinkies.liquies.includes( random ) ) {
      drinkies.liquies.push( random );
    }
  }
  for( var i = 0; i < numJuices; i++ ) {
    let random = ingredients.juices[ GetRandomInt( ingredients.juices.length ) ];
    if( !drinkies.juicies.includes( random ) ) {
      drinkies.juicies.push( random );
    }
  }
  for( var i = 0; i < numMixers; i++ ) {
    let random = ingredients.mixers[ GetRandomInt( ingredients.mixers.length ) ];
    if( !drinkies.mixies.includes( random ) ) {
      drinkies.mixies.push( random );
    }
  }
  return drinkies;
}

function GetRandomInt( value ) {
  return Math.floor( value * Math.random() );
}
