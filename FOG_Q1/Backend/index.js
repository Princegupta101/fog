import cors from 'cors';
import express from 'express';
import fs from 'fs';
import { parseFile } from 'music-metadata';
import path from 'path';

const app = express();
const PORT = 5000;
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use('/songs', express.static(path.join(__dirname, 'songs')));

const getSongMetadata = async (filePath) => {
    try {
        const metadata = await parseFile(filePath);
        return { duration: metadata.format.duration || null };
    } catch (error) {
        console.error(`Error reading metadata:`, error);
        return { duration: null };
    }
};

app.get('/api/songs', async (req, res) => {
    try {
        const songsDirPath = path.join(__dirname, 'songs');
        if (!fs.existsSync(songsDirPath)) return res.status(404).json({ error: 'Songs directory not found' });

        const songFiles = await fs.promises.readdir(songsDirPath);
        const songs = await Promise.all(
            songFiles.map(async (file, index) => {
                const filePath = path.join(songsDirPath, file);
                const stat = await fs.promises.stat(filePath);
                if (stat.isDirectory() || !file.endsWith('.mp3')) return null;

                const metadata = await getSongMetadata(filePath);
                const duration = metadata.duration
                    ? new Date(metadata.duration * 1000).toISOString().substr(11, 8)
                    : 'Unknown';

                return {
                    id: index + 1,
                    title: path.parse(file).name,
                    src: `http://localhost:${PORT}/songs/${file}`,
                    duration,
                    plays: '643,786,045',
                    album: 'Thriller 25 Sup...',
                    img: 'https://via.placeholder.com/150',
                };
            })
        );

        res.json(songs.filter((song) => song !== null));
    } catch (error) {
        console.error('Error reading songs:', error);
        res.status(500).json({ error: 'Unable to fetch songs' });
    }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
