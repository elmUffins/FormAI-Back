import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_APY_SECRET
});

const file = "pe"

const uploader = async (req, res) => {
    const file = req.body.file; // Assuming the file path is sent in the request body
    try {
        const result = await cloudinary.uploader.upload(file, {
            resource_type: "video"
        });
        return res.json({ url: result.secure_url });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

