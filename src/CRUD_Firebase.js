import { app } from "./firebase";
import { child, getDatabase, ref, set, update } from "firebase/database";
const database = getDatabase(app);

const setData = () => {
  set(ref(database), "Data/node1", {
    name: "John Doe",
    age: 30,
    city: "New York",
  })
    .then(() => {
      console.log("successfully saved Data");
    })
    .catch((error) => {
      console.log(error.Code);
    });
};
const getData = () => {
  get(child(ref(database), "Notes/Note2")).then((snapshot) => {
    console.log(snapshot.val());
  });
};

const UpDateData = () => {
  update(ref(database, "Notes/Note2"), {
    id: 3,
    name: "jain",
    note: "notes",
  })
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
