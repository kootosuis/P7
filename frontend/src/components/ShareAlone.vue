<template>
           <section class="mainshares shares">

                    <!-- LE SHARE -->
                    <div class="card" id="shareAlone" >

                                <div class="card__image" >
                                    <div class="card__image--img" v-if="MediaUrl.split(`/07media/`)[1] == `feather.png`">
                                      <img  :src='MediaUrl' style="width : 50px" />           
                                    </div>

                                    <div class="card__image--img" v-else >
                                      <img :src='MediaUrl'/>            
                                    </div>
                                </div>
                    
                                <div class="card__info">

                                    <!-- le texte du share -->
                                    <div id="oldShareText" v-show="modifyForm">
                                      <p class="card__info--text card__info--sharetext">{{ ShareText }}</p>
                                    </div>

                                    <!-- la fenêtre qui s'ouvre pour modifier le texte du share -->
                                    <div id="newShareText" v-show="!modifyForm">
                                       <form     
                                          type="multipart/form-data"
                                          method="PUT" 
                                          name="form" 
                                          id="ShareToBeCorrected"
                                          
                                          @submit = "correctShare"
                                          class="formulaire">

                                                <!--Le Media -->
                                                <!-- <div class="formLine">
                                                          <label    
                                                                    for="Media" 
                                                                    class="label">Votre image, votre GIF</label>
                                                          <input    class="input"
                                                                    form="ShareToBeCorrected" 
                                                                    @input="checkForm"
                                                                    @change="uploadImage($event)"
                                                                    type="file"
                                                                    accept="image/png, image/jpg, image/jpeg, image/png, image/gif"
                                                                    multiple
                                                                    id="Media" 
                                                                    name="file" 
                                                                  >
                                                </div> -->

                                                <!-- <div id="formImagePreview">
                                                          <img v-if="file" :src="file" />
                                                </div> -->
                                                
                                                <!--Le Share-->
                                                <div class="formLine">
                                                          <label    
                                                                    for="ShareText" 
                                                                    class="label">Votre nouveau texte</label>
                                                          <textarea class="bigtextarea textarea input"
                                                                    form="ShareToBeCorrected" 
                                                                    type="textarea"
                                                                    id="ShareText"
                                                                    name="ShareText"
                                                                    v-model="ShareText"
                                                                    ></textarea>
                                                </div>

                                                <div class="btn-div">
                                                          <button type="submit" class="btn" @submit="doNotModify()" id="CancelBtn">Annuler</button>
                                                          <button type="submit" class="btn" @submit="correctShare()" id="ShareBtn">Mettre à jour</button>
                                                </div>
                        
                                      </form>
                                    </div>

                                    <!-- les infos sur le share (auteur, date, commentaires) -->

                                    <div class="card__info--complement">

                                        <div class="card__info--complement--firstline">
                                          
                                          <p> {{ UserFirstname}} {{ UserName}} / {{ UserDepartement}} / {{ UserRole}} </p>
                                          <p v-if="isAdmin"><router-link :to="`/modifyByAdmin/${ userUserId }`">Accéder aux données utilisateur.</router-link></p>
                                          <p hidden>{{ userUserId }}</p>
                                          <p>{{ formatDate(updatedAt) }}</p>
                                          <p>{{ apiLength }} commentaires</p>
                                          
                                        </div>
                                    </div>

                                    <!-- le bouton pour modifier le texte du share  ou l'effacer quand on en est l'auteur-->
                                    <div id="modifyOrDelete" class="btn-div" v-show="modifyForm">
                                          <button v-if="userUserId===loggedUserId || isAdmin" type="button" class="btn" @click="GoToCorrectShare()" id="modifyShareBtn">Corriger</button>
                                          <button v-if="userUserId===loggedUserId || isAdmin" type="button" class="btn" @click="deleteShare()" id="deleteShareBtn">Effacer</button>
                                    </div>    
                                </div>

                    </div>

                    <!-- LE BOUTON (et la section) POUR COMMENTER -->
                    <!-- n'apparait que si l'auteur du share n'est pas le user loggé -->
                    <PostAComment v-if="loggedUserId!=userUserId"/>

                    <!-- LES COMMENTAIRES -->

                    <ShareAloneComments/>
                     
               
          </section>
          
</template>

<script>
import PostAComment from "@/components/PostAComment.vue"
import ShareAloneComments from "@/components/ShareAloneComments.vue"
import dayjs from 'dayjs'
require('dayjs/locale/fr')
dayjs.locale('fr')

export default {
          name : 'ShareAlone',
          components: {
                              PostAComment,
                              ShareAloneComments,
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
                            UserHabilitation:{
                              type : Boolean,
                              default : false
                            },

                            MediaUrl: "", // le Media du Share
                            MediaDescription : "", 
                            apiCommentsResponse : Array,
                            apiLength : Number,

                            modifyForm :{
                              type: Boolean,
                              default: true },
                            
                            isAdmin :{
                              type: Boolean,
                              default: false },

                    }
          },

          methods : {

            

            formatDate(dateString) {
                            // import de la donnée
                            const date = dayjs(dateString);
                            // formatage
                            return date.format('dddd D MMMM YYYY , HH:mm');
                      },

            GoToCorrectShare() {
                  this.modifyForm = false;
            },
            doNoCorrect(){
                  this.modifyForm = true;
            },

            correctShare(){
                    
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
            deleteShare() {

                          const  Token = JSON.parse(sessionStorage.getItem("Token"));
                          // const loggedUserId=JSON.parse(sessionStorage.getItem("UserId"))
                          const ShareId = new URL(window.location.href).hash.split("=")[1];
                          const Share = {
                            "ShareId" : ShareId
                          }

                          const deleteShare = confirm("Le share et tous les commentaires associés vont être effacés")

                          if (deleteShare){
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
                          }else{
                             this.$router.push({ name: 'wall' });
                          }
            },
          },

          beforeMount () {
                            const  Token = JSON.parse(sessionStorage.getItem("Token"));
                            const loggedUserId=JSON.parse(sessionStorage.getItem("UserId"))
                            const ShareId = new URL(window.location.href).hash.split("=")[1];

                             
                            this.isAdmin = sessionStorage.getItem("isAdmin");

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

                              this.UserName = res.user.UserName;
                              this.UserFirstname = res.user.UserFirstname;
                              this.UserDepartement = res.user.UserDepartement;
                              this.UserRole = res.user.UserRole;
                              this.UserEmail = res.user.UserEmail;

                              this.MediaUrl = res.medium.MediaUrl;
                              this.MediaDescription= res.medium.MediaDescription;
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



</style>