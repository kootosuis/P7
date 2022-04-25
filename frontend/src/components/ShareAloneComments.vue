<template>

                    <section class="mainshares shares">

                       <div class="card" id="shareAloneComments" >
                         <div  id="commentDiv" 
                          v-for="item in apiCommentsResponse"
                          :key="item.shareShareId"
                          class="card card__info card__info--2">
                                <div v-if="item.CommentId" >
                                  <div>
                                    <p class="card__info--text card__info--sharetext">{{ item.CommentText }}</p>
                                  </div>
                                  <div class="separator"></div>
                                  <div class="card__info--complement">
                                    <div>
                                       <p> {{ item.user.UserFirstname }} {{ item.user.UserName }} / {{ item.user.UserDepartement }} / {{ item.user.UserRole }}</p>
                                       <p>{{ formatDate(item.updatedAt) }}</p> <!-- le commentateur du Share -->
                                       <p hidden>{{ item.commentCommentId }} </p>
                                       <p hidden id="CommentOnACommentId">{{ item.CommentId }}</p>
                                    </div>
                                   
                                  </div>
 
                                </div>

                                <div class="btn-div">
                                        <button v-show="item.userUserId==loggedUserId" type="button" class="btn" @click="modifyComment()" id="modifyCommentBtn">Corriger</button>
                                        <button v-show="item.userUserId==loggedUserId" type="button" class="btn" @click="deleteComment()" id="deleteCommentBtn">Effacer</button>
                                </div>

                                <PostACommentOnAComment v-show="item.userUserId!=loggedUserId"/>
                                          

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

                            modifyForm :{
                              type: Boolean,
                              default: true },

                    }
          },

          methods : {

            formatDate(dateString) {
                            const date = dayjs(dateString);
                                // Then specify how you want your dates to be formatted
                            return date.format('dddd D MMMM YYYY , HH:mm');
                      },

            modifyShare() {
                  this.modifyForm = false;
            },
            doNotModify(){
                  this.modifyForm = true;
            },

            correctComment(){
                    const ShareToBeCorrected = document.getElementById("ShareToBeCorrected");
                    const ShareId = new URL(window.location.href).hash.split("=")[1];
                    const Token = JSON.parse(sessionStorage.getItem("Token"));
                    const Modify = new FormData(ShareToBeCorrected);

                    Modify.append('ShareId',ShareId)


                    //--- TEST ---- ///
                    // for(var pair of Modify.entries()) {
                    //   console.log(pair[0]+ ', '+ pair[1]);
                    // }

                    fetch(`http://localhost:3000/api/shares/${ShareId}`, {
                              method: 'PUT',
                              headers: {
                                  "Accept":"*/*",
                                  // "Content-Type": "multipart/form-data", 
                                  "Authorization": "Bearer " + Token
                              },
                              body: Modify,
                              mode : "cors"})

                    .then((response) => {

                              if (response.status == 201) { 
                                        this.success= true;
                                        this.message = "Mise à jour effectuée.";
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
                          const ShareId = new URL(window.location.href).hash.split("=")[1];
                          const Share = {
                            "ShareId" : ShareId
                          }

                          const deleteShare = confirm("Le commentaire et tous les commentaires associés vont être effacés")

                          if (deleteShare){
                            fetch(`http://localhost:3000/api/comments/${ShareId}`, {
                              method: 'DELETE',
                              headers: {"Content-Type": "application/json", 
                                        "Authorization": "Bearer " + Token
                              },
                              body: JSON.stringify(Share),
                              mode : "cors"
                            })
                            .then(() => {
                              alert("Share effacé !");
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