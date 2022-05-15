<template>
    <section class = "container">
      <div class="btn-div" id="ShareAccess" v-show="ShareFormHidden">
        <button type="button" 
                class="btn" 
                @click="displayForm()" 
                id="GoToShare" 
                value="Partager">
                Un commentaire ?
        </button>
      </div>
      <div class = "formSection" id="ShareForm" v-show="!ShareFormHidden" >
          <div class = "formDiv">
                    <form     
                              type="multipart/form-data"
                              method="POST" 
                              name="form" 
                              id="CommentToBePosted"
                              class="formulaire">
                              
                              <!--Le Comment-->
                               <div class="formLine">
                                        <label    
                                                  for="CommentText" 
                                                  class="label">Votre commentaire</label>
                                        <textarea id="CommentText"
                                                  class="bigtextarea textarea input"
                                                  form="CommentToBePosted" 
                                                  type="textarea"
                                                  @keydown="checkForm"
                                                  @input="checkForm"
                                                  placeholder= "..."
                                                  name="CommentText"
                                                  ></textarea>
                              </div>
                              
                              <div class="btn-div">
                                        <button type="submit" class="btn" @submit="displayGoTo()" id="CancelBtn">Annuler</button>
                                        <button type="submit" class="btn" @submit="Comment()" id="CommentBtn" disabled>Commenter</button>
                              </div>
                    </form>
          </div>
      </div>
    </section>
</template>

<script>
export default {
  name: 'PostAComment',
  data() {
    return {
          success: "",
          message :"", //message d'erreur
          CommentText: String,
          ShareFormHidden :{
            type: Boolean,
            default: true }
            }
    },
  
  methods: {
          displayForm(){
            this.ShareFormHidden = false
          },
          displayGoTo(){
            this.ShareFormHidden = true
          },
          checkForm() {
                    const noblank = document.getElementById("CommentText").value.trim()
                    if (noblank != "" && noblank.length > 2){
                      document.getElementById("CommentBtn").disabled = false;
                    } else { document.getElementById("CommentBtn").disabled = true }
          },
          Comment() {

                    const Token = JSON.parse(sessionStorage.getItem("Token"));
                    const CommentText = document.getElementById("CommentText").value.trim();
                    const shareShareId = new URL(window.location.href).hash.split("=")[1];

                    const Comment = { "CommentText": CommentText,
                                      "shareShareId": shareShareId,
                                      
                    }

                    fetch("http://localhost:3000/api/comments", {
                              method: 'POST',
                              body: JSON.stringify(Comment),
                              headers: {
                                  // "Content-Type": "application/json",
                                  "Accept":"*/*",
                                  "Authorization": "Bearer " + Token,
                              },
                              
                              })

                    .then((response) => {
                      alert('toto2')
                              if (response.status == 201) { 
                                        this.success= true;
                                        this.message = "Commentaire en ligne.";
                                        this.ShareFormHidden = true;
                                        this.$router.push({ name: 'wall' });
                                        this.$router.go(0);

                              } else {
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
                      alert('toto3')
                              this.success= false;
                              this.message = `Le serveur ne répond pas ! Veuillez réessayer ultérieurement`;
                    })         
          }               
  }
}
</script>

<style lang="scss" scoped>

#formImagePreview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#formImagePreview img {
  max-width: 100%;
  max-height: 500px;
}

</style>