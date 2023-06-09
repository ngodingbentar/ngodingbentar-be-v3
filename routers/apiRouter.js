const fs = require('fs');
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const request = require('request');
const axios = require('axios');
const dotenv = require('dotenv');
const validUrl = require('valid-url');
const shortid = require('shortid');
const Url = require('../models/urlModel');
const Blog = require('../models/blogModel');
const Categories = require('../models/categoriesModel');

dotenv.config()

const apiRouter = express.Router();

const port = process.env.PORT
const weatherbit_key = process.env.WEATHERBIT
const mongo = process.env.MONGODB_URL
const mongo2 = process.env.MONGODB_URI
const raja_ongkir_key = process.env.RAJA_ONGKIR
const binderbyte_Key = process.env.API_KEY_BINDERBYTE

apiRouter.get('/surah/:id',
  expressAsyncHandler(async (req, res) => {
    const dataSurah = JSON.parse(fs.readFileSync(`assets/surah/${req.params.id}.json`));
    res.send(dataSurah)
  })
)

apiRouter.get('/check-env',
  expressAsyncHandler(async (req, res) => {
    res.send({weatherbit_key, mongo, raja_ongkir_key, mongo2})
  })
)

apiRouter.get('/check-ip',
  expressAsyncHandler(async (req, res) => {
    const myip = req.headers['x-forwarded-for'] ||
     req.socket.remoteAddress ||
     null;

    const ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
     req.socket.remoteAddress
    // console.log('myip', myip)

    const data = {
      ip1 : myip,
      ip2 : ip
    }

    console.log(data)
    
    res.send(data)
  })
)


apiRouter.get(
  '/music/video',
  expressAsyncHandler(async (req, res) => {
    try{
      const urlVideo = req.query.q || '';
      const url = `https://www.shazam.com/video/v3/-/-/web/385334817/youtube/video?q=${urlVideo}`
      const result = await axios.get(url);
      res.send(result.data);
    }catch(err){
      res.send(err)
    }
  })
);

apiRouter.get(
  '/music/video/:id',
  expressAsyncHandler(async (req, res) => {
    try{
      const url = req.params.id
      console.log('url', url)
      const result = await axios.get(url);
      res.send(result);
    }catch(err){
      res.send(err)
    }
  })
);

apiRouter.get(
  '/music/search',
  expressAsyncHandler(async (req, res) => {
    try{
      const title = req.query.q || '';
      const url = `https://www.shazam.com/services/search/v3/en-US/ID/web/search?query=${title}&numResults=3&offset=0&types=artists,songs`
      const result = await axios.get(url);
      res.send(result.data);
    }catch(err){
      res.send(err)
    }
  })
);

apiRouter.get(
  '/music/track/similarities/:id',
  expressAsyncHandler(async (req, res) => {
    try{
      const url = `https://www.shazam.com/shazam/v3/en-US/ID/web/-/tracks/track-similarities-id-${req.params.id}?startFrom=0&pageSize=20&connected=`
      const result = await axios.get(url);
      res.send(result.data);
    }catch(err){
      res.send(err)
    }
  })
);

apiRouter.get(
  '/music/album-featured-in/:id',
  expressAsyncHandler(async (req, res) => {
    try{
      const url = `https://www.shazam.com/services/amapi/custom/en/ID/albumfeaturedin/${req.params.id}`
      const result = await axios.get(url);
      res.send(result.data);
    }catch(err){
      res.send(err)
    }
  })
);

apiRouter.get(
  '/music/count/:id',
  expressAsyncHandler(async (req, res) => {
    try{
      const url = `https://www.shazam.com/services/count/v2/web/track/${req.params.id}`
      const result = await axios.get(url);
      res.send(result.data);
    }catch(err){
      res.send(err)
    }
  })
);

apiRouter.get(
  '/music/artist-top-tracks/:id',
  expressAsyncHandler(async (req, res) => {
    try{
      const url = `https://cdn.shazam.com/shazam/v3/en-US/ID/web/-/tracks/artisttoptracks_${req.params.id}?startFrom=0&pageSize=20&connected=`
      const result = await axios.get(url);
      res.send(result.data);
    }catch(err){
      res.send(err)
    }
  })
);

apiRouter.get(
  '/music/artist/:id',
  expressAsyncHandler(async (req, res) => {
    try{
      const url = `https://www.shazam.com/discovery/v3/en-US/ID/web/artist/${req.params.id}?shazamapiversion=v3&video=v3`
      const result = await axios.get(url);
      res.send(result.data);
    }catch(err){
      res.send(err)
    }
  })
);

