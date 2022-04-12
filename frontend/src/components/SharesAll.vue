<template>
          <section class="mainshares">
                <div id="shares" class="shares">
                  <a id="link" v-for="item in apiResponse"
                               :key="item.ShareId"
                               @click="displayOneShare(item.ShareId)">

                    <div class="card"  >
                                <div class="card__image">
                                    <div class="card__image--img">
                                      <img :src='item.medium.MediaUrl'  class=""/>            
                                    </div>
                                </div>

                                <div class="card__info">
                                  <div>
                                    <p class="card__info--name">{{ item.ShareText }}</p>
                                    <a href="" class="" 
                                       @click="displayOneShare(item.ShareId)">
                                      Lire la suite...
                                    </a>
                                  </div>
                                    
                                  <div class=card__info--complement>
                                        <div class="card__info--complement--adress">
                                          <p>{{ item.createdAt }}</p>
                                          <p>{{ item.updatedAt }}</p>
                                          <p> {{item.user.UserFirstname}}</p>
                                          <p> {{item.user.UserName}}</p>
                                          <p> {{item.user.UserDepartement}}</p>
                                          <p> {{item.user.UserRole}}</p>
                                          <p hidden>{{ item.userUserId }}</p>
                                          <!-- ICI  --> 
                                        <!-- récuperer le nbre de comments ? -->
                                          <p>Nombre de commentaires</p>
                                          <p> {{}}</p>
                                   </div>
                                </div>
                         </div>  
                     </div>          
                  </a>
               </div>
          </section>  
</template>

<script>
          export default {
                    name : 'ShareAll',

                    data(){
                              return {
                                      apiResponse: Array
                              }
                    },

                    methods : {
                      displayOneShare(id) {
                      this.$router.push({name : 'wallAlone', params : {id : id}})
                      }
                    },

                    beforeMount () {
                    const  Token = JSON.parse(sessionStorage.getItem("Token"));
                    fetch(`http://localhost:3000/api/shares`, {
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
                      this.apiResponse=res
                    })
                    .catch( (error) => { alert(error);
                    });
                    },
          }
</script>

<style lang="scss" scoped>

</style>