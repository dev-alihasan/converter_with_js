// Import necessary libraries
const ytdl = require('ytdl-core');       // For downloading YouTube videos
const ffmpeg = require('fluent-ffmpeg'); // For converting media formats
const fs = require('fs');               // For working with the file system
const path = require('path');           // For handling file paths

// Set the YouTube video ID and output file information
const videoId = 'TW9d8vYrVFQ';           // Replace with the desired video ID
const outputDir = 'Music';               // The directory where the output file will be saved
const outputFile = path.join(outputDir, ''); // The name of the output MP3 file

// Get the audio stream of the YouTube video using ytdl-core
const stream = ytdl(videoId, { filter: 'audioonly' });

// convert and save the audio stream to MP3 format using FFmpeg
ffmpeg(stream)
    .toFormat('mp3')                    // Convert to MP3 format
    .on('error', (err) => {              // Handle any errors during conversion
        console.error('An error occurred:', err.message);
    })
    .on('end', () => {                   // After successful conversion
        console.log('Finished converting to MP3 format.');
    })
    .pipe(fs.createWriteStream(outputFile)) // Create a writable stream to save the file
    .on('error', (err) => {              // Handle any errors during file saving
        console.error('An error occurred while saving the file:', err.message);
    })
    .on('finish', () => {                // After the file is successfully saved
        console.log('File saved successfully.');
    });
