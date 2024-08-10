//LINKS FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyDwbX13o_HW25ltWrsfuNLN_xXrLM46xTg",
  authDomain: "kwitter-d9915.firebaseapp.com",
  databaseURL: "https://kwitter-d9915-default-rtdb.firebaseio.com",
  projectId: "kwitter-d9915",
  storageBucket: "kwitter-d9915.appspot.com",
  messagingSenderId: "1005208907518",
  appId: "1:1005208907518:web:7644502508f4d0f34f7faf"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

userName = localStorage.getItem("userName"); /* Adicionar o nome do usuário "userName" */
roomName = localStorage.getItem("roomName"); /* Adicionar o nome da sala "roomName" */

function send() /* Adicionar a função send */
{
  msg = document.getElementById("msg").value; /* Adicione uma mensagem À sala selecionada com o msg */
  firebase.database().ref(roomName).push({
    name:userName, /* Adicione a variável userName que contém o nome do usuário. Name é a chave e userName o valor. */
    message:msg, /* Adicione a variável msg que contém a mensagem. Message é a chave e msg o valor. */
    like:0  /* Adicione 0 como valor inicial para a chave like */
   });

  document.getElementById("msg").value = ""; /* Explicação: o valor da input box das mensagens fica vazio, para que novas mensagens sejam escritas. */
}
/* Aula 96 termina aqui */

/* Inicio da aula 97 */
function getData() /* Chamar a função getData */
          { firebase.database().ref("/"+roomName).on('value', function(snapshot) 
            { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) 
               { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") 
               {
         firebaseMessageId = childKey; /* Escreva a variável firebaseMessageId para conter todas as Ids únicas, das mensagens, geradas pelo firebase */
         messageData = childData; /* Escreva a variável messageData para conter todas as mensagens, likes e nomes de usuário para todas as mensagens */
//Início do código
          console.log(firebaseMessageId); /* Escreva a variável firebaseMessageId para ser verificada no console */
          console.log(messageData); /* Escreva a variável messageData para ser verificada no console */

          nome = messageData['name']; /* Escreva a chave 'name' que irá buscar o valore do nome */ 
          message = messageData['message']; /* Escreva a chave 'message' que irá buscar o valore da mensagem */ 
          like = messageData['like'];  /* Escreva a chave 'like' que irá buscar o número de likes para a mensagem */

          nameWithTag = "<h4> "+ nome +"<img class='user_tick' src='tick.png'></h4>";
          messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
          like_button ="<button class='btn btn-warning' id="+firebaseMessageId+" value="+like+" onclick='updateLike(this.id)'>";
          spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

        row = nameWithTag + messageWithTag + like_button + spanWithTag; /* Coloque todas as variáveis acima dentro da variável row */      
        document.getElementById("output").innerHTML += row; /* Chamar o id output */

//Fim do código
      } });  }); }
getData();

function updateLike(messageId) /* Chamar a função updateLike. *Importante: o messageId é a identificação única da mensagem no banco de dados. */
{
  console.log("botão de like pressionado - " + messageId);
	buttonId = messageId; /* Atribua o valor messageId a nova variável buttonId */
	likes = document.getElementById(buttonId).value; /* Chamar a variável buttonId */
	updatedLikes = Number(likes) + 1; /* Incrementar em + 1 o número de likes e armazenar na variável updatedLikes. */
	console.log(updatedLikes); /* Adicionar a variável updatedLikes que armazena o valor de likes incrementado */

	firebase.database().ref(roomName).child(messageId).update({ /* Chamar o roomName para a ref e o messageId para o child */
		like : updatedLikes /* Chamar a variável updatedLikes (que é o valor incrementade de like) na chave like. */ 
	 });

}
/* Adicionar a função logout que será a mesma presente no arquivo kwitterRomm.js */
function logout() 
{
  localStorage.removeItem("userName"); /* Adicione o userName para ser removido */
  localStorage.removeItem("roomName"); /* Adicione o roomName para ser removido */
  window.location = "index.html"; /* redirecionar para a tela index.html */
}
