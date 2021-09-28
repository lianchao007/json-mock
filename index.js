const Koa = require('koa')
const url = require('url')
const fs = require('fs')
const mime = require('mime-types')
const app = new Koa()
app.use(async ctx => {
	let MyUrl = url.parse(ctx.request.url)
	let src = '.' + MyUrl.pathname
	let data = '未找到文件'
	try {
		data = fs.readFileSync(src + '.json')
		data = data.toString()
	} catch(e) {
		try {
		data = fs.readFileSync(src + '.txt')
		data = data.toString()
		} catch(err) {
			try {
				data = fs.readFileSync(src)
				let mimeType = mime.lookup(src)
				console.log(mimeType)
				ctx.set('content-type', mimeType)
			} catch(error) {}
		}
	}
	ctx.body = data
	
})

app.listen(3000)