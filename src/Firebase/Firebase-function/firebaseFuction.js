import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../Config/firebaseConfig";
export const singUp=(email,password)=>{
    const auth = getAuth(app);
    let mess = createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        return true;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return false;
    });
    console.log(mess);
}