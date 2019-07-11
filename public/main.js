const socket = io('http://localhost:3000');
let socketSelf = null;
socket.on('connect', () => {

    socket.emit('LOGIN_REQUEST', prompt('USERNAME ENTER:'));

    socket.on('LOGIN_RESP', data =>{
        let { users , socketID, username } = data;
        socketSelf = socketID;
        console.log({ users })
        if(!users){
            alert('USERNAME_EXISTED');
        }else{
            users.forEach(user => {
                $('#listUser').append(`
                    <li id="user_${user.username}">
                        <a href="javascript:void(0)"><img src="plugins/images/users/varun.jpg" alt="user-img" class="img-circle"> <span>${user.username}<small class="text-success">online</small></span></a>
                    </li>
                `)
            });
        }
    })

    socket.on("NEW_USER", user => {
        $('#listUser').append(`
            <li id="user_${user.username}">
                <a href="javascript:void(0)"><img src="plugins/images/users/varun.jpg" alt="user-img" class="img-circle"> <span>${user.username}<small class="text-success">online</small></span></a>
            </li>
        `)
    })

    socket.on('MESSAGE_SENDED', content_msg => {
        if(socketSelf == content_msg.socketID){
            $("#containerContent").append(`
                <li class="odd">
                    <div class="chat-image"> <img alt="male" src="plugins/images/users/ritesh.jpg"> </div>
                    <div class="chat-body">
                        <div class="chat-text">
                            <h4>${ content_msg.username }</h4>
                            <p> ${ content_msg.message } </p> <b>10.00 am</b>
                        </div>
                    </div>
                </li>
            `)
        }else{
            $("#containerContent").append(`
                <li>
                    <div class="chat-image"> <img alt="male" src="plugins/images/users/ritesh.jpg"> </div>
                    <div class="chat-body">
                        <div class="chat-text">
                            <h4>${ content_msg.username }</h4>
                            <p> ${ content_msg.message } </p> <b>10.00 am</b> 
                        </div>
                    </div>
                </li>
            `)
        }
    })

    socket.on('USER_LOGOUT', username => {
        $(`#user_${username}`).remove();
        alert(`${username} LOGOUTED`)
    })

    socket.on('INPUTING_SSC', username =>{
        $('#inputing').empty();
        $('#inputing').append(` <span>${username} Đang nhập...</span>`);
    })
    socket.on('NOT_INPUTING_SSC', ()=>{
        $('#inputing').empty();
    })

    $(document).ready(function(){

        $('#txtMessage').on('keyup', function(event){
            socket.emit('INPUTING_CSS');
            if(event.keyCode === 13){
                $('#btnSend').click();
            }
        })

        $('#btnSend').click(function(){
            let msg = $('#txtMessage').val();
            socket.emit('SEND_MESSAGE_CSS', msg);
            $('#txtMessage').val("");
        })

        $('#txtMessage').on('focusout', function(){
            socket.emit('NOT_INPUTING_CSS');
        })

    })
})