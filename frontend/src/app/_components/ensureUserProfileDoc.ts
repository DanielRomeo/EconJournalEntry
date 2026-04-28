import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const ensureUserProfileDoc = async (user: User) => {
	const userRef = doc(db, "users", user.uid);
	const userDoc = await getDoc(userRef);

	if (!userDoc.exists()) {
		const names = (user.displayName || "").split(" ");
		await setDoc(
			userRef,
			{
				uid: user.uid,
				email: user.email || "",
				firstname: names[0] || "Guest",
				lastname: names.slice(1).join(" ") || "Writer",
				type: "writer",
				bio: "",
				image: "",
				facebook: "",
				instagram: "",
				x: "",
				linkedin: "",
			},
			{ merge: true }
		);
	}
};
