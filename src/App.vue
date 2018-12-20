<template>
  <div>
    <Header></Header>
    <router-view></router-view>

<!-- <img style="margin:auto" width="33%" src="@/assets/img/logo.png" />
    <form name="form">
        <select name="sel" v-model="n.mn" >
            <option name="ad"  value="1" >1</option>
            <option name="ad" value="2" >2</option>
        </select>
        <button type="button" @click="cl">submit</button>
    </form>

    <span>~~~~~~~~~~~~~~~~~~~~~~~~~{{n.mn}}</span> -->
    </div>
</template>

<script>
import Header from '@/components/shared/Header.vue';

export default {
  name: 'App',
  components:{Header:Header},
  data(){
      return {
          n:{mn:1}
      }
  },
  methods:{
      cl(){
        if(this.n.mn == 1){
            this.n.mn++;
        }else{
            this.n.mn -=1;
        }
      }
  }
}
</script>

<style>

</style>
