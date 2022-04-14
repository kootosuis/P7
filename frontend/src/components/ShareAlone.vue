<template>
           <section class="mainshares">
                <div id="shares" class="shares">

                    <!-- LE SHARE -->
                    <div class="card"  >
                                
                                <div class="card__image">
                                    <div class="card__image--img">
                                      <img :src='MediaUrl' class="card__image--img"/>            
                                    </div>
                                    <!-- <div class="card__image--img card__image--new">
                                        <p>Nouveau</p>
                                    </div> -->
                                </div>
                    
                                <div class="card__info">

                                    <div>
                                      <p class="card__info--text">{{ ShareText }}</p>
                                    </div>
                                
                                    

                                    <div class="card__info--complement">

                                        <div class="card__info--complement--adress">
                                          <p>{{ updatedAt }}</p>
                                          <p> {{ UserFirstname}} {{ UserName}} / {{ UserDepartement}} / {{ UserRole}} </p>
                                          <p hidden>{{ userUserId }}</p>
                                          <p>{{ apiLength }} commentaires</p>
                                        </div>
                                    </div>

                                    <div class="btn-div">
                                          <button v-if="userUserId==loggedUserId" type="button" class="btn" @click="modifyShare()" id="modifyShareBtn">Corriger</button>
                                          <button v-if="userUserId==loggedUserId" type="button" class="btn" @click="deleteShare()" id="deleteShareBtn">Effacer</button>
                                    </div>    

                                        <!-- <div class="card__info__heart2">
                                            <img class="card__info__heart2--r" src="icons/heart-regular.svg" alt="icon">
                                            <img class="card__info__heart2--s" src="icons/heart-solid.svg" alt="icon"> 
                                        </div> -->
                                    
                                </div>

                    </div>

                    <PostAComment/>

                   <!-- LES COMMENTAIRES -->
                    <div  id="commentDiv" 
                          v-for="item in apiCommentsResponse"
                          :key="item.shareShareId"
                          class="card__info--complement">
                                <div v-if="item.CommentId" class="card__info--complement--adress">
                                  <div>
                                    <p>{{ item.CommentText }}</p>
                                    <p hidden>{{ item.commentCommentId }} </p>
                                    <p hidden>{{ item.CommentId }} </p>
                                    </div>
                                  <div>
                                    <p> {{ item.user.UserFirstname }} {{ item.user.UserName }} / {{ item.user.UserDepartement }} / {{ item.user.UserRole }}</p> <!-- le commentateur du Share -->
                                  </div>
                                  <div></div>
                                          
                                          
                                        
                                          <p>{{ item.updatedAt }}</p>
                                          
                                         
                                </div>

                                <div class="btn-div">
                                        <button v-if="userUserId==loggedUserId" type="button" class="btn" @click="modifyShare()" id="modifyShareBtn">Corriger</button>
                                        <button v-if="userUserId==loggedUserId" type="button" class="btn" @click="deleteShare()" id="deleteShareBtn">Effacer</button>
                                </div>

                                <PostAComment/>
                                          

                    </div>
                </div>
          </section>
          
</template>

<script>
import PostAComment from "@/components/PostAComment.vue"
export default {
          name : 'ShareAlone',
          components: {
                              PostAComment
          },

          data(){
                    return{

                            loggedUserId: "",
                            ShareId: "", // Le Share
                            ShareText:"",
                            createdAt: "",
                            updatedAt:"",
                            userUserId:"",

                            UserName:"", // le createur du Share
                            UserFirstname:"", 
                            UserDepartement:"", 
                            UserRole:"",
                            UserEmail:"",

                            MediaUrl: "", // le Media du Share
                            MediaDescription : "", 
                            apiCommentsResponse : Array,
                            apiLength : Number

                    }
          },

          methods : {

            modifyShare() {},

            deleteShare() {},

          },



          beforeMount () {

                            const  Token = JSON.parse(sessionStorage.getItem("Token"));
                            const loggedUserId=JSON.parse(sessionStorage.getItem("UserId"))
                            const ShareId = new URL(window.location.href).hash.split("=")[1];

                            // LE SHARE       
                            fetch(`http://localhost:3000/api/shares/${ShareId}`, {
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
                              this.loggedUserId = loggedUserId;
                              this.ShareId = res.ShareId; //stocker cela qqpart
                              this.ShareText = res.ShareText;
                              this.createdAt = res.createdAt;
                              this.updatedAt = res.updatedAt;
                              this.userUserId = res.userUserId; //stocker cela qqpart

                              this.UserName = res.user.UserName
                              this.UserFirstname = res.user.UserFirstname
                              this.UserDepartement = res.user.UserDepartement
                              this.UserRole = res.user.UserRole
                              this.UserEmail = res.user.UserEmail

                              this.MediaUrl = res.medium.MediaUrl
                              this.MediaDescription= res.medium.MediaDescription
                            })
                            .catch( (error) => { alert(error);
                            });
                           
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
                              this.apiCommentsResponse=res
                              this.apiLength = res.length
                            })
                            .catch( (error) => { alert(error);
                            });
          },
}
</script>

<style scoped>

</style>