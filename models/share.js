var Post = require('../models/post.js');
var	User = require('../models/dbuser.js');
var Qrcode = require('qrcode');
//var markdown = require('markdown').markdown;
var SHARE_TO_WX = 0;
var SHARE_TO_WB = 1;
function Share(){

}

module.exports = Share;

function ShareToWX(url,callback){
					Qrcode.toDataURL(url, function(err,qrcodeimg){
						callback(err,qrcodeimg);
					});
}
function ShareToWB(url,calback){
					Qrcode.toDataURL(url, function(err,qrcodeimg){
						callback(err,qrcodeimg);
					});
}

function ShareToOtherPlatform(url, name, time, title, sharerid, sid, callback){
	var sharedurl;
	console.log(url);
	//GenSURL(name,time,title,sharerid,function(url){
	//	sharedurl = url;
	//});
	sharedurl = 'http://www.smartcreate.net' + url.substring(0, (url.length-2));
    //console.log(sharedurl);
	//console.log(sid);
	if(sid == SHARE_TO_WX){
		//console.log('share to wx!');
		ShareToWX(sharedurl,callback);
		return;
	}
	else if(sid == SHARE_TO_WB){
		//console.log('share to wb!');
		ShareToWB(sharedurl,callback);
		return;
	}
	else{
		console.log('can not find the way to share,please check...');
	}
	callback(1,sharedurl);
}


function GetSharedArticle(url, name, time, title, sharerid, callback){
	//get post
	var err;
	var urlshare = 'http://www.smartcreate.net/sendresumereq' + '/' + name + '/' + time + '/' + title + '/' + sharerid;
	console.log(urlshare);
	console.log(name);
	console.log(time);
	console.log(title);
	Post.getOne(name,time,title,function(err,doc){
		if(err){
			console.log('get failed')
			return callback(err);
		}
		Qrcode.toDataURL(urlshare, function(err,qrcodeimg){
			callback(err,doc,sharerid,qrcodeimg);
		});
	});

	
}
//share article
Share.prototype.setShare = ShareToOtherPlatform;
//get share article
Share.prototype.getShare = GetSharedArticle;