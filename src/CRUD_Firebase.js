import {
  child,
  get,
  getDatabase,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { FireBase_Initializer } from "./FirebaseConfig";

const database = getDatabase(FireBase_Initializer);

export const setData = (userData) => {
  set(ref(database, "Data/" + userData.uid), userData)
    .then(() => {
      console.log("successfully saved Data");
    })
    .catch((error) => {
      console.log(error.Code);
    });
};
export const getData = (Uid) => {
  get(child(ref(database), "Data/" + Uid))
    .then((snapshot) => {
      console.log(snapshot.val());
    })
    .catch((error) => {
      console.log(error.code);
    });
};

export const UpDateData = (userData) => {
  update(ref(database, "Data/"), userData)
    .then(() => {
      console.log("successfully updated");
    })
    .catch((error) => {
      console.log(error.Code);
    });
};
const DeleteData = () => {
  remove(ref(database, "Notes/Note"))
    .then(() => {
      console.log("successfully updated");
    })
    .catch((error) => {
      console.log(error.Code);
    });
};
export default function CRUD_Firebase() {
  return (
    <div>
      <button onClick={setData}>Send Data</button>
      <button onClick={getData}>Get data</button>
      <button onClick={UpDateData}>UpDateData</button>
      <button onClick={DeleteData}>Deleting the data</button>
    </div>
  );
}
