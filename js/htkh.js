function openChat(){

let chat=document.getElementById("chatBox")
chat.style.display="flex"

let body=document.getElementById("chatBody")

if(body.innerHTML===""){

setTimeout(()=>{
bot("Xin chào 👋")
},500)

setTimeout(()=>{
bot("MPO rất vui được hỗ trợ bạn.")
},1200)

setTimeout(()=>{
bot("Bạn cần tư vấn sản phẩm hay hỗ trợ đơn hàng ạ?")
},2000)

}

}

function closeChat(){
document.getElementById("chatBox").style.display="none"
}

function bot(text){

let body=document.getElementById("chatBody")

let msg=document.createElement("div")
msg.className="message bot"
msg.innerText=text

body.appendChild(msg)
body.scrollTop=body.scrollHeight

}

function sendMessage(){

let input=document.getElementById("userInput")
let text=input.value.trim()

if(text==="") return

let body=document.getElementById("chatBody")

let msg=document.createElement("div")
msg.className="message user"
msg.innerText=text

body.appendChild(msg)

input.value=""

body.scrollTop=body.scrollHeight

setTimeout(()=>{
bot("Nhân viên sẽ phản hồi bạn trong ít phút ⏳")
},1000)

}