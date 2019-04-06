const uuid = require('uuid');


const fs = require('fs');
const http = require('http');
const path = require('path');
const os = require('os');
const url = require('url');


const server = http.createServer((req,res)=>{
    console.log(req.url);
    // let cut = req.url.split('/');
    // console.log(cut);
    if(req.url === '/' || req.url ==='/Home.html'){
        fs.readFile(path.join(__dirname,'Html','Home.html'),(err,content) => {
            if(err) throw err;
            res.writeHead(200, { 'content-type': 'text/html'});
            res.end(content);
        });
    }else if(req.url === '/gallery' || req.url ==='/Gallery.html'){
        
        fs.readFile(path.join(__dirname,'Html','Gallery.html'),(err,content) => {
            if(err) throw err;
            res.writeHead(200, { 'content-type': 'text/html'});
            res.end(content);
        }); 
    }
    else if (req.url.split('/')[1] === 'Image') {
        let file = req.url.split('/')[2]
        fs.readFile(path.join(__dirname, 'Html', 'Image', file), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'content-type': 'image/jpg' });
            res.end(content);
        })

    }
    else if(req.url === '/contact' || req.url ==='/Content.html'){
        
        fs.readFile(path.join(__dirname,'Html','Content.html'),(err,content) => {
            if(err) throw err;
            res.writeHead(200, { 'content-type': 'text/html'});
            res.end(content);
        });
    }else if(req.url === '/About_us.html'){
        
        fs.readFile(path.join(__dirname,'Html','About_us.html'),(err,content) => {
            if(err) throw err;
            res.writeHead(200, { 'content-type': 'text/html'});
            res.end(content);
        });
    }
    else{
        // res.writeHead(404, { 'content-type': 'text/html'});
        // res.end('<h3>Error 404: Not Found</h3>')
        fs.readFile(path.join(__dirname,'Html','404.html'),(err,content) => {
            if(err) throw err;
            res.writeHead(404, { 'content-type': 'text/html'});
            res.end(content);
        });
    }

});

const PORT = process.env.PORT || 5000; 
server.listen(PORT, () =>{
    console.log('Server is running on port: ' + PORT);
});