<template>
          <div class="">

                    <div class="" ><!--blog_post_header-->
                              <h2 class="" >
                                        <a href="" class="" >Share</a>
                              </h2>
                              <a href="" class="" >
                                        <img src="" alt="" class=""><!--/blog_post_image-->
                              </a><!--blog_post_content-->
                              <div class=""><!--blog_post_content_content-->
                                        <p  v-bind="ShareText"></p><!--/blog_post_content_content-->
                              </div><!--/blog_post_content--><!--blog_post_readmore-->
                              <a href="" class="" ><!--blog_post_readmore_content--><!--options_json--><!--{"content":"","defaultValue":"Lire la suite"}--><!--/options_json-->Lire la suite<!--/blog_post_readmore_content-->
                              
                              </a><!--/blog_post_readmore-->
                    </div>
          </div>
          
</template>

<script>
export default {
          name : 'ShareAlone',
          data(){
                    return{
                            ShareId: "",
                            ShareText:"",
                            createdAt: "",
                            updatedAt:"",
                            userUserId:"",

                            UserName:"", // in users where UserId = userUserId
                            UserFirstname:"", // in users where UserId = userUserId
                            UserDepartement:"", // in users where UserId = userUserId
                            UserRole:"", // in users where UserId = userUserId
                            UserEmail:"", // in users where UserId = userUserId

                            MediaUrl: "", // in media where  ShareId = shareShareId
                            MediaDescription : "", // in media where  ShareId = shareShareId

                            //CommentsArray:"" //in comments where  ShareId = shareShareId
                    }
          },

           beforeMount () {

//     const  UserId = JSON.parse(sessionStorage.getItem("UserId"));
    const  Token = JSON.parse(sessionStorage.getItem("Token"));
    const ShareId = "06e5a3ca-ab63-4eea-83c5-8c7c09b555f8"

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
            this.ShareId = res.ShareId; //stocker cela qqpart
            this.ShareText = res.ShareText;
            this.createdAt = res.createdAt;
            this.updatedAt = res.updatedAt;
            this.userUserId = res.userUserId; //stocker cela qqpart
          })
          .catch( (error) => { alert(error);
          });

           // get one in user where  userUserId = UserId
          // fetch(`http://localhost:3000/api/auth/${UserId}`, {
          // method: 'GET',
          // headers: {"Content-Type": "application/json", 
          //           "Authorization": "Bearer " + Token
          //  },
          //  mode : "cors"
          // })
          // .then((res) => {
          //   return res.json();
          // })
          // .then((resJson) => {
          //   return resJson;
          // })
          // .then((res) =>{
          //   this.UserName = res.UserName;
          //   this.UserFirstname = res.UserFirstname;
          //   this.UserPresentation = res.UserPresentation;
          //   this.UserDepartement = res.UserDepartement;
          //   this.UserRole = res.UserRole;
          // })
          // .catch( (error) => { alert(error);
          // });

           // get one in media where  shareShareId = ShareId
          fetch(`http://localhost:3000/api/media/${ShareId}`, {
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
             this.MediaUrl = res.MediaUrl;
            this.MediaDescription = res.MediaDescription;
          })
          .catch( (error) => { alert(error);
          });

         // get all comments where shareShareId = ShareId
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
          .then((resJson) => {
            return resJson;
          })
          .then((res) =>{
            
             
              this.CommentsArray = res.CommentsArray;
            
            
          })
          .catch( (error) => { alert(error);
          });
        },
}
</script>

<style scoped>

</style>