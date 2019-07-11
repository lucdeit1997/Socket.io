const express = require('express');
const app     = express();
const server  = require('http').Server(app);
const io      = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));
app.get('/', (req, res) => {
    res.render('chat');
})

let users = [];

//mo connect cho client connect
io.on('connection', socket => {
    const { id: socketID } = socket;
    //lang nghe su kien o client goi len
    socket.on('LOGIN_REQUEST', username => {
        let indexUser = users.findIndex(user => user.username == username);
        if(indexUser >= 0 || !username) return socket.emit('LOGIN_RESP', {});
        const user = { username, socketID };
        socket.username = username;
        //goi den client
        socket.emit('LOGIN_RESP', { users, socketID, username });
        users.push(user);
        //goi den tac ca client tu nguoi goi
        socket.broadcast.emit("NEW_USER", user);
    })
    //lang nghe su kien tu client goi len 
    socket.on('SEND_MESSAGE_CSS', message => {
        let { username, id: socketID } = socket;
        //goi cho tat ca cac client 
        io.emit('MESSAGE_SENDED', { message, username , socketID});
    })

    socket.on('disconnect', massage => {
       const { username } = socket;
       let indexUser = users.findIndex(user => user.username == username );
       users.splice(indexUser, 1);
       io.emit('USER_LOGOUT',  username );
       console.log({ users })
    })

    socket.on('INPUTING_CSS', () =>{
        const { username } = socket;
        socket.broadcast.emit("INPUTING_SSC", username);
    })

    socket.on('NOT_INPUTING_CSS', () =>{
        socket.broadcast.emit("NOT_INPUTING_SSC");
    })

})

server.listen(3000, ()=>{
    console.log('server start port 3000');
})