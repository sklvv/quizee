import { firestore } from "@/shared/api/firebase";
import { doc, deleteDoc } from "firebase/firestore";

await deleteDoc(doc(firestore, "cities", "DC"));
