<template>
          <div class="">

                    <div v-for="item in apiResponse"
                         :key="item.ShareId"
                         class="" ><!--blog_post_header-->
                              <div class="" >
                                        <!-- date -->
                                        <p>{{ item.createdAt}}</p>
                                        <p>{{ item.updatedAt}}</p>
                              </div>

                              <!-- <div class="" >
                                         auteur
                              </div> -->

                              <div href="" class="" >
                                        <img src="" alt="" class=""/><!--/blog_post_image-->
                              </div>
                              <div class=""><!--blog_post_content_content-->
                                        <p>{{ item.ShareText }}</p><!--/blog_post_content_content-->
                              </div><!--/blog_post_content--><!--blog_post_readmore-->

                              <a href="" class="" ><!--blog_post_readmore_content--><!--options_json--><!--{"content":"","defaultValue":"Lire la suite"}--><!--/options_json-->Lire la suite<!--/blog_post_readmore_content-->
                              </a><!--/blog_post_readmore-->
                    </div>
          </div>
          
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

<style scoped>

</style>