apiRouter.get(
  '/music/artist/bio/:id',
  expressAsyncHandler(async (req, res) => {
    try{
      const url = `https://www.shazam.com/services/amapi/v1/catalog/ID/artists/${req.params.id}?extend=artistBio%2CbornOrFormed%2CeditorialArtwork%2Corigin&views=featured-release%2Cfull-albums%2Cappears-on-albums%2Cfeatured-albums%2Cfeatured-on-albums%2Csingles%2Ccompilation-albums%2Clive-albums%2Clatest-release%2Ctop-music-videos%2Csimilar-artists%2Ctop-songs%2Cplaylists%2Cessential-albums`
      const result = await axios.get(url);
      res.send(result.data);
    }catch(err){
      res.send(err)
    }
  })
);

apiRouter.get(
  '/music/discovery/ID',
  expressAsyncHandler(async (req, res) => {
    try{
      const url = `https://www.shazam.com/shazam/v3/en-US/ID/web/-/tracks/risers-country-chart-ID?pageSize=20&startFrom=0`
      const result = await axios.get(url);
      res.send(result.data);
    }catch(err){
      res.send(err)
    }
  })
);

apiRouter.get(
  '/music/top20/global',
  expressAsyncHandler(async (req, res) => {
    try{
      const url = `https://www.shazam.com/shazam/v3/en-US/ID/web/-/tracks/world-chart-world?pageSize=20&startFrom=0`
      const result = await axios.get(url);
      res.send(result.data);
    }catch(err){
      res.send(err)
    }
  })
);

apiRouter.get(
  '/music/top200/global',
  expressAsyncHandler(async (req, res) => {
    try{
      const url = `https://www.shazam.com/shazam/v3/en-US/ID/web/-/tracks/world-chart-world?pageSize=200&startFrom=0`
      const result = await axios.get(url);
      res.send(result.data);
    }catch(err){
      res.send(err)
    }
  })
);


apiRouter.get(
  '/music/top20/ID',
  expressAsyncHandler(async (req, res) => {
    try{
      const url = `https://www.shazam.com/shazam/v3/en-US/ID/web/-/tracks/ip-country-chart-ID?pageSize=20&startFrom=0`
      const result = await axios.get(url);
      res.send(result.data);
    }catch(err){
      res.send(err)
    }
  })
);

apiRouter.get(
  '/music/top200/ID',
  expressAsyncHandler(async (req, res) => {
    try{
      const url = `https://www.shazam.com/shazam/v3/en-US/ID/web/-/tracks/ip-country-chart-ID?pageSize=200&startFrom=0`
      const result = await axios.get(url);
      res.send(result.data);
    }catch(err){
      res.send(err)
    }
  })
);

apiRouter.get(
  '/music/track/:id',
  expressAsyncHandler(async (req, res) => {
    try{
      const url = `https://www.shazam.com/discovery/v5/en-US/ID/web/-/track/${req.params.id}?shazamapiversion=v3&video=v3`
      const result = await axios.get(url);
      res.send(result.data);
    }catch(err){
      res.send(err)
    }
  })
);

apiRouter.get(
  '/category',
  expressAsyncHandler(async (req, res) => {
    const category = await Categories.find({});
    res.send(category);
  })
);

apiRouter.post(
  '/category',
  expressAsyncHandler(async (req, res) => {
    const category = new Categories({
      name: req.body.name,
    });
    const createdCategories = await category.save();
    res.send({
      _id: createdCategories._id,
      name: createdCategories.name,
    });
  })
);

apiRouter.get(
  '/chat',
  expressAsyncHandler(async (req, res) => {
    try{
      const url = `https://fdciabdul.tech/api/ayla/?pesan=hai`
      const result = await axios.get(url);
      res.send(result.data);
    }catch(err){
      res.send(err)
    }
  })
);

apiRouter.post(
  '/blog',
  expressAsyncHandler(async (req, res) => {
    try{
      const blog = new Blog({
        title: req.body.title,
        body: req.body.body,
        category: req.body.category,
        banner: req.body.banner,
        view: 1
      });
      const createdBlog = await blog.save();
      res
        .status(201)
        .send({ message: 'New Blog Created', blog: createdBlog });
    }catch(err){
      res.send(err)
    }
    
  })
);

apiRouter.get(
  '/blog',
  expressAsyncHandler(async (req, res) => {
    try{
      const pageSize = 10;
      const page = Number(req.query.pageNumber) || 1;
      const category = req.query.category || '';
      const title = req.query.q || '';
      const categoryFilter = category ? { category } : {};
      const nameFilter = title ? { title: { $regex: title, $options: 'i' } } : {};

      const count = await Blog.count({
        ...nameFilter,
        ...categoryFilter,
      });

      const blogs = await Blog.find({
        ...categoryFilter,
        ...nameFilter
      })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
      res.send({ blogs, page, pages: Math.ceil(count / pageSize) });
    }catch(err){
      res.send(err)
    }
    
  })
);

