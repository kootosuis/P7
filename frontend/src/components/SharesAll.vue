<template>
          <section class="mainshares">
                <div id="shares" class="shares">
                      <a id="link" v-for="item in apiResponse"
                        :key="item.ShareId"
                        @click="displayOneShare(item.ShareId)">

                            <div class="card">
                                    <div class="card__image">
                                            <div class="card__image--img">
                                              <img v-if="item.medium.MediaUrl.split(`/07media/`)[1] != `feather.png`" :src='item.medium.MediaUrl'/>
                                              <img v-else style="width : 30px" :src='item.medium.MediaUrl'/>             
                                            </div>
                                    </div>

                                    <div class="card__info">
                                            <div v-if="item.medium.MediaUrl.split(`/07media/`)[1] == `feather.png`">
                                                <p class="card__info--text textLimited" style="height : 150px">{{ item.ShareText }}</p>
                                            </div>
                                            <div v-else>
                                                <p class="card__info--text textLimited">{{ item.ShareText }}</p>
                                            </div>
                                            <div class="readMore" @click="displayOneShare(item.ShareId)">
                                                    En savoir plus...
                                            </div>

                                            <div class="separator"></div>
                                            
                                            <div class=card__info--complement>
                                                <div class="card__info--complement--adress ">
                                                    <p> {{item.user.UserFirstname}} {{item.user.UserName}}</p>
                                                    <p> Service : {{item.user.UserDepartement}} <br/> Rôle : {{item.user.UserRole}}</p>
                                                    <p hidden>{{ item.userUserId }}</p>
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

                    beforeCreate () {

                      
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
                    .then((res) =>{
                      this.apiResponse=res
                    })
                    .catch( (error) => { alert(error);
                    });
                    },
          }
</script>

<style lang="scss" scoped>

.readMore {
  text-align: right;
  font-style:italic;
  font-size:13px;
}
.textLimited{
  max-height:95px;
  max-width:320px;
  overflow: hidden;
  text-overflow: ellipsis; // cela ne marche que si le texte n'est que sur une ligne : chercher une solution
  margin: 0.5rem
}

.card__image img{
  width:320px;
}

#line {
  margin:2rem 0;
  display: flex;
  height: 2px;
  border: solid 1px  #40cbc4;
}

</style>