var containers = document.getElementsByClassName('terminaljs'),
	socket = io('http://127.0.0.1:3000/pty'), term, stream;

ss.forceBase64 = true;

for(var i = 0; i < containers.length; i++) {
	containers[i].tabindex = 0;
	term = new Terminal(containers[i].dataset);
	stream = ss.createStream({decodeStrings: false, encoding: 'utf-8'});
	ss(socket).emit('new', stream, containers[i].dataset);
	
	if(containers[i].dataset.exec)
		stream.write(containers[i].dataset.exec + "\n");

	stream.pipe(term).dom(containers[i]).pipe(stream);
}
