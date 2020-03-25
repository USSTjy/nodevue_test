// 加载HTTP模块
var http = require('http');
// 加载URL模块
var url = require('url');
// 加载querystring模块
var querystring = require('querystring');
// 加载MySQL数据库模块
var mysql = require('mysql');

// 创建数据库连接
const db = mysql.createConnection({
	host:'localhost',
	user:'jytest',
	password:'jky12375',
});

// 连接方法
db.connect((err) =>{
	if (err) throw err;
	console.log('连接成功！')
})

// 创建HTTP请求
http.createServer(function (req, res) {
	//设置允许跨域的域名，*代表允许任意域名跨域
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");
  	// 发送状态值200,OK
  // 设置内容类型: text/html
  res.writeHead(200, 'OK', {
    'Content-Type': 'text/html'
  });
  
  var pathname = url.parse(req.url).pathname;
  if (pathname === '/register' && req.method == 'POST'){   // 注册页面数据

  	/**服务端接收post请求参数的流程
* （1）给req请求注册接收数据data事件（该方法会执行多次，需要我们手动累加二进制数据）
* * 如果表单数据量越多，则发送的次数越多，如果比较少，可能一次就发过来了
* * 所以接收表单数据的时候，需要通过监听 req 对象的 data 事件来取数据
* * 也就是说，每当收到一段表单提交过来的数据，req 的 data 事件就会被触发一次，同时通过回调函数可以拿到该 段 的数据
* （2）给req请求注册完成接收数据end事件（所有数据接收完成会执行一次该方法）
*/
    // 创建空字符叠加数据片段
    var data = "";
    var dataObj = {};
    // 注册data事件接收数据（每当收到一段表单提交的数据，该方法会执行一次）
    req.on('data', function(chunk){
    	// chunk 默认是一个二进制数据，和data拼接会自动toString
    	data += chunk;
	});
	// 当接收表单提交的数据完毕之后，就可以进一步处理了
	// 注册end事件，所有数据接收完成会执行一次该方法
	req.on('end', function(){
		// 此时data是字符串，需要JSON.parse对其进行转化为json对象
		dataObj = JSON.parse(data);

		// 数据库执行语句
	  	let usedatabase = "use nodevue"; // 使用数据库
	  	db.query(usedatabase,(err,result) => {
	  		if(err) {
			  	res.end('error');
	  		} else {
	  			console.log('resultmysql');
	//   			let usetable = `INSERT INTO logintable (loginname,loginpsd) SELECT ${dataObj.username},${dataObj.password} FROM logintable 
	// WHERE NOT EXISTS(SELECT * FROM logintable WHERE loginname = ${dataObj.username}) LIMIT 1`;

	let usetable = "INSERT INTO logintable (loginname,loginpsd) SELECT '" + dataObj.username + "'"+","+"'"+ dataObj.password+"'"+
	 "FROM logintable WHERE NOT EXISTS(SELECT * FROM logintable WHERE loginname = '" + dataObj.username + "') LIMIT 1";
				// console.log('dddddddd', usetable);

				db.query(usetable,(inserterr,insertresult) => {
			  		if(inserterr) {
					  	res.end('insert error');
			  		} else {
			  			console.log('insert success');
			  			console.log('dddddddd', insertresult.affectedRows);
			  			let frontRes = {
			  				message: '',
			  				code: '',
			  			};
			  			if (insertresult.affectedRows === 0) {
			            // res.end(Obj)中Obj类型需要为字符串型或者buffer类型
				            frontRes.message = '该用户名已存在';
				            frontRes.code = '1';
				  	        res.end(JSON.stringify(frontRes));

			  			} else {
				  	        frontRes.message = '注册成功';
				            frontRes.code = '0';
				  	        res.end(JSON.stringify(frontRes));
			  			}
			  		}
			  	});
	  		}
	  	});


	});
  } else if (pathname === '/login' && req.method == 'POST'){  // 登录页面的数据
        // 创建空字符叠加数据片段
    var data = "";
    var dataObj = {};
    req.on('data', function(chunk){
    	data += chunk;
	});
	req.on('end', function(){
		dataObj = JSON.parse(data);
		// 数据库执行语句
	  	let usedatabase = "use nodevue"; // 使用数据库
	  	db.query(usedatabase,(err,result) => {
	  		if(err) {
			  	res.end('error');
	  		} else {
	  			let usetable = "SELECT * FROM logintable where loginname = '"+dataObj.username+ "' and loginpsd = '"+dataObj.password+"'";
				db.query(usetable,(inserterr,insertresult) => {
			  		if(inserterr) {
					  	res.end('insert error');
			  		} else {
			  			// console.log('insert success');
			  			console.log('dddddddd',insertresult, insertresult[0]);
			  			let frontRes = {
			  				message: '',
			  				data: {},
			  			};
			  			// res.end('login');
			  			if (insertresult.length !== 0) {
				            frontRes.message = '登录成功';
				            frontRes.data.username = insertresult[0].loginname;
				  	        res.end(JSON.stringify(frontRes));

			  			} else {
				  	        frontRes.message = '用户名或密码错误';
				  	        res.end(JSON.stringify(frontRes));
			  			}
			  		}
			  	});
	  		}
	  	});


	});

  } else {
    res.end('other');

  }

}).listen(9090);
