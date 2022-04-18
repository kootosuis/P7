<template>
           <section class="mainshares">
                <div id="shares" class="shares">

                    <!-- LE SHARE -->
                    <div class="card" id="shareAlone" >
                                
                                <div class="card__image" >
                                    <div class="card__image--img" v-if="MediaUrl.split(`/07media/`)[1] == `feather.png`">
                                      <img  :src='MediaUrl' style="width : 50px" />           
                                    </div>

                                    <div class="card__image--img" v-else >
                                      <img :src='MediaUrl'/>            
                                    </div>
                                    
                                    <!-- <div class="card__image--img card__image--new">
                                        <p>Nouveau</p>
                                    </div> -->
                                </div>
                    
                                <div class="card__info">

                                    <div>
                                      <p class="card__info--text card__info--sharetext">{{ ShareText }}</p>
                                    </div>
                                
                                    

                                    <div class="card__info--complement">

                                        <div class="card__info--complement--adress">
                                          
                                          <p> {{ UserFirstname}} {{ UserName}} / {{ UserDepartement}} / {{ UserRole}} </p>
                                          <p hidden>{{ userUserId }}</p>
                                          <p>{{ formatDate(updatedAt) }}</p>
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

                    <PostAComment v-if="!userUserId==loggedUserId"/>

                   <!-- LES COMMENTAIRES -->
                    <div  id="commentDiv" 
                          v-for="item in apiCommentsResponse"
                          :key="item.shareShareId"
                          class="card__info card__info--2">
                                <div v-if="item.CommentId">
                                  <div>
                                    <p class="card__info--text card__info--sharetext">{{ item.CommentText }}</p>
                                  </div>
                                  <div class="card__info--complement">
                                    <div class="card__info--complement--adress">
                                       <p> {{ item.user.UserFirstname }} {{ item.user.UserName }} / {{ item.user.UserDepartement }} / {{ item.user.UserRole }}</p>
                                       <p>{{ formatDate(item.updatedAt) }}</p> <!-- le commentateur du Share -->
                                       <p hidden>{{ item.commentCommentId }} </p>
                                       <p hidden>{{ item.CommentId }} </p>
                                    </div>
                                   
                                  </div>
 
                                </div>

                                <div class="btn-div">
                                        <button v-if="userUserId==loggedUserId" type="button" class="btn" @click="modifyShare()" id="modifyShareBtn">Corriger</button>
                                        <button v-if="userUserId==loggedUserId" type="button" class="btn" @click="deleteShare()" id="deleteShareBtn">Effacer</button>
                                </div>

                                <PostACommentOnAComment v-if="!userUserId==loggedUserId"/>
                                          

                    </div>
                </div>
          </section>
          
</template>

<script>
import PostAComment from "@/components/PostAComment.vue"
import PostACommentOnAComment from "@/components/PostACommentOnAComment.vue"
import dayjs from 'dayjs'
require('dayjs/locale/fr')
dayjs.locale('fr')

export default {
          name : 'ShareAlone',
          components: {
                              PostAComment,
                              PostACommentOnAComment
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

            formatDate(dateString) {
                            const date = dayjs(dateString);
                                // Then specify how you want your dates to be formatted
                            return date.format('dddd D MMMM YYYY , HH:mm');
                      },

            modifyShare() {},

            // confirm(alert)

            deleteShare() {

                          const  Token = JSON.parse(sessionStorage.getItem("Token"));
                          // const loggedUserId=JSON.parse(sessionStorage.getItem("UserId"))
                          const ShareId = new URL(window.location.href).hash.split("=")[1];
                          const Share = {
                            "ShareId" : ShareId
                          }

                          confirm("Le share et tous les commentaires associés vont être effacés")

                          fetch(`http://localhost:3000/api/shares/${ShareId}`, {
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
                            })
                            .catch( (error) => { alert(error);
                            })
            },


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

<style lang="scss" scoped>

#shareAlone {
  background-color: rgb(64, 203, 196, .25);
}
.card__info--sharetext{
  background-color: white;
  padding: 2rem;
}
.card__image img{
  width:100%;
  max-width: 600px;
  max-height:600px;
}

// @media (max-width: 500px) {
// .card__image img{
//   width:100%;
// }
// }

</style>