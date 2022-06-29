const axios = require('axios');
const images = [];

axios.get('https://jsonplaceholder.typicode.com/albums/1/photos')
.then(response => {
    const data =  response.data;
    data.forEach(element => {
        const image = element;
        images.push({
            image
        });
    });
});


exports.ImagesId = (req, res) => {
    // #swagger.tags = ['Images']
    const image = images.find(c => c.image.id === parseInt(req.params.id));
    if (!image) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... No podemos encontrar lo que buscabas!</h2>');
    res.send(image);
}

exports.ImagesAll = (req,res)=> {
    // #swagger.tags = ['Images']
    res.send(images);
}