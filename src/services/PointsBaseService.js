import firebase from "../Config/config";

const db = firebase.database().ref("/blablaPoints");


// const dbSorted = firebase.database().ref("/blablaPoints").orderBy("timestamp", "desc");
// var citiesRef = db.collection("cities");


const getAll = () => {
  // console.log(db.orderBy("name"))
  return db;
};
// const getAllSorted = () => {
//   return dbSorted;
// };

const create = (data) => {
  console.log(data)
  return db.push(data);
};

const update = (key, data) => {
  return db.child(key).update(data);
};

const remove = (key) => {
  return db.child(key).remove();
};

const removeAll = () => {
  return db.remove();
};

export default {
  getAll,
  // getAllSorted,
  create,
  update,
  remove,
  removeAll,
};