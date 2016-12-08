//import module
const ytdl = require('ytdl-core');
const fs = require('fs');
const exec = require('child_process').exec;

var vid = ( process.argv[2] != null )? process.argv[2] : null ;
//convert to mp3 using ffmpeg
var flv2mp3 = `ffmpeg -y -i temp.flv -acodec libmp3lame -ac 2 -ab 192000 -ar 44100 -threads 4 -f mp3 `;

// download file if there is a vid.
if( vid !== null ){
    var dlStream = fs.createWriteStream('temp.flv');

    ytdl("http://youtube.com/watch?v="+vid, {filter: 'audioonly'})
        .on('info', (info,format)=>{ flv2mp3 += ` '${info.title}.mp3'`;})
        .pipe(dlStream)
        .on('finish',()=>{
            console.log('download over');
            //execute ffmpeg command
            exec( flv2mp3, (err,stdout,stderr)=>{
                if(err) throw err;
                else console.log('convert file completed.');
                })
                .on('exit',()=>{    //remove temporary file while file is converted.
                    fs.unlink('./temp.flv',(err)=>{ if(err) throw err;});
                });
        });
}