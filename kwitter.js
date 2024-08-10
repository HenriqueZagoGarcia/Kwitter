
function addUser() /* Chamar a função addUser */
{

  /* Obtenha o nome do usuário da input box "userName" e armazene dentro de uma variável. */
  userName = document.getElementById("userName").value;

  /* Armazene localmente o nome do usuário */
  localStorage.setItem("userName", userName);

  /* Escreva o nome da página para onde seremos redirecionados. */
  window.location="KwitterRoom.html";
}

