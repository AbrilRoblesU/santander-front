// app.js

// Con document podemos encontrar todo elemento que viva en la interfaz
// .signup-form --> Lleva el punto porque es una clase la que busca
const forms = document.querySelectorAll(".signup-form");
// console.log(forms);

// Si no se declara como let, es var por default y la variable sigue
// existiendo después del for
// for( let i = 0; i < forms.length; i++) {
//     console.log(forms[i]);
// }


const getTemplate = () => {
  return fetch("./template.html")
    .then((response) => response.text());
};

const sendEmailToApi = (address, template) => {
  fetch(`https://bedu-email-sender-api.herokuapp.com/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: address,
      template: template,
    }),
  })
    .then((results) => {
      console.log(results);
      document.getElementById("email").value = ""
      alert("E-mail send!!!")
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("email").value = ""
      alert("Send failed")
    });
};

// => arrow function
const sendEmail = (event) => {
  event.preventDefault();
  const email = event.target.querySelector("input").value;
  // Funcion asincrona (permite uso de then y catch)
  getTemplate()
    .then((template) => {
      sendEmailToApi(email, template);
    })
    .catch((error) => {
      console.log(error, "Error al convertir el template.");
    });
};

for (let i = 0; i < forms.length; i++) {
  forms[i].addEventListener("submit", sendEmail);
}