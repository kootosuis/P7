<template>
  <div class="pt-5">
    <form @submit.prevent="submitCategory">
      <div class="form-group">
        <label for="categoryName">Category name</label>
        <input v-model.lazy="categoryName" value="categoryName" type="text" class="form-control" id="categoryName" aria-describedby="categoryNameHelp" placeholder="Enter category name">
      </div>
      <br>
      <div class="form-group">
        <label for="description">Description</label>
        <input v-model="description" type="text" class="form-control" id="description" placeholder="Enter description">
      </div>
        <br>
      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>
  </div>
</template>


<script>
export default {
  name: "EditCategory",
  data() {
    return {
      categoryName: '',
      description: '',
    }
  },
  beforeMount () {
    this.$axios.get(`/api/categories/${this.$route.params.id}`,{
        id: this.$route.params.id
      }).then((response) => {
      console.log(response.data)
      this.categoryName = response.categoryName;
      this.description = response.description;
    });    },
  methods: {
    submitCategory() {
      this.$axios.post('/api/categories', {
        categoryName: this.categoryName,
        description: this.description,
      }).then(response => {
        console.log(response)
        this.$router.push({name: 'Categories'});
      })
    },   
    initialize () {
     
     },
  },
}
</script>
<style scoped>
</style>