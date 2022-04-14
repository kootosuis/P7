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
                                    <p class="card__info--text">{{ item.ShareText }}</p>
                                    <a href="" class="" 
                                       @click="displayOneShare(item.ShareId)">
                                      Lire la suite...
                                    </a>
                                  </div>
                                    
                                  <div class=card__info--complement>
                                        <div class="card__info--complement--adress">
                                          <p> {{item.user.UserFirstname}} {{item.user.UserName}}</p>
                                          <p> Service : <span>{{item.user.UserDepartement}}</span> {{item.user.UserRole}}</p>
                                          <p hidden>{{ item.userUserId }}</p>
                                          <!-- ICI  --> 
                                        <!-- récuperer le nbre de comments ? -->
                                          <p> {{item.comments.length }} commentaire<x v-if="item.comments.length>1">s</x></p>
                                          <p>{{ formatDate(item.updatedAt) }}</p>
                                   </div>
                                </div>
                         </div>  
                     </div>          
                  </a>
               </div>
          </section>  
</template>

<script>

          import dayjs from 'dayjs'
          require('dayjs/locale/fr')
          dayjs.locale('fr')

          export default {
                    name : 'ShareAll',

                    data(){
                              return {
                                      apiResponse: Array,
                                      commentLength : Number
                              }
                    },

                    methods : {
                      displayOneShare(id) {
                      this.$router.push({name : 'wallAlone', params : {id : id}})
                      },

                      formatDate(dateString) {
                            const date = dayjs(dateString);
                                // Then specify how you want your dates to be formatted
                            return date.format('dddd D MMMM YYYY , HH:mm');
                      },
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