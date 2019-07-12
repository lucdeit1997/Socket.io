<article class="markdown-body entry-content p-5" itemprop="text"><h2><a id="user-content-emit-với-socketserver--api-server" class="anchor" aria-hidden="true" href="#emit-với-socketserver--api-server"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Emit với SocketServer | API SERVER</h2>
<h2><a id="user-content-emit-cheatsheet" class="anchor" aria-hidden="true" href="#emit-cheatsheet"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Emit cheatsheet</h2>
<div class="highlight highlight-source-js"><pre><span class="pl-smi">io</span>.<span class="pl-en">on</span>(<span class="pl-s"><span class="pl-pds">'</span>connect<span class="pl-pds">'</span></span>, onConnect);

<span class="pl-k">function</span> <span class="pl-en">onConnect</span>(<span class="pl-smi">socket</span>){

  <span class="pl-c"><span class="pl-c">//</span> gửi đến 1 client</span>
  <span class="pl-smi">socket</span>.<span class="pl-en">emit</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>can you hear me?<span class="pl-pds">'</span></span>, <span class="pl-c1">1</span>, <span class="pl-c1">2</span>, <span class="pl-s"><span class="pl-pds">'</span>abc<span class="pl-pds">'</span></span>);

  <span class="pl-c"><span class="pl-c">//</span> gửi cho tất cả mọi người | ngoại trừ người gửi</span>
  <span class="pl-smi">socket</span>.<span class="pl-smi">broadcast</span>.<span class="pl-en">emit</span>(<span class="pl-s"><span class="pl-pds">'</span>broadcast<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>hello friends!<span class="pl-pds">'</span></span>);

  <span class="pl-c"><span class="pl-c">//</span> gửi cho tất cả mọi người trong 1 room | trừ người gửi</span>
  <span class="pl-smi">socket</span>.<span class="pl-en">to</span>(<span class="pl-s"><span class="pl-pds">'</span>game<span class="pl-pds">'</span></span>).<span class="pl-en">emit</span>(<span class="pl-s"><span class="pl-pds">'</span>nice game<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">"</span>let's play a game<span class="pl-pds">"</span></span>);

  <span class="pl-c"><span class="pl-c">//</span> gửi cho tất cả mọi người trong room game1 vs game2 | trừ người gửi</span>
  <span class="pl-smi">socket</span>.<span class="pl-en">to</span>(<span class="pl-s"><span class="pl-pds">'</span>game1<span class="pl-pds">'</span></span>).<span class="pl-en">to</span>(<span class="pl-s"><span class="pl-pds">'</span>game2<span class="pl-pds">'</span></span>).<span class="pl-en">emit</span>(<span class="pl-s"><span class="pl-pds">'</span>nice game<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">"</span>let's play a game (too)<span class="pl-pds">"</span></span>);

  <span class="pl-c"><span class="pl-c">//</span> gửi cho tất cả mọi người trong 1 room | chứa luôn người gửi</span>
  <span class="pl-smi">io</span>.<span class="pl-en">in</span>(<span class="pl-s"><span class="pl-pds">'</span>game<span class="pl-pds">'</span></span>).<span class="pl-en">emit</span>(<span class="pl-s"><span class="pl-pds">'</span>big-announcement<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>the game will start soon<span class="pl-pds">'</span></span>);

 <span class="pl-c"><span class="pl-c">//</span> gửi cho tất cả mọi người trong 1 namespace | chứa luôn người gửi</span>
  <span class="pl-smi">io</span>.<span class="pl-en">of</span>(<span class="pl-s"><span class="pl-pds">'</span>myNamespace<span class="pl-pds">'</span></span>).<span class="pl-en">emit</span>(<span class="pl-s"><span class="pl-pds">'</span>bigger-announcement<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>the tournament will start soon<span class="pl-pds">'</span></span>);

  <span class="pl-c"><span class="pl-c">//</span> gửi cho tất cả mọi người trong 1 room và room thuộc 1 namespace | chứa luôn người gửi</span>
  <span class="pl-smi">io</span>.<span class="pl-en">of</span>(<span class="pl-s"><span class="pl-pds">'</span>myNamespace<span class="pl-pds">'</span></span>).<span class="pl-en">to</span>(<span class="pl-s"><span class="pl-pds">'</span>room<span class="pl-pds">'</span></span>).<span class="pl-en">emit</span>(<span class="pl-s"><span class="pl-pds">'</span>event<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>message<span class="pl-pds">'</span></span>);

  <span class="pl-c"><span class="pl-c">//</span> gửi đến 1 user(socketID)</span>
  <span class="pl-smi">io</span>.<span class="pl-en">to</span>(<span class="pl-k">&lt;</span>socketid<span class="pl-k">&gt;</span>).<span class="pl-en">emit</span>(<span class="pl-s"><span class="pl-pds">'</span>hey<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>I just met you<span class="pl-pds">'</span></span>);

  <span class="pl-c"><span class="pl-c">//</span> sending with acknowledgement</span>
  <span class="pl-smi">socket</span>.<span class="pl-en">emit</span>(<span class="pl-s"><span class="pl-pds">'</span>question<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>do you think so?<span class="pl-pds">'</span></span>, <span class="pl-k">function</span> (<span class="pl-smi">answer</span>) {});

  <span class="pl-c"><span class="pl-c">//</span> sending without compression</span>
  <span class="pl-smi">socket</span>.<span class="pl-en">compress</span>(<span class="pl-c1">false</span>).<span class="pl-en">emit</span>(<span class="pl-s"><span class="pl-pds">'</span>uncompressed<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">"</span>that's rough<span class="pl-pds">"</span></span>);

  <span class="pl-c"><span class="pl-c">//</span> gửi một tin nhắn có thể bị xóa nếu máy khách(client=socketID) chưa sẵn sàng nhận tin nhắn</span>
  <span class="pl-smi">socket</span>.<span class="pl-smi">volatile</span>.<span class="pl-en">emit</span>(<span class="pl-s"><span class="pl-pds">'</span>maybe<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>do you really need it?<span class="pl-pds">'</span></span>);

  <span class="pl-c"><span class="pl-c">//</span> Xác định liệu dữ liệu để gửi có dữ liệu nhị phân hay không</span>
  <span class="pl-smi">socket</span>.<span class="pl-en">binary</span>(<span class="pl-c1">false</span>).<span class="pl-en">emit</span>(<span class="pl-s"><span class="pl-pds">'</span>what<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>I have no binaries!<span class="pl-pds">'</span></span>);

  <span class="pl-c"><span class="pl-c">//</span> gửi cho tất cả các máy khách trên nút này (khi sử dụng nhiều nút)</span>
  <span class="pl-smi">io</span>.<span class="pl-smi">local</span>.<span class="pl-en">emit</span>(<span class="pl-s"><span class="pl-pds">'</span>hi<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>my lovely babies<span class="pl-pds">'</span></span>);

  <span class="pl-c"><span class="pl-c">//</span> gửi cho tất cả client đã kết nối</span>
  <span class="pl-smi">io</span>.<span class="pl-en">emit</span>(<span class="pl-s"><span class="pl-pds">'</span>an event sent to all connected clients<span class="pl-pds">'</span></span>);
  <br/>
  <span class="pl-c"><span class="pl-c">-</span> lấy socket it client = socket.io.engine.id</span>

};
</pre></div>
<p><strong>Note:</strong> Các sự kiện sau được dành riêng và không nên được sử dụng làm tên sự kiện theo ứng dụng của bạn:</p>
<ul>
<li><code>error</code></li>
<li><code>connect</code></li>
<li><code>disconnect</code></li>
<li><code>disconnecting</code></li>
<li><code>newListener</code></li>
<li><code>removeListener</code></li>
<li><code>ping</code></li>
<li><code>pong</code></li>
</ul>
<p><strong>SERVER API</strong></p>
<ul>
<li><a href="https://github.com/socketio/socket.io/blob/master/docs/API.md#new-serverhttpserver-options">https://github.com/socketio/socket.io/blob/master/docs/API.md#new-serverhttpserver-options</a></li>
</ul>
<p><strong>CLIENT API</strong></p>
<ul>
<li><a href="https://github.com/socketio/socket.io-client/blob/master/docs/API.md">https://github.com/socketio/socket.io-client/blob/master/docs/API.md</a></li>
</ul>
</article>
