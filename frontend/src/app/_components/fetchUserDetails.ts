import { doc } from "firebase/firestore";
import { db } from "../_components/firebaseConfig";
import { collection , getDoc} from "firebase/firestore";
import { Auth } from "firebase/auth";

export interface UserDetails {
    uid: string,
    firstname: string,
    lastname: string,
    email: string,
    type: string,
    bio?: string,
    image?: string,
    facebook?: string,
    instagram?: string,
    x?: string,
    linkedin?: string
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
                    type: userData.type,
                    bio: userData.bio || "",
                    image: userData.image || userData.thumbnail || "",
                    facebook: userData.facebook || "",
                    instagram: userData.instagram || "",
                    x: userData.x || "",
                    linkedin: userData.linkedin || ""
                };

                return userDetails;
            }else{
                const names = (user.displayName || "").split(" ");
                return {
                    uid: uid,
                    firstname: names[0] || "Guest",
                    lastname: names.slice(1).join(" ") || "Writer",
                    email: email || "",
                    type: "writer",
                    bio: "",
                    image: "",
                    facebook: "",
                    instagram: "",
                    x: "",
                    linkedin: ""
                };
            }
        }else{
            console.log("User does not exist");
            return null;
        }
    }catch(error){
        console.error("Error retrieving user details:", error);
        return null;
    }
  };

export {getUserDetails};


