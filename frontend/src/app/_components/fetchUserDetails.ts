import { doc } from "firebase/firestore";
import { auth, db } from "../_components/firebaseConfig";
import { collection , getDoc} from "firebase/firestore";
import { Auth, User } from "firebase/auth";

export interface UserDetails {
    uid: string,
    firstname: string,
    lastname: string,
    email: string,
    type: string
}

// really, i think i should have used OauthStateChanged in this functtion too.
const getUserDetails = async (auth: Auth): Promise<UserDetails | null> => {

    try{
        const user = auth.currentUser;
        if (user) {
            const { uid, email } = user;
            const userRef = doc(collection(db, 'users'), uid); // Create a document reference
            const userDocSnap = await getDoc(userRef); // Get the user document snapshot

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                const userDetails: UserDetails = {
                    uid: uid,
                    firstname: userData.firstname  ,
                    lastname: userData.lastname  ,
                    email: userData.email  ,
                    type: userData.type  
                };

                return userDetails;
            }else{
                console.log('UserDoc snap does not exits! Check to see if the exists in the database!')
                return null;
            }
        }else{
            console.log("User does not exits");
            return null;
        }
    }catch(error){
        console.error("Error retrieving user details:", error);
        return null;
    }
  };

export {getUserDetails};


