<template>
    <section class = "container">
      <div class="btn-div" id="ShareAccess" v-show="ShareFormHidden">
        <button type="button" 
                class="btn" 
                @click="displayForm()" 
                id="GoToShare" 
                value="Partager">
                Une réaction ?
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
                                                  class="label">Votre réaction</label>
                                        <textarea class="bigtextarea textarea input"
                                                  form="CommentToBePosted" 
                                                  type="textarea"
                                                  @input="checkForm"
                                                 
                                                  placeholder= "..."
                                                  autofocus
                                                  id="CommentText"
                                                  name="CommentText"></textarea>
                              </div>
                                                         
                              <div class="btn-div">
                                        <button type="button" class="btn" @click="displayGoTo()" id="CancelBtn">Annuler</button>
                                        <button type="button" class="btn" @click="Comment()" id="CommentBtn" disabled>Commenter</button>
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
                    if (document.getElementById("CommentText").textContent != null) {
                      document.getElementById("CommentBtn").disabled = false;
                    } else { document.getElementById("CommentBtn").disabled = true }
          },
          Comment() {


                    // e.preventDefault();

                    const Token = JSON.parse(sessionStorage.getItem("Token"));
                    const CommentText = document.getElementById("CommentText").value
                    const shareShareId = new URL(window.location.href).hash.split("=")[1]

                    const commentCommentId = document.getElementById("CommentId").value

                    const Comment = { "CommentText": CommentText,
                                      "shareShareId": shareShareId,
                                      "commentCommentId": commentCommentId,
                    }

                    console.log(Comment)

                    fetch("http://localhost:3000/api/comments", {
                              method: 'POST',
                              body: JSON.stringify(Comment),
                              headers: {
                                  "Content-Type": "application/json",
                                  "Accept":"*/*",
                                  "Authorization": "Bearer " + Token,
                                  // "Host":""
                              },
                              mode : "cors"})

                    .then((response) => {
                              if (response.status == 201) { 
                                        this.success= true;
                                        this.message = "Commentaire en ligne.";
                                        this.$router.push({ name: 'wall' });
                                        this.ShareFormHidden = true;
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