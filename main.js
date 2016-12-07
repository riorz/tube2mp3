//import module
const ytdl = require('ytdl-core');
const fs = require('fs');
const exec = require('child_process').exec;
const dlStream = fs.createWriteStream('temp.flv');

var vid = ( process.argv[2] != null )? process.argv[2] : null ;
var destinationFile = 'test.mp3';

//convert to mp3 using ffmpeg
var flv2mp3 = 'ffmpeg -y -i temp.flv -vn -acodec libmp3lame -ac 2 -ab 192000 -ar 44100 -threads 4 -f mp3 ' + destinationFile;

// download file.
if( vid !== null ){
    ytdl("http://youtube.com/watch?v="+vid)
        .pipe(dlStream);
    //convert file while download over.
    dlStream.on('finish',()=>{
        console.log('download over');
        exec( flv2mp3, (err,stdout,stderr)=>{
            if(err) throw err;
            else console.log('conver complete.');
        });
    });
}