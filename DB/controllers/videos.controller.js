import videosService from "../services/videos.service.js";

const getVideos = async (_, res) => {
    try {
        const videos = await videosService.getVideos();
        return res.json(videos);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getVideo = async (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "An id is required" });

    try {
        const video = await videosService.getVideoById(id);
        return res.json(video);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getVideosByUsuario = async (req, res) => {
    const id_usuario = req.userId;
    if (!id_usuario) return res.status(400).json({ message: "A user is required" });

    try {
        const video = await videosService.getVideosByUsuario(id_usuario);
        return res.json(video)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const uploadVideo = async (req, res) => {
    try {
        const file = req.file;
        const { userId, exerciseId } = req.body; 
        console.log(file)

        if (!file) return res.status(400).json({ message: "A file is required" });
        if (!userId) return res.status(400).json({ message: "A user is expected "});
        if (!exerciseId) return res.status(400).json({ message: "An exercise is expected "});

        const video = await videosService.uploadVideo(file, userId, exerciseId);
        return res.status(201).json(video);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteVideo = async (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "An id is required" });

    try {
        const deletedId = await videosService.deleteVideo(id);
        return res.json(deletedId);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export default {
    getVideos,
    getVideo,
    getVideosByUsuario,
    uploadVideo,
    deleteVideo
};

