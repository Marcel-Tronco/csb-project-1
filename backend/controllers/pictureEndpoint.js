const express = require('express')
const axios = require('axios')
const fs = require('fs')
const pictureRouter = express.Router()

pictureRouter.get('/', (request, response) => {
  fs.stat('data/pictures/image.jpg', async (err, stats) => {
    if (err || Date.now() - stats.ctimeMs > 1000 * 60 * 60 ) {
      try {
        console.log('Try to download.')
        response = await axios.get('https://picsum.photos/1200', { responseType: 'stream' })
        await response.data.pipe(fs.createWriteStream('data/pictures/image.jpg'));
      } catch (error) {
        console.error(error);
      }   
    }
  })
  response.sendFile(`${process.cwd()}/data/pictures/image.jpg`)
})

module.exports = pictureRouter