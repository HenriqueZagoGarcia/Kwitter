//Adicione seus links firebase
const firebaseConfig = {
  apiKey: "AIzaSyDwbX13o_HW25ltWrsfuNLN_xXrLM46xTg",
  authDomain: "kwitter-d9915.firebaseapp.com",
  databaseURL: "https://kwitter-d9915-default-rtdb.firebaseio.com",
  projectId: "kwitter-d9915",
  storageBucket: "kwitter-d9915.appspot.com",
  messagingSenderId: "1005208907518",
  appId: "1:1005208907518:web:7644502508f4d0f34f7faf"
};

//Adicione a inicialização do firebase
firebase.initializeApp(firebaseConfig);


  userName = localStorage.getItem("userName"); /* Armazenar o valor do localStorage "userName" dentro da variável */

document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";

function addRoom() /* Adicione a função addRoom */
{
  roomName = document.getElementById("roomName").value; /* Armazenar o nome da sala "roomName" dentro da variável */

  firebase.database().ref("/").child(roomName).update /* Adicionar o nome da sala no firebase. */
  ({ 
    purpose : "adicionar nome de sala" /* Adicione o valor "adicionar nome de sala" para a chave purpose. */
  });

    localStorage.setItem("roomName", roomName); /* Adicionar o nome da sala no localStorage. */
    
    window.location = "kwitterPage.html"; /* redirecionar para a tela kwitterPage.html */
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) /* Explicação: as linhas 25, 26, 27 e 28 obtém todos os dados do firebase para conter os nomes das salas.*/
       { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) 
          { childKey = childSnapshot.key;
             roomNames = childKey; /* Adicionar a variável roomNames que contém todos os nomes das salas vindas do firebase. */

       console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>"; /* Explicação: O row(fileira) é uma variável que define a área de texto dentro da coluna do console, pois para cada navegador pode ser diferente, então o row padroniza. */
      /* Importante: O redirectToRoomName é uma função para que quando o nome da sala for pressionado, entraremos naquela sala.*/

      document.getElementById("output").innerHTML += row; /* Chamar o id output */
      /* Importante: Se apenas escrevermos "=" apenas o nome da sala será exibido. No entanto, quando temos muitos nomes
        de salas, e queremos exibir todos dentro de um único elemento HTML, utilizamos "+="" e em seguida escrevemos a variável row para enfileirar. */
    });
  });

}

getData();

function redirectToRoomName(name) /* Adicionar a função redirectToRoomName  */
{
  console.log(name); 
  localStorage.setItem("roomName", name); /* Adicione o roomName (nome da sala) ao localStorage. */
  window.location = "kwitterPage.html"; /* redirecionar para a tela kwitterPage.html */
}

function logout() /* Adicione a função logout para saírmos da sala. */
{
  localStorage.removeItem("userName"); /* Adicione o userName para ser removido */
  localStorage.removeItem("roomName"); /* Adicione o roomName para ser removido */
  window.location = "index.html"; /* redirecionar para a tela index.html */
}
