<template>
  <v-app>
    <v-main>
      <v-app-bar prominent flat light color="transparent">     
        <v-spacer></v-spacer>  
           <v-toolbar-title>
              <span class="page-title">{{title}}</span>   
           </v-toolbar-title>
          <v-spacer></v-spacer>
      </v-app-bar>
      <v-container>
      <router-view></router-view>          
      <footer>
        <div id="contact">
            <div v-if="lang['value'] === 'et'">Info ja tellimine   mobiil: {{mobile}}   email: {{email}}</div>
            <div v-if="lang['value'] === 'en'">Info and ordering   mobile: {{mobile}}   email: {{email}}</div>
            <div v-if="lang['value'] === 'ru'">Информация и заказ  мобильный: {{mobile}} письмо: {{email}}</div>
            <div id="langs">
             <v-select       
              :items="langs"
              v-model="lang"
              prepend-icon="language"
              return-object>
               <template v-slot:item="{ item }">
                  <img class="flag" :src="item.image"> 
                  </template>
              </v-select>
            </div>
        </div>

    </footer>
    
     </v-container>
    </v-main>
  </v-app>
</template>

<script>

import Vue from 'vue'
import VueRouter from 'vue-router'

import Frontend from './components/Frontend'
import Category from './components/Category'
import Product from './components/Product'
import { mapState } from 'vuex'

const router = new VueRouter({	
		mode: (process.env.NODE_ENV == "production" ? 'history': 'hash'),
		routes:[
      {
        path: '/',
        name: 'frontpage',
        component: Frontend
      },
      {
        path: '/:lang',
        name: 'frontpageLang',
        component: Frontend
      },
      {
        path: '/:lang/:category',
        name: 'category',
        component: Category
      },
      {
        path: '/:lang/:category/:product',
        name: 'product',
        component: Product
      },
      {
        path: '/admin',
        name: 'Admin',
        component: Admin
      },
    ]
})

Vue.use(VueRouter)

export default {
  name: 'App',
  router: router,
  data: () => ({
    title:"Jaani Sepikoda",
    email:"jaan5@hot.ee",
    mobile:"55629571"
  }),
  created(){
    this.$store.dispatch('load')
  },
  computed: {
    ...mapState(['langs']),
    lang:{
      get(){
        return this.$store.state.lang;
      },
      set(lang){
         this.$store.state.lang = lang; 
      }
    }
  }
};
</script>
<style scoped>

@font-face {  
	font-family: goudy ;  
	src: url(./assets/goudy.eot);  
}  

@font-face {  
	font-family: goudy ;  
	src: url(./assets/goudy.ttf ) format("truetype");  
}  

@font-face {  
	font-family: arkhip ;  
	src: url(./assets/Arkhip_font.ttf) format("truetype");  
} 

#app{
	background-color: #000;
	color: #fff;
	position:relative;
	background-image: url("./assets/base/css/tuli2.jpg");
	background-position: center bottom;
	background-repeat: no-repeat;
	background-attachment:fixed;

}

footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 30px;
    padding-bottom: 8px;
    text-align: center;
    font-size: 18px;
    color: #FDDE7C;
    background:rgba(10,10,10,0.5)
}

.page-title, .page-title:hover {
    text-align: center;
    text-decoration: none;
    font-family: goudy , georgia, verdana, helvetica, sans-serif;
    font-size: 50px;
    color: #FDDE7C;
}

#contact{
  width: 800px;
  margin: auto;
}

#langs{
  position:relative;
  top:-42px;
  left: 100%;
  width: 140px;
}

</style>>
