import { firestore } from "@/shared/api/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getInfoAboutQuizee = async (id: string) => {
    const docRef = doc(firestore, "quizees", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
};
