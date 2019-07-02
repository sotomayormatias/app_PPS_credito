export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyCL3PSDQsId1AZSKJhfTgub-Hx0A-_wg5k",
    authDomain: "facilqred.firebaseapp.com",
    databaseURL: "https://facilqred.firebaseio.com",
    projectId: "facilqred",
    storageBucket: "facilqred.appspot.com",
    messagingSenderId: "179351317354"
  };
  
export const snapshotToArray = snapshot => {
  let returnArray = [];
  snapshot.forEach(element => {
    let item = element.val();
    item.key = element.key;
    returnArray.push(item);
  });

  return returnArray;
}