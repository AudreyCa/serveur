const express = require("express");
const cors = require("cors");
const fs = require("fs")


// chemin des router
const routerUser = require('./routes/users/user.router')
const routerList = require('./routes/listes/list.router') 
const routerDetail = require('./routes/details/detail.router') 

const app = express();
const port = 8080


// middleware
app.use(cors())
app.use(express.json()); //req.body
//urlencoded :
app.use(express.urlencoded({extended: false}));


// mobilisation des routers
app.use(routerUser, routerList, routerDetail)





// Middleware pour gérer la page de contact
app.post('/contact', (req, res) => {
  
  try {

    // Données du formulaire 
    const { user_name, user_email, user_message } = req.body;
    
     // On récupère les données du formulaire
    const formContactMsg = { nom: user_name, email : user_email, message: user_message }
  
    // Puis on les convertis en JSON
    const formContactMsgJSON = JSON.stringify(formContactMsg);
  
    // Puis on stocke les données du formulaire dans un fichier JSON
    fs.writeFileSync('formMsgContact.json', formContactMsgJSON);
    
    // Le code ici permet d'envoyer l'email 
    return res.json(formContactMsgJSON)



    //     const formContactMsg = { nom: user_name, email : user_email, message: user_message }
  
    // Utiliser la méthode fs.readFileSync() pour lire le fichier JSON :
    // const formContactMsgAdd = fs.readFileSync('formMsgContact.json');

    // Utiliser la méthode JSON.parse() pour convertir le contenu du fichier en objet JavaScript :
    // const dataContact = JSON.parse(formContactMsgAdd)

    //  Ajouter de nouvelles données à l'objet :
    // dataContact.newField = formContactMsg;

    // Utiliser la méthode JSON.stringify() pour convertir l'objet en chaîne de caractères JSON :
    // const newData = JSON.stringify(dataContact);

    // Utiliser la méthode fs.writeFileSync() pour écrire la chaîne de caractères JSON dans le fichier :
    // fs.writeFileSync('formMsgContact.json', newData)
  
    // // Puis on stocke les données du formulaire dans un fichier JSON
    // fs.writeFileSync('formMsgContact.json', newData);
  
  
  } catch (err) {
      console.error(err.message);
      return res.status(400).json('Une erreur s\'est produite');
  }
});










app.listen(port, () => {
    console.log(`L'application est lancée sur le port : ${port}`);
  });