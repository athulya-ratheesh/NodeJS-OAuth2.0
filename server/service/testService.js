module.exports = {
	helloWorld: helloWorld,
};

function helloWorld(req, res) {
	console.log("req,,..", req.body)
	res.send("Hello World OAuth2!");
}
