<template>

                    <section class="mainshares shares">

                          <div class="card" id="shareAloneComments" >
                              <div  id="commentDiv" 
                                v-for="item in apiCommentsResponse"
                                :key="item.shareShareId"
                                class="card card__info card__info--2">
                                      <div v-if="item.CommentId" >

                                        <!--- le commentaire original -->
                                        <div v-if="modifyCommentBox">
                                          <p class="card__info--text card__info--sharetext">{{ item.CommentText }}</p>
                                        </div>
                                        
                                        <!--- le commentaire tel qu'il va être modifié -->
                                        <div v-else class="formSection" id="ShareForm" >
                                            <div class = "formDiv">
                                                      <form     
                                                                type="multipart/form-data"
                                                                method="PUT" 
                                                                name="form" 
                                                                id="CommentToBeCorrected"
                                                                class="formulaire">
                                                                
                                                                <!--Le Comment-->
                                                                <div class="formLine">
                                                                          <label    
                                                                                    for="CommentText" 
                                                                                    class="label">Votre commentaire</label>
                                                                          <textarea class="bigtextarea textarea input"
                                                                                    form="CommentToBeCorrected" 
                                                                                    type="textarea"
                                                                                    v-model="item.CommentText" 
                                                                                    placeholder= "..."
                                                                                    id="CommentText"
                                                                                    name="CommentText"></textarea>
                                                                </div>
                                                                
                                                                <div class="btn-div">
                                                                          <button type="button" class="btn" @click="doNotModify()" id="CancelBtn">Annuler</button>
                                                                          <button type="button" class="btn" @click="correctComment()" id="CommentBtn"   >Confirmer</button>
                                                                </div>
                                                      </form>
                                            </div>
                                        </div>

                                        <div class="separator"></div>

                                        <div class="card__info--complement">
                                          <div>
                                            <p> {{ item.user.UserFirstname }} {{ item.user.UserName }} / {{ item.user.UserDepartement }} / {{ item.user.UserRole }}</p>
                                            <p>{{ formatDate(item.updatedAt) }}</p> <!-- le commentateur du Share -->
                                            <p hidden>{{ item.commentCommentId }} </p>
                                            <p  id="CommentOnACommentId">{{ item.CommentId }}</p>
                                          </div>
                                        </div>
      
                                      </div>

                                      <div class="btn-div">
                                              <button v-show="item.userUserId==loggedUserId  || isAdmin===1" type="button" class="btn" @click="modifyComment()" id="modifyCommentBtn">Corriger</button>
                                              <button v-show="item.userUserId==loggedUserId  || isAdmin===1" type="button" class="btn" @click="deleteComment()" id="deleteCommentBtn">Effacer</button>
                                      </div>

                                      <PostACommentOnAComment v-if="item.userUserId!=loggedUserId || isAdmin===1"/>
                            </div>
                        </div>

                      
                        
    
                    </section>

                    
                    

          
</template>

<script>
import PostACommentOnAComment from "@/components/PostACommentOnAComment.vue"
import dayjs from 'dayjs'
require('dayjs/locale/fr')
dayjs.locale('fr')

export default {
          name : 'ShareAlone',
          components: {
                              PostACommentOnAComment
          },

          

          data(){
                    return{

                            loggedUserId: "",
                            apiCommentsResponse : Array,
                            apiLength : Number,

                            CommentId : "",
                            CommentText : "",
                            CommentcreatedAt : "",
                            CommentupdatedAt : "",
                            CommentuserUserId : "", 

                            modifyCommentBox :{
                              type: Boolean,
                              default: true },

                            isAdmin :{
                              type: Boolean,
                              default: false },

                    }
          },

          methods : {

            formatDate(dateString) {
                            const date = dayjs(dateString);
                                // Then specify how you want your dates to be formatted
                            return date.format('dddd D MMMM YYYY , HH:mm');
                      },

            modifyComment() {
                  this.modifyCommentBox = false;
            },
            doNotModify(){
                  this.modifyCommentBox = true;
            },

            correctComment(){
                    
                    const CommentToBeCorrected = document.getElementById("CommentToBeCorrected");
                    console.log(CommentToBeCorrected)
                    const CommentId = document.getElementById("CommentOnACommentId").textContent;
                    
                    const Token = JSON.parse(sessionStorage.getItem("Token"));
                    const Modify = new FormData(CommentToBeCorrected);

                    Modify.append('CommentId',CommentId)


                    //--- TEST ---- ///
                    for(var pair of Modify.entries()) {
                      console.log(pair[0]+ ', '+ pair[1]);
                    }

                    fetch(`http://localhost:3000/api/comments/${CommentId}`, {
                              method: 'PUT',
                              headers: {
                                  "Accept":"*/*",
                                  // "Content-Type": "multipart/form-data", 
                                  "Authorization": "Bearer " + Token
                              },
                              body: Modify,
                              mode : "cors"})

                    .then((response) => {
                              
                              console.log(Modify)

                              if (response.status == 201) { 
                                        this.success= true;
                                        this.message = "Correction effectuée.";
                                        this.modifyForm = true;
                                        this.$router.push({ name: 'wall' });
                                        this.$router.go(0);
                                        // history.go(0);
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

            },
            deleteComment() {

                          const  Token = JSON.parse(sessionStorage.getItem("Token"));
                          // const loggedUserId=JSON.parse(sessionStorage.getItem("UserId"))
                          const CommentId = document.getElementById("CommentOnACommentId").textContent;
                          const Comment = {
                            "CommentId" : CommentId
                          }

                          const deleteComment = confirm("Le commentaire et tous les commentaires associés vont être effacés")

                          if (deleteComment){
                            fetch(`http://localhost:3000/api/comments/${CommentId}`, {
                              method: 'DELETE',
                              headers: {"Content-Type": "application/json", 
                                        "Authorization": "Bearer " + Token
                              },
                              body: JSON.stringify(Comment),
                              mode : "cors"
                            })
                            .then(() => {
                              alert("Commentaire effacé !");
                              setTimeout(this.$router.push({ name: 'wall' }), 3000);
                              this.$router.go(0);
                            })
                            .catch( (error) => { alert(error);
                            })
                          }else{
                             this.$router.push({ name: 'wall' });
                             this.$router.go(0);
                          }
            },
          },

          beforeMount () {
                            const  Token = JSON.parse(sessionStorage.getItem("Token"));
                            const loggedUserId=JSON.parse(sessionStorage.getItem("UserId"))
                            const ShareId = new URL(window.location.href).hash.split("=")[1];

                            this.isAdmin = sessionStorage.getItem("isAdmin");
                           
                           // LES COMMENTAIRES    

                            fetch(`http://localhost:3000/api/comments/${ShareId}`, {
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
                              this.loggedUserId = loggedUserId;
                              this.apiCommentsResponse=res
                              this.apiLength = res.length
                            })
                            .catch( (error) => { alert(error);
                            });
          },
}
</script>

<style lang="scss" scoped>



</style>