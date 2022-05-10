<template>
    <section class = "container">
      <div class = "formSection">

          <div class="please" >
            <h2> Vous pouvez mettre à jour les données de {{UserFirstname}} {{UserName}} </h2>
          </div>

          <div class = "formDiv">
                    <form     class="formulaire"
                              method="PUT" 
                              name="form" 
                              id="form" 
                              @keydown = "checkForm"
                              @input="checkform"

                              @submit = "modifySignup">
                             
                              <!--Le Nom-->
                              <div class="formLine">
                                        <label
                                                  for="UserName" 
                                                  class="label">Nom <span class="asterisque">*</span></label>
                                        <input    class="input"
                                                  v-model="UserName" 
                                                    
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

                                          <select class="input"
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
                              <div class="formLine">
                                        <label    
                                                  for="UserPassword" 
                                                  class="label">Mot de passe <span class="asterisque">*</span></label>
                                        <input    class="input"
                                                  v-model="UserPassword" 
                                                     
                                                  type="password" 
                                                  id="UserPassword" 
                                                  name="UserPassword" 
                                                  maxlength="30">
                              </div>
                              <div class="formLine formLineTop">
                                <div class="label"></div>
                                <p class="hint input"> Vous pouvez changer de mot de passe.<br/><br/>
                                                       Le mot de passe doit contenir au minimum 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial.</p>
                              </div>

                              <!--L'habilitation -->
                              <div class="formLine" v-if="isAdmin">
                                        <label    
                                                  for="UserHabilitation" 
                                                  class="label">Habilitation</label>
                                        <div     
                                                  class="input">
                                                  <select   v-if="!UserHabilitation"
                                                            id="UserHabilitation" 
                                                            name="UserHabilitation" 
                                                            required="required">
                                                                      <option value=0>sans habilitation à administrer</option>  
                                                                      <option value=1>avec habilitation à administrer</option>
                                                  </select>  
                                                  <select   v-if="UserHabilitation"
                                                            id="UserHabilitation" 
                                                            name="UserHabilitation" 
                                                            required="required">
                                                                      <option value=1>avec habilitation à administrer</option>
                                                                      <option v-if="AdminLength" value=0>sans habilitation à administrer</option>  
                                                  </select>                                                       
                                        </div>
                              </div>

                              <div class="asterisque" style="text-align:right"> * Champs requis </div>

                              <div class="btn-div">
                                        <button type="button" class="btn" @click="goBacKToForum()" id="CancelBtn">Annuler</button>
                                        <input type="submit"  class="btn" id="UserSignupBtn" value="Mettre à jour" disabled>           
                              </div>
       
                    </form>

                    <!-- A FAIRE : implementer des components modaux -->

                    <div class="add-div" v-show="success===true">
                      <p id="erreur" > Tout va bien : {{ message }} </p>
                    </div>
                    <div class="add-div" v-show="success===false">
                      <p id="erreur" > Echec de la mise à jour : {{ message }} </p>
                    </div>

                    <div id="no-account" class="add-div">
                      <p> Vous pouvez si vous le souhaitez, effacer ce compte ainsi que tous les partages et commentaires qui y sont liés</p>
                      <div class="btn-div"><router-link @click="deleteAccount()" class="btn" to="../deconnect">Effacer</router-link> </div>
                    </div>

          </div>
       </div>
    </section>
</template>

<script>
export default {
  name: 'UserModifyCompByAdmin',
  
  data() {
    return {
    UserName:"",
    UserFirstname:"", 
    UserEmail:"", 
    UserPresentation:"",
    UserDepartement:"", 
    UserRole:"", 
    UserPassword:"",
    UserHabilitation:"",     
    success:"",
    message :"", //message d'erreur

    AdminLength : {
      type: Boolean,
      default : false
    },

    isAdmin: {
      type: Boolean,
      default : false
    }

    }
  },

   beforeMount () {
    this.isAdmin = sessionStorage.getItem("isAdmin");
    const  UserId = new URL(window.location.href).hash.split("/modifyByAdmin/")[1];
    const  Token = JSON.parse(sessionStorage.getItem("Token"));

          ///----- on vérifie d'abord qu'il y a au minimum deux administrateurs ----///
          fetch(`http://localhost:3000/api/auth/safeAdmin`, {
          method: 'GET',
          headers: {"Content-Type": "application/json", 
                    "Authorization": "Bearer " + Token
           },
           mode : "cors"
          })
          .then((res) => {
            return res.json();
          })
          .then((res) =>{
            if (res.length > 2) {
              this.AdminLength = true
            } else {
              this.AdminLength = false
            }
          })
          .catch( (error) => { alert(error);
          });


          ///----on peut ensuite accèder au profil User------///
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
          .then((res) =>{
            this.UserName = res.UserName;
            this.UserFirstname = res.UserFirstname;
            this.UserEmail = res.UserEmail;
            this.UserPresentation = res.UserPresentation;
            this.UserDepartement = res.UserDepartement;
            this.UserRole = res.UserRole;
            this.UserPassword = res.UserPassword;
            this.UserHabilitation=res.UserHabilitation
          })
          .catch( (error) => { alert(error)
           this.message = error;
          });
        },

  methods: {

    checkForm() {

      if (document.getElementById("UserName").checkValidity() 
      && document.getElementById("UserFirstname").checkValidity() 
      && document.getElementById("UserEmail").checkValidity()
      && document.getElementById("UserPassword").checkValidity()
      ) {
        document.getElementById("UserSignupBtn").disabled = false
      }
      else {document.getElementById("UserSignupBtn").disabled = true;
    }},
    
    goBacKToForum(){
      this.$router.push({ name: 'wall' })
    },

    modifySignup(e) {

      e.preventDefault();

      const Token = JSON.parse(sessionStorage.getItem("Token"));

      const  UserId = new URL(window.location.href).hash.split("/modifyByAdmin/")[1];

      const UserName = document.getElementById("UserName").value
      const UserFirstname = document.getElementById("UserFirstname").value
      alert('tata')
      const UserEmail = document.getElementById("UserEmail").value
      alert('toto')
      const UserPresentation = document.getElementById("UserPresentation").value
      const UserDepartement= document.getElementById("UserDepartement").value
      const UserRole = document.getElementById("UserRole").value;
      const UserPassword = document.getElementById("UserPassword").value;
      const UserHabilitation = document.getElementById("UserHabilitation").value;

      const User = { "UserName": UserName,
                     "UserFirstname": UserFirstname,
                     "UserEmail": UserEmail,
                     "UserDepartement": UserDepartement,
                     "UserPresentation": UserPresentation,
                     "UserRole": UserRole,
                      "UserPassword": UserPassword,
                     "UserHabilitation" : UserHabilitation,
      }

      fetch(`http://localhost:3000/api/auth/modifySignup/${UserId}`, {
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
                              .then((res) => {

                                console.log(res);
                                    this.success= true;
                                    this.message =  "Mise à jour effectuée"
                                    sessionStorage.setItem("isAdmin", JSON.stringify(response.UserHabilitation));
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

      const  UserId = new URL(window.location.href).hash.split("/modifyByAdmin/")[1];
      const  Token = JSON.parse(sessionStorage.getItem("Token"));

      fetch(`http://localhost:3000/api/auth/delete/${UserId}`, {
          method: 'DELETE',
          headers: {"Content-Type": "application/json", 
                    "Authorization": "Bearer " + Token
           },
          mode :"cors"
      }).then(
        //à faire ? retour vers le forum
      )
    }
  }
}             
  
</script>

<style lang="scss" scoped>


</style>