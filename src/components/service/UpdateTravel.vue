<template>
  <div style="text-align: center">
    <h1>旅行项目修改系统</h1>
    <Form ref="formValidate" :model="formValidate" :label-width="80" style="width: 30%;margin: auto">
      <FormItem label="旅行名" prop="tname">
        <Input v-model="formValidate.tname"></Input>
      </FormItem>
      <FormItem label="旅行费用" prop="tprice">
        <Input v-model="formValidate.tprice"></Input>
      </FormItem>
      <FormItem label="启程时间" prop="startTime">
        <Input v-model="formValidate.startTime"></Input>
      </FormItem>
      <FormItem label="回程时间" prop="endTime">
        <Input v-model="formValidate.endTime"></Input>
      </FormItem>

      <FormItem label="旅行详情" prop="tdestination">
        <Input v-model="formValidate.tdestination"></Input>
      </FormItem>

      <FormItem label="旅行类型" prop="types">
        <Select v-model="formValidate.typename" :placeholder="formValidate.typename">
          <Option v-for="ty in types" :value="ty.ttid" :key="ty">{{ty.typename}}</Option>
        </Select>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">添加</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        <Button @click="toHeIndex()" style="margin-left: 8px">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        formValidate: {
          tname: '',
          tprice: '',
          startTime:'',
          endTime:'',
          tdestination: '',
          typename:''
        },
        types:""
      }
    },
    mounted(){
      this.getType()
      this.getTravel()
    },
    methods: {
      handleSubmit (name) {
        this.axios({
          headers:{
            'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
          },
          method:'post',
          url:"http://localhost:8080/pansidongadmin/travel/updateTravel",
          data:this.qs.stringify({
            _method:'put',
            travalid:this.$route.query.travalid,
            tname:this.formValidate.tname,
            tprice:this.formValidate.tprice,
            startTime:this.formValidate.startTime,
            endTime:this.formValidate.endTime,
            tdestination:this.formValidate.tdestination,
            typename:this.formValidate.typename
          })
        })
          .then((response) => {          //这里使用了ES6的语法
            console.log(response)       //请求成功返回的数据
            this.$router.push({path: '/appHe'});
          }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      getType(){
        this.axios.get(
          'http://localhost:8080/pansidongadmin/travel/ListType')
          .then((response) => {          //这里使用了ES6的语法
            console.log(response)       //请求成功返回的数据
            this.types=response.data
          }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      },
      toHeIndex(){
        this.$router.push({path: '/appHe'});
      },
      getTravel(){
        this.axios.get(
          'http://localhost:8080/pansidongadmin/travel/getTravelById', {
            params: {
              travalid:this.$route.query.travalid
            }
          })
          .then((response) => {          //这里使用了ES6的语法
            console.log(response)       //请求成功返回的数据
            this.formValidate.tname=response.data.tname
            this.formValidate.tprice=response.data.tprice
            this.formValidate.startTime=response.data.startTime
            this.formValidate.endTime=response.data.endTime
            this.formValidate.tdestination=response.data.tdestination
            this.formValidate.typename=response.data.typename
          }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      }
    }
  }
</script>
