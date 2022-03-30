<template>

    <section class = "container">
      <div class = "formSection">

          <div class="please">
            <h2 > Veuillez renseigner le formulaire pour créer votre compte </h2>
          </div>

          <div class = "formDiv">
                    <form     class="formulaire"
                              method="POST" 
                              name="form" 
                              id="form" 
                              @submit = "sendForm">
                              

                              <!--Le Nom-->
                              <div class="formLine">
                                        <label
                                                  for="UserName" 
                                                  class="label">Nom <span class="asterisque">*</span></label>
                                        <input    class="input" 
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
                                        <input    class="input"
                                                  type="text" 
                                                  placeholder="Si vous le souhaitez, vous pouvez vous présenter..." 
                                                  id="UserPresentation" 
                                                  name="UserPresentation" 
                                                  >
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
                                                            <svg      
                                                                      xmlns="http://www.w3.org/2000/svg" 
                                                                      width="14" height="12" version="1" class="u-caret">
                                                                      <path fill="currentColor" d="M4 8L0 4h8z"></path>
                                                            </svg>
                                        </div>
                              </div>
                              <!--Le Role-->
                              <div class="formLine">
                                        <label    
                                        for="UserRole" 
                                                  class="label">Rôle</label>
                                        <input    class="input"
                                                  type="text" 
                                                  placeholder="Quel est votre rôle dans l'entreprise ?" 
                                                  id="UserRole" 
                                                  name="UserRole">
                              </div>
                              <!--Le Mot de passe -->
                              <div class="formLine">
                                        <label    
                                                  for="UserPassword" 
                                                  class="label">Mot de passe <span class="asterisque">*</span></label>
                                        <input    class="input"
                                                  @input = "checkForm"    
                                                  type="text" 
                                                  placeholder="N'oubliez pas de noter votre mot de passe." 
                                                  id="UserPassword" 
                                                  name="UserPassword" 
                                                  required="required" 
                                                  maxlength="30">
                              </div>
                              <div class="formLine">
                                <div class="label"></div>
                              <p class="hint input">Le mot de passe doit contenir au minimum 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial.</p>
                              </div>

                              <div class="asterisque" style="text-align:right"> * Champs requis </div>

                              <div class="btn-div">
                                        <!-- <a href="ici un message modal" class="btn">S'inscrire</a>
                                        <input type="submit" value="submit" class="u-form-control-hidden"> -->
                                        <input type="submit"  class="btn" id="UserSignupBtn" value="S'inscrire" disabled>
                                        
                              </div>
       
                    </form>

                    
                    <div class="add-div" v-show="success===false">
                      <p id="erreur" > Echec de l'inscription : {{message}} </p>
                    </div>
                    <div id="no-account" class="add-div">
                      <p> Déjà un compte ? <router-link to="../login">S'identifier</router-link> </p>
                    </div>
          </div>
       </div>
    </section>
</template>

<script>
export default {
  name: 'UserSignUpComp',
  data() {
    return {
    message :"", //message d'erreur
    }
  },
  methods: {

    checkForm() {
      if (document.getElementById("UserName").checkValidity() 
      && document.getElementById("UserFirstname").checkValidity() 
      && document.getElementById("UserEmail").checkValidity()
      && document.getElementById("UserPassword").checkValidity()) {
        document.getElementById("UserSignupBtn").disabled = false;
      }
      else document.getElementById("UserSignupBtn").disabled = true;
    },

    sendForm(e) {

      e.preventDefault();

      const UserName = document.getElementById("UserName").value
      const UserFirstname = document.getElementById("UserFirstname").value
      const UserEmail = document.getElementById("UserEmail").value
      const UserPassword = document.getElementById("UserPassword").value
      const UserPresentation = document.getElementById("UserPresentation").value
      const UserDepartement= document.getElementById("UserDepartement").value
      const UserRole = document.getElementById("UserRole").value;
      
      const User = { "UserName": UserName,
                     "UserFirstname": UserFirstname,
                     "UserEmail": UserEmail,
                     "UserDepartement": UserDepartement,
                     "UserPresentation": UserPresentation,
                     "UserRole": UserRole,
                     "UserPassword": UserPassword
      }

      fetch("http://localhost:3000/api/auth/signup", {
          method: 'POST',
          body: JSON.stringify(User),
          // headers: {'Accept': 'application/json, text/plain, */*'},
          headers: {"Content-Type": "application/json" },
          mode :"cors"
      })
      .then ((res) => {
            if (res.status == 201) {
              this.success= true;
              this.message = "Inscription validée.";
              sessionStorage.setItem("UserEmail", JSON.stringify(User.UserEmail));
              sessionStorage.setItem("UserPassword", JSON.stringify(User.UserPassword));
              this.$router.push({ name: 'login' });
            }
            else {res.json ()
              .then ((json) => {
                this.success= false;
                console.log(json);
                this.message = json.error.errors[0].message;
              }
            )}
          })
    .catch (() => {
            this.success= false;
            this.message = `Le serveur ne répond pas ! Veuillez réessayer ultérieurement`;
     })         
    }               
  }
}
</script>

<style lang="scss" scoped>

.formSection{
  min-height: 724px;
}

.formulaire{
  color: white;
  font-weight: 700;
  display : flex;
  flex-direction: column;
  text-align: left;
  background-image: linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("../assets/images/129938653-0.png");
  background-position: 50% 6.72%;}

.formLine{
  width :100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // text-align: center;
  margin-left: 0;
}
.input{
  flex : 2;
  
  
}
.label {
flex :1;
text-align: right;
}


.u-section-1 .u-sheet-1 {
  min-height: 724px;
}

.formSection .formDiv {
  width: 570px;
  margin: 96px auto 39px;
}

.asterisque {
  font-size : 10px;
}
.hint {
  font-size : 12px;
  font-weight: 400;
}

.please {
  height: 100px;
  padding : 25px;
  font-size: 1.25rem;
  h2 {
    text-align: center;
  }
}

@media (max-width: 767px) {
  .formSection .formDiv {
    width: 540px;
  }
}

@media (max-width: 575px) {
  .formSection .formDiv {
    width: 340px;
  }
}

</style>