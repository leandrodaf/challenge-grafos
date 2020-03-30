const {uploadFile} = require('./app/Services/UploadFileflight');

const app = require('./app');

if (process.argv[2]) uploadFile(process.argv[2]);

app.listen(3000);

console.log('server started in port 3000');