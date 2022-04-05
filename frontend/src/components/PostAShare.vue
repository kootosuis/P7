<template>
    <section class = "container">
      <div class = "formSection">

          <div class="please">
            <h2 > A vous de partager ! </h2>
          </div>

          <div class = "formDiv">
                    <form     class="formulaire"
                              enctype="multipart/form-data"
                              method="POST" 
                              name="form" 
                              id="ShareToBePosted" 
                              @submit = "Share">
                              
                              <!--Le share-->
                               <div class="formLine">
                                        <label    
                                                  for="ShareText" 
                                                  class="label">Votre texte</label>
                                        <textarea class="bigtextarea textarea input" 
                                                  type="textarea"
                                                  @input="checkForm"
                                                 
                                                  placeholder= "..."
                                                  autofocus
                                                  id="ShareText"
                                                  name="ShareText"
                                                  ></textarea>
                              </div>
                              
                              <!-- A ÉTUDIER -->
                              <!-- https://css-tricks.com/auto-growing-inputs-textareas/ -->
                              <!-- https://stackoverflow.com/questions/2803880/is-there-a-way-to-get-a-textarea-to-stretch-to-fit-its-content-without-using-php -->
                              <!-- https://www.skymac.org/Admin-Dev/article-5d6989e5-Astuce-HTML-Javascript-Creer-un-textarea-a-la-hauteur-auto-adaptative-1.htm -->


                              <!--Le Mot de passe -->
                              <div class="formLine">
                                        <label    
                                                  for="Media" 
                                                  class="label">Votre image, votre GIF</label>
                                        <input    class="input"
                                                  @input="checkForm"
                                                  @change="uploadImage($event)"
                                                  type="file"
                                                  accept="image/png, image/jpg, image/jpeg, image/png, image/gif"
                                                  multiple
                                                  id="Media" 
                                                  name="file" 
                                                 >
                              </div>
                              
                              <div class="btn-div">
                                        <!-- <a href="ici un message modal" class="btn">S'inscrire</a>
                                        <input type="submit" value="submit" class="u-form-control-hidden"> -->
                                        <button type="submit" class="btn" @click="Share(e)" id="UserSignupBtn" value="Partager" disabled>Partager</button>
                                        
                              </div>
       
                    </form>

                    
                    <div class="add-div" v-show="success===false">
                      <p id="erreur"> Echec du partage : {{message}} </p>
                    </div>

          </div>
       </div>
    </section>
</template>

<script>
export default {
  name: 'PostAShare',
  data() {
    return {
          success: "",
          message :"", //message d'erreur
          ShareText: {
            type: String,
            default: "No comment"},

          file : {type : URL,
          default : "./src/assets/images/icon.png"
    }
  }
  },
  methods: {

          checkForm() {
                    if (document.getElementById("ShareText") || document.getElementById("Media")
                    ) {
                    document.getElementById("UserSignupBtn").disabled = false;
                    console.log("CHECK OK")
                    }
                    else document.getElementById("UserSignupBtn").disabled = true;
          },

          uploadImage($event) {
                    this.file = $event.target.files[0];
          },


          Share(e) {

                    e.preventDefault();


                    const ShareText = document.getElementById("ShareText").value;
                    // je n'arrive pas à mettre la valeur par défaut
                    
                    const ShareData = new FormData();
                    ShareData.append('ShareText', ShareText);
                    ShareData.append('file', this.file);

                    console.log(ShareText);
                    console.log(this.file)


                    //ça c'est provisoire pour voir ce qu'il y a dans ShareData
                    for (var key of ShareData.entries()) {
                        console.log(key[0] + ', ' + key[1]);
                    }

                    const Token = JSON.parse(sessionStorage.getItem("Token"))
                    console.log(Token)
                    

                    fetch("http://localhost:3000/api/shares", {
                              method: 'POST',
                              body: ShareData,
                              headers: {
                                  'Content-Type': 'multipart/form-data',
                                  'Authorization': `Bearer ${Token}`,
                              },
                              // j'ai lu cela qqpart cela empeche les erreurs 500
                              mode : "no-cors"
                    })
                    .then((response) => {
                              if (response.status == 200) { 
                                        console.log("GOOD");
                                        
                                        this.success= true;
                                        this.message = "Partage en ligne.";
                                        this.$router.push({ name: 'wall' });
                              } else {
                                        console.log("BAD");

                                        response.json ()
                                        .then ((json) => {
                                        this.success= false;
                                        console.log(json);
                                        this.message = json.error ||  json.message ;
                                        return this.message
                                        
                                        })
                              }
                    })
                    .catch (() => {

                              console.log("VERY BAD");
                              this.success= false;
                              this.message = `Le serveur ne répond pas ! Veuillez réessayer ultérieurement`;
                    })         
          }               
  }
}
</script>

<style lang="scss" scoped>

</style>