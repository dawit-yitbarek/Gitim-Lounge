import cloudinary from '../models/cloudinary.js';

export const uploadImage = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, error: 'No file provided' });
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'Gitim Lounge' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(file.buffer);
    });

    res.status(200).json({ success: true, imageUrl: result.secure_url });
  } catch (err) {
    console.log('Error from uploadImage function', err);
    res.status(500).json({ error: 'Image upload failed', success: false });
  }
};