const http = require('http'),
    fs = require('fs'),
    url = require('url');

http.createServer((request, response) => {
    let addr = request.url,
        q = url.parse(addr, true),
        filePath = '';

    fs.appendFile('log.txt', 'URL: ' + addr +'\nTimestamp: ' + new Date() + '\n\n', (err) => {
        if (err){
            console.log(err);
        } else {
            console.log('Added to log.');
        }
    });

    //checks the requested URL, directs accordingly
    if (q.pathname.includes('documentation')) {
        filePath = ('../movie_api/' + '/documentation.html');
    } else {
        filePath = 'index.html';
    }
    
    fs.readFile(filePath, (err, data) => {
        if(err) {
            throw err;
        }

        //why is the below response. written within the fs module?
        response.writeHead(200, {'Content-type': 'text/html'});
        response.write(data);
        response.end();

    });


}).listen(8080);
console.log('My first Node test server is running on Port 8080.');