apiRouter.get(
  '/blog/:id',
  expressAsyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.send(blog);
    } else {
      res.status(404).send({ message: 'blog Not Found' });
    }
  })
);

apiRouter.put(
  '/blog/view/:id',
  expressAsyncHandler(async (req, res) => {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    const initView = blog.view ? blog.view : 0
    if (blog) {
      blog.view = initView + 1;
      const updateViewBlog = await blog.save();
      res.send({ message: 'Blog View Updated', blog: updateViewBlog });
    } else {
      res.status(404).send({ message: 'Blog Not Found' });
    }
  })
);

apiRouter.get('/check-resi',
  expressAsyncHandler(async (req, res) => {
    var options = {
      method: 'GET',
      url: `https://api.binderbyte.com/v1/track?api_key=${binderbyte_Key}&courier=${req.query.kurir}&awb=${req.query.resi}`,
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.send(JSON.parse(body))
    });
  })
)

apiRouter.get('/province',
  expressAsyncHandler(async (req, res) => {
    var options = {
      method: 'GET',
      url: 'https://api.rajaongkir.com/starter/province',
      headers: {key: raja_ongkir_key}
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.send(JSON.parse(body))
    });
  })
)

apiRouter.get('/ongkir/city',
  expressAsyncHandler(async (req, res) => {
    var options = {
      method: 'GET',
      url: 'https://api.rajaongkir.com/starter/city',
      headers: {key: raja_ongkir_key}
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.send(JSON.parse(body))
    });
  })
)

apiRouter.get('/ongkir/city/:id',
  expressAsyncHandler(async (req, res) => {
    var options = {
      method: 'GET',
      url: 'https://api.rajaongkir.com/starter/city',
      qs: {province: req.params.id},
      headers: {key: raja_ongkir_key}
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.send(JSON.parse(body))
    });
  })
)

apiRouter.get('/ongkir/province',
  expressAsyncHandler(async (req, res) => {
    var options = {
      method: 'GET',
      url: 'https://api.rajaongkir.com/starter/province',
      headers: {key: raja_ongkir_key}
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.send(JSON.parse(body))
    });
  })
)

apiRouter.get('/ongkir/:id/:weight',
  expressAsyncHandler(async (req, res) => {
    var options = {
      method: 'POST',
      url: 'https://api.rajaongkir.com/starter/cost',
      headers: {key: raja_ongkir_key, 'content-type': 'application/x-www-form-urlencoded'},
      form: {origin: '419', destination: req.params.id, weight: req.params.weight, courier: 'jne'}
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.send(JSON.parse(body))
    });
  })
)

apiRouter.post('/ongkir/costs',
  expressAsyncHandler(async (req, res) => {
    var options = {
      method: 'POST',
      url: 'https://api.rajaongkir.com/starter/cost',
      headers: {key: raja_ongkir_key, 'content-type': 'application/x-www-form-urlencoded'},
      form: {origin: req.body.origin, destination: req.body.destination, weight: req.body.weight, courier: req.body.courier}
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      res.send(JSON.parse(body))
    });
  })
)

apiRouter.post(
  '/shorten',
  expressAsyncHandler(async (req, res) => {
    const {longUrl} = req.body;
    const urlCode = shortid.generate()
    if(validUrl.isUri(longUrl)){
      try {
        let url = await Url.findOne({longUrl})
        if(url){
          res.json(url)
        }else {
          const shortUrl = 'http://www.nuxt.my.id/s/'+ urlCode;

          url = new Url({
            longUrl,
            shortUrl,
            urlCode,
            date: new Date()
          })

          await url.save()

          res.json(url)
        }
      } catch(err){
        console.log(err)
        res.status(500).json('server error')
      }
    } else {
      res.status(401).json('Invalid long url')
    }
  })
);

apiRouter.get(
  '/cuaca',
  expressAsyncHandler(async (req, res) => {
    console.log('req cuaca', req.query, 'weatherbit_key', weatherbit_key)
    const key = weatherbit_key || `input_key`
    const lang = req.query.lang || `en`
    const lat = req.query.lat || `-7.663640`
    const long = req.query.long || `111.324669`
    const city = req.query.city || 'Sleman'
    const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${key}&lang=${lang}`
    const result = await axios.get(url);
    res.send(result.data);
  })
);

// export default apiRouter;
module.exports = apiRouter
