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
                              @submit="CommentOnAComment"
                              id="CommentOnAComment"
                              class="formulaire">
                              
                              <!--Le Comment-->
                               <div class="formLine">
                                        <label    
                                                  for="CommentOnACommentText" 
                                                  class="label">Votre réaction</label>
                                        <textarea id="CommentOnACommentText"
                                                  class="bigtextarea textarea input"
                                                  form="CommentOnACommentText" 
                                                  type="textarea"
                                                  @keydown="checkForm"
                                                  @input="checkForm"
                                                  placeholder= "..."
                                                  name="CommentOnACommentText">
                                                  </textarea>
                              </div>
                                                         
                              <div class="btn-div">
                                        <button type="button" class="btn" @click="displayGoTo()" id="CancelBtn">Annuler</button>
                                        <input type="button" @click ="CommentOnAComment" class="btn" id="CommentBtn" value="Réagir" disabled>
                              </div>
                    </form>
          </div>
      </div>
    </section>
</template>

<script>
export default {
  name: 'PostACommentOnAComment',
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
                    const noblank = document.getElementById("CommentOnACommentText").value.trim();
                    if (noblank != "" && noblank.length > 2){
                      document.getElementById("CommentBtn").disabled = false;
                    } else { document.getElementById("CommentBtn").disabled = true }
          },
          CommentOnAComment() {


                    const Token = JSON.parse(sessionStorage.getItem("Token"));
                    const commentOnACommentText = document.getElementById("CommentOnACommentText").value;
                    const shareShareId = new URL(window.location.href).hash.split("=")[1];

                    const commentCommentId = document.getElementById("CommentOnACommentId").textContent;

                    const commentOnAComment = { "CommentText": commentOnACommentText,
                                                "shareShareId": shareShareId,
                                                "commentCommentId": commentCommentId,
                    }
                    console.log(commentOnAComment);

                    fetch("http://localhost:3000/api/comments", {
                              method: 'POST',
                              body: JSON.stringify(commentOnAComment),
                              headers: {
                                  "Content-Type": "application/json",
                                  "Accept":"*/*",
                                  "Authorization": "Bearer " + Token,
                              },
                              mode : "cors"})

                    .then((response) => {
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