import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        lang:{value:"et",text:"eesti"},
        langs:[
          {value:"et",text:"Eesti",image:"/assets/ee.png"},
          {value:"en",text:"English",image:"/assets/en.png"},
          {value:"ru",text:"Rусский",image:"/assets/ru.png"}
        ],
        db:{
            categories:{
              category1:{
                name: "Category1",
                name_en: "CategoryEN",
                name_ru: "CategoryRU",
                products:[
                  {
                    key:"123",
                    name:"",
                    description:"",
                    photo:"123",
                    details:["1.jpge"],
                    translation_en:"",
                    translation_ru:"",
                    position:1,
                    size : {
                      width: 1024,
                      height: 768,
                      proportion : 0.75
                    },
                    published:true
                 }
              ]
            }
         }
        }
    },
    mutations:{
        loadDb(state,db){
            state.db = db;
        },
        selectLanguage(state,lang){
            state.lang = lang
        }
    },
    actions:{
        load (store) {
            fetch("/db.json")
                .then(r => r.json())
                .then(json => {
                    store.commit('loadDb', json)
            },
            response => {
            console.log('Error loading json:', response)
            });
            
        }
    }
})