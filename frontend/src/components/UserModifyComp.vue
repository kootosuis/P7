<template>
    <section class = "container">
      <div class = "formSection">

          <div class="please" >
            <h2> Vous pouvez mettre à jour les données de votre compte </h2>
          </div>

          <div class = "formDiv">
                    <form     class="formulaire"
                              method="POST" 
                              name="form" 
                              id="form" 
                              
                              @submit = "modifySignup">
                             

                              <!--Le Nom-->
                              <div class="formLine">
                                        <label
                                                  for="UserName" 
                                                  class="label">Nom <span class="asterisque">*</span></label>
                                        <input    class="input"
                                                  v-model="UserName" 
                                                  @input = "checkForm"    
                                                  type="text" 
                                                  placeholder="Entrez votre nom." 
                                                  id="UserName" 
                                                  name="UserName" 
                                                  required="required">
                              </div>
                              <!--Le Prénom-->
                              <div class="formLine">
                                        <label 
                                                  for="UserFirstname" 
                                                  class="label">Prénom <span class="asterisque">*</span></label>
                                        <input    class="input"
                                                  v-model="UserFirstname" 
                                                  @input = "checkForm"  
                                                  type="text" 
                                                  placeholder="Entrez votre prénom." 
                                                  id="UserFirstname" 
                                                  name="UserFirstname" 
                                                  required="required">
                              </div>
                              <!--L'Email'-->
                               <div class="formLine">
                                        <label    
                                                  for="UserEmail" 
                                                  class="label">Email <span class="asterisque">*</span></label>
                                        <input    class="input"
                                                  v-model="UserEmail" 
                                                  @input = "checkForm"    
                                                  type="email" 
                                                  placeholder="Entrez une adresse mail valide." 
                                                  id="UserEmail"
                                                  name="UserEmail" 
                                                  required="">
                              </div>
                              <!--La Présentation-->
                              <div class="formLine">
                                        <label 
                                                  for="UserPresentation" 
                                                  class="label">Présentation</label>
                                        <textarea   class="smalltextarea input"
                                                  v-model="UserPresentation" 
                                                  type="textarea"
                                                  placeholder="Si vous le souhaitez, vous pouvez vous présenter..." 
                                                  id="UserPresentation" 
                                                  name="UserPresentation" 
                                                  ></textarea>
                              </div>
                              <!--Le Service-->
                              <div class="formLine">
                                        <label 
                                                  for="UserDepartement" 
                                                  class="label">Service <span class="asterisque">*</span></label>
                                        <div     
                                                  class="input">
                                                  <select 
                                                            id="UserDepartement" 
                                                            name="UserDepartement"
                                                      
                                                            v-model="UserDepartement"  
                                                        
                                                            required="required">
                                                                      <option value="...">...</option>
                                                                      <option value="communication">communication</option>
                                                                      <option value="administration">administration</option>
                                                                      <option value="siège">siège</option>
                                                                      <option value="R&amp;D">R&amp;D</option>
                                                                      <option value="magasin 1">magasin 1</option>
                                                                      <option value="magasin 2">magasin 2</option>
                                                                      <option value="etc.">etc.</option>
                                                            </select>

                                        </div>
                              </div>
                              <!--Le Role-->
                              <div class="formLine">
                                        <label    
                                        for="UserRole" 
                                                  class="label">Rôle</label>
                                        <textarea    class="smalltextarea input"
                                                  v-model="UserRole" 
                                                  type="textarea" 
                                                  placeholder="Quel est votre rôle dans l'entreprise ?" 
                                                  id="UserRole" 
                                                  name="UserRole"></textarea>
                              </div>

                              <!--Le Mot de passe -->
                              <!-- il serait vraisemblablement utile de proposer un bouton pour faire apparaitre la possibilité de changer le mot de passe -->
                              <!-- <div class="formLine">
                                        <label    
                                                  for="UserPassword" 
                                                  class="label">Mot de passe <span class="asterisque">*</span></label>
                                        <input    class="input"
                                                  v-model="UserPassword" 
                                                  @input = "checkForm"    
                                                  type="text" 
                                                  placeholder= "Vous pouvez changer de mot de passe." 
                                                  id="UserPassword" 
                                                  name="UserPassword" 
                                                  required="required" 
                                                  maxlength="30">
                              </div>
                              <div class="formLine">
                                <div class="label"></div>
                              <p class="hint input">Le mot de passe doit contenir au minimum 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial.</p>
                              </div> -->

                              <div class="asterisque" style="text-align:right"> * Champs requis </div>

                              <div class="btn-div">
                                        <!-- ICI  --> 
                                        <!-- lancer un modal? mettre le texte en lowercase ? un bouton annuler ? -->
                                        <input type="submit"  class="btn" id="UserSignupBtn" value="Mettre à jour" disabled>
                                        
                              </div>
       
                    </form>

                    <!-- A FAIRE : implementer des components modaux -->

                    <div class="add-div" v-show="success===true">
                      <p id="erreur" > Tout va bien : {{message}} </p>
                    </div>
                    <div class="add-div" v-show="success===false">
                      <p id="erreur" > Echec de la mise à jour : {{message}} </p>
                    </div>



                    <div id="no-account" class="add-div">
                      <p> Vous pouvez si vous le souhaitez, effacer votre compte ainsi que tous les partages et commentaires qui y sont liés</p>
                      <div class="btn-div"><router-link @click="deleteAccount()" class="btn" to="../deconnect">Effacer</router-link> </div>
                    </div>

          </div>
       </div>
    </section>
