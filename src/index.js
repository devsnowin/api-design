import http from 'http'

const server = http.createServer(async (req, res) => {
    if(req.method === 'GET' && req.url === '/'){
        res.statusCode(200)
        res.end('Hello')
    }
})

server.listen(3000, () => console.log(`Server started at https://im-snowin-fluffy-potato-xx67grj956936j67.github.dev:3000`));
