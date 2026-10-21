const AUTH_ERROR_MESSAGES: Record<string, string> = {
	"auth/email-already-in-use": "An account already exists for this email address. Try signing in instead.",
	"auth/invalid-credential": "The email address or password is incorrect.",
	"auth/invalid-email": "Enter a valid email address.",
	"auth/network-request-failed": "We could not reach the sign-in service. Check your connection and try again.",
	"auth/popup-blocked": "Your browser blocked the Google sign-in window. Allow popups for this site and try again.",
	"auth/popup-closed-by-user": "The Google sign-in window was closed before sign-in finished.",
	"auth/cancelled-popup-request": "Another sign-in attempt is already open. Close it and try again.",
	"auth/too-many-requests": "Too many attempts were made. Please wait a moment and try again.",
	"auth/unauthorized-domain": "Google sign-in is not enabled for this website domain yet.",
	"auth/user-disabled": "This account has been disabled. Contact support if you think this is a mistake.",
	"auth/weak-password": "Choose a stronger password with at least six characters.",
};

export const firebaseAuthErrorMessage = (
	error: unknown,
	fallback = "Something went wrong. Please try again.",
) => {
	const code = typeof error === "object" && error !== null && "code" in error
		? String((error as { code?: unknown }).code || "")
		: "";

	return AUTH_ERROR_MESSAGES[code] || fallback;
};