</template>

<script>
export default {
  name: 'UserModifyComp',
  
  data() {
    return {
    UserName:"",
    UserFirstname:"", 
    UserEmail:"", 
    UserPresentation:"",
    UserDepartement:"", 
    UserRole:"", 
    UserPassword:"",     
    success:"",
    message :"", //message d'erreur

    }
  },



   beforeMount () {

    const  UserId = JSON.parse(sessionStorage.getItem("UserId"));
    const  Token = JSON.parse(sessionStorage.getItem("Token"));

          fetch(`http://localhost:3000/api/auth/${UserId}`, {
          method: 'GET',
          headers: {"Content-Type": "application/json", 
                    "Authorization": "Bearer " + Token
           },
           mode : "cors"
          })
          .then((res) => {
            return res.json();
          })
          .then((resJson) => {
            return resJson;
          })
          .then((res) =>{
            this.UserName = res.UserName;
            this.UserFirstname = res.UserFirstname;
            this.UserEmail = res.UserEmail;
            this.UserPresentation = res.UserPresentation;
            this.UserDepartement = res.UserDepartement;
            this.UserRole = res.UserRole;
            this.UserPassword = res.UserPassword;
          })
          .catch( (error) => { alert(error);
          });
        },

  methods: {

    checkForm() {

      if (document.getElementById("UserName").checkValidity() 
      && document.getElementById("UserFirstname").checkValidity() 
      && document.getElementById("UserEmail").checkValidity()
      // && document.getElementById("UserPassword").checkValidity()
      ) {
        document.getElementById("UserSignupBtn").disabled = false
      }
      else {document.getElementById("UserSignupBtn").disabled = true;
    }},

    modifySignup(e) {

      e.preventDefault();

      const Token = JSON.parse(sessionStorage.getItem("Token"));

      const UserName = document.getElementById("UserName").value
      const UserFirstname = document.getElementById("UserFirstname").value
      const UserEmail = document.getElementById("UserEmail").value
      const UserPresentation = document.getElementById("UserPresentation").value
      const UserDepartement= document.getElementById("UserDepartement").value
      const UserRole = document.getElementById("UserRole").value;
      // const UserPassword = document.getElementById("UserPassword").value

      const User = { "UserName": UserName,
                     "UserFirstname": UserFirstname,
                     "UserEmail": UserEmail,
                     "UserDepartement": UserDepartement,
                     "UserPresentation": UserPresentation,
                     "UserRole": UserRole,
                    //  "UserPassword": UserPassword,
      }

      fetch("http://localhost:3000/api/auth/modifySignup", {
          method: 'PUT',
          body: JSON.stringify(User),
          headers: {"Content-Type": "application/json", 
                    "Authorization": "Bearer " + Token
           },
           mode : "cors"
          })
      .then((response) => {
                    if (response.status == 201) { 
                              response.json()
                              .then(() => {
                                    this.success= true;
                                    //this.message = "Mise à jour effectuée.";//setTimeout
                                    this.message =  "Mise à jour effectuée"
                                    setTimeout(() => this.$router.push({ name: 'wall' }), 4000)

                              })
                    } else {
                              response.json ()
                              .then ((json) => {
                              this.success= false;
                              console.log(json);
                              this.message = json.error;
                              })
                    }
       })
      .catch (() => {
              this.success= false;
              this.message = `Le serveur ne répond pas ! Veuillez réessayer ultérieurement`;
      })         
    },
    
    deleteAccount(){

      const  UserId = JSON.parse(sessionStorage.getItem("UserId"));
      const  Token = JSON.parse(sessionStorage.getItem("Token"));

      fetch(`http://localhost:3000/api/auth/delete/${UserId}`, {
          method: 'DELETE',
          headers: {"Content-Type": "application/json", 
                    "Authorization": "Bearer " + Token
           },
          mode :"cors"
      }).then(
        sessionStorage.removeItem("UserId"),
        sessionStorage.removeItem("Token")
      )
    }
  }
}             
  
</script>

<style lang="scss" scoped>


</style>