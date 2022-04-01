<template>
          <section class="mainrestaurants">
                <div id="restaurants" class="restaurants">
                  <a id="link" href="OUVRIR" v-for="item in apiResponse"
                            :key="item.ShareId">
                    <div class="card"  >
                                
                                <div class="card__image">
                                    <div class="card__image--img">
                                            <img :src='item.medium.MediaUrl' :alt='item.medium.MediaDescription' class=""/>
                                    </div>
                                    <div class="card__image--img card__image--new">
                                        <p>Nouveau</p>
                                    </div>
                                </div>

                                <div class="card__info">

                                  <div>
                                    <p class="card__info--name">{{ item.ShareText }}</p>
                                    <a href="" class="" >
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
                                          <p>Nombre de commentaires</p>
                                          <p> {{}}</p>
                                   </div>
                                        <!-- <div class="card__info__heart2">
                                            <img class="card__info__heart2--r" src="icons/heart-regular.svg" alt="icon">
                                            <img class="card__info__heart2--s" src="icons/heart-solid.svg" alt="icon"> 
                                        </div> -->
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
                    return{
                            apiResponse:""
                    }
          },

          beforeMount () {
          //     const  UserId = JSON.parse(sessionStorage.getItem("UserId"));
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