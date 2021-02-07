
<template>
<v-container>
   <v-row class="frontpage">
      <v-col
        v-for="c in db.categories" 
        :key="c"
        class="d-flex child-flex catalogcolumn"
        cols="4"
    >
  <div  class="imageheader">
      <router-link  :to="getCatalogLink(c)" class="imageLink">
        {{c.name}}
      </router-link>
  </div>
    <div class="imgcontainer">
      <router-link  :to="getCatalogLink(c)" >
      <v-img
        :src="getPreview(c)"
        aspect-ratio="1"
        max-height=180  
        max-width=180   
        class="catalogimg"            
      >
    
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="orange"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      </router-link>
    </div>
    
    </v-col>
   </v-row>
</v-container>
</template>
<script>

import { mapState } from 'vuex'

export default {
  name: 'frontend',
  data: () => ({
    
  }),
  created(){
    let selected = this.langs.find(l=> l.value === this.$route.params.lang)
    if(selected != undefined){
      this.lang = selected
    }
  },
  computed: {
    ...mapState(['lang','langs','db']),
    lang:{
      get(){
        return this.$store.state.lang;
      },
      set(lang){
         this.$store.commit("selectLanguage",lang)
      }
    }
  },
  
  methods:{
    getPreview(catalog){
      return `/catalog/thumbnail2/${catalog.products[0].key}.jpeg`
    },
    getCatalogLink(category){
      return `${this.lang.value}/${category.name}`
    }
  }
}
</script>
<style>

.catalogcolumn{
 flex-direction: column;
}

.imageheader{
  text-align: center;
    
}

.v-application a.imageLink , .v-application a.imageLink:visited {
text-decoration: none;
    font-family: goudy , georgia, verdana, helvetica, sans-serif;
    font-size: 26px;
    color: #FDDE7C;
}

.frontpage{
  padding-top: 50px
}

.imgcontainer{
  padding: 4px 20px 50px
}

.catalogimg{
  margin: auto;
  border: 4px solid rgba(10,10,10,0.2);
}

</style>