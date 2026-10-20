import type { Metadata } from "next";
import AccountPageComponent from "./AccountPageComponent";

export const metadata: Metadata = {
	title: "Account",
	robots: { index: false, follow: false },
};

const AccountPage = ( ) => {
	

	return (
		<div>
           <AccountPageComponent></AccountPageComponent>
		</div>
	);
};

export default AccountPage;
