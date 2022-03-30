<template>

    <section class = "container">
      <div class = "formSection">

          <div class="please">
            <h2 > Ravis de vous revoir ! </h2>
          </div>

          <div class = "formDiv">
                    <form     class="formulaire"
                              method="POST" 
                              name="form" 
                              id="form" 
                              @submit = "sendForm">
                              
                              <!--L'Email'-->
                               <div class="formLine">
                                        <label    
                                                  for="UserEmail" 
                                                  class="label">Email <span class="asterisque">*</span></label>
                                        <input    class="input"
                                                  @input = "checkForm"    
                                                  type="email" 
                                                  
                                                  id="UserEmail"
                                                  name="UserEmail" 
                                                  required="">
                              </div>

                              <!--Le Mot de passe -->
                              <div class="formLine">
                                        <label    
                                                  for="UserPassword" 
                                                  class="label">Mot de passe <span class="asterisque">*</span></label>
                                        <input    class="input"
                                                  @input = "checkForm"    
                                                  type="text" 
                                                  
                                                  id="UserPassword" 
                                                  name="UserPassword" 
                                                  required="required" 
                                                  maxlength="30">
                              </div>
                              
                              <div class="btn-div">
                                        <!-- <a href="ici un message modal" class="btn">S'inscrire</a>
                                        <input type="submit" value="submit" class="u-form-control-hidden"> -->
                                        <input type="submit"  class="btn" id="UserSignupBtn" value="S'identifier" disabled>
                                        
                              </div>
       
                    </form>

                    
                    <div class="add-div" v-show="success===false">
                      <p id="erreur" > Echec de l'inscription : {{message}} </p>
                    </div>

          </div>
       </div>
    </section>
</template>

<script>
export default {
  name: 'UserLogin',
  data() {
    return {
    message :"", //message d'erreur
    }
  },
  methods: {

    checkForm() {
      if (document.getElementById("UserEmail").checkValidity()
      && document.getElementById("UserPassword").checkValidity()) {
        document.getElementById("UserSignupBtn").disabled = false;
      }
      else document.getElementById("UserSignupBtn").disabled = true;
    },

    sendForm(e) {

      e.preventDefault();

      const UserEmail = document.getElementById("UserEmail").value
      const UserPassword = document.getElementById("UserPassword").value
      
      const User = { "UserEmail": UserEmail,
                     "UserPassword": UserPassword
      }

      fetch("http://localhost:3000/api/auth/login", {
          method: 'POST',
          body: JSON.stringify(User),
          // headers: {'Accept': 'application/json, text/plain, */*'},
          headers: {"Content-Type": "application/json" },
          mode :"cors"
      })
      .then ((res) => {
            if (res.status == 200) {
              this.success= true;
              this.message = "Inscription validée.";
              sessionStorage.setItem("UserId", JSON.stringify(res.UserId));
              sessionStorage.setItem("Token", JSON.stringify(res.token));
              this.$router.push({ name: 'wall' });
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
   background-image: linear-gradient(#40cbc4, #fed7d7);
//   background-image: linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("../assets/images/129938653-0.png");
//   background-position: 50% 6.72%;
}

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