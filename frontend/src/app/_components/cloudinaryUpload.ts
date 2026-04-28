const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export const uploadImageToCloudinary = async (
	file: File,
	folder = "econ-journal-entry"
): Promise<string> => {
	if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
		throw new Error("Cloudinary env variables are missing");
	}

	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
	formData.append("folder", folder);

	const response = await fetch(
		`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
		{
			method: "POST",
			body: formData,
		}
	);

	if (!response.ok) {
		throw new Error("Failed to upload image to Cloudinary");
	}

	const data = await response.json();
	return data.secure_url as string;
};
