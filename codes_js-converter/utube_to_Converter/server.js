// Import necessary libraries
const ytdl = require('ytdl-core'); // For downloading YouTube videos
const ffmpeg = require('fluent-ffmpeg'); // For converting media formats
const fs = require('fs').promises; // For asynchronous file operations
const path = require('path'); // For handling file paths

// Define constants
const videoId = 'TW9d8vYrVFQ'; // Replace with the desired video ID
const outputDir = 'Music'; // The directory where the output file will be saved
const outputFile = path.join(outputDir, 'output.mp3'); // The name of the output MP3 file (customize as needed)

// Define an asynchronous function for downloading and converting the video
async function downloadAndConvertVideo() {
  try {
    // Get the audio stream of the YouTube video using ytdl-core
    const stream = ytdl(videoId, { filter: 'audioonly' });

    // Convert and save the audio stream to MP3 format using FFmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(stream)
        .toFormat('mp3')
        .on('error', (err) => reject(err)) // Handle any errors during conversion
        .on('end', () => resolve()) // After successful conversion
        .pipe(fs.createWriteStream(outputFile))
        .on('error', (err) => reject(err)) // Handle any errors during file saving
        .on('finish', () => resolve()); // After the file is successfully saved
    });

    console.log('Video downloaded and converted successfully.');
  } catch (err) {
    console.error('An error occurred:', err.message);
  }
}

// Call the asynchronous function to start the process
downloadAndConvertVideo();
