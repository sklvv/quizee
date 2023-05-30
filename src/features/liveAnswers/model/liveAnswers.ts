import { firestore } from "@/shared/api/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const unsub = onSnapshot(doc(firestore, "cities", "SF"), doc => {
    console.log("Current data: ", doc.data());
});
