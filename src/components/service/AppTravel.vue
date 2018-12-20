<template>
  <div style="text-align: center">
    <h1>旅行项目添加系统</h1>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="width: 30%;margin: auto">
      <FormItem label="旅行名" prop="tname">
        <Input v-model="formValidate.tname" placeholder="请输入旅行的名字"></Input>
      </FormItem>
      <FormItem label="旅行费用" prop="tprice">
        <Input v-model="formValidate.tprice" placeholder="请输入旅行的名字"></Input>
      </FormItem>

      <FormItem label="启程时间">
        <Row>
          <Col span="11">
          <FormItem prop="sdate">
            <DatePicker type="date" placeholder="选择日期" v-model="formValidate.sdate"  @on-change="formValidate.sdate=$event"></DatePicker>
          </FormItem>
          </Col>
          <Col span="2" style="text-align: center">-</Col>
          <Col span="11">
          <FormItem prop="stime">
            <TimePicker type="time" placeholder="选择时间" v-model="formValidate.stime"></TimePicker>
          </FormItem>
          </Col>
        </Row>
      </FormItem>

      <FormItem label="回程时间">
        <Row>
          <Col span="11">
          <FormItem prop="edate">
            <DatePicker type="date" placeholder="选择日期" v-model="formValidate.edate"  @on-change="formValidate.edate=$event"></DatePicker>
          </FormItem>
          </Col>
          <Col span="2" style="text-align: center">-</Col>
          <Col span="11">
          <FormItem prop="etime">
            <TimePicker type="time" placeholder="选择时间" v-model="formValidate.etime"></TimePicker>
          </FormItem>
          </Col>
        </Row>
      </FormItem>

      <FormItem label="旅行详情" prop="tdestination">
        <Input v-model="formValidate.tdestination" placeholder="请输入旅行的详情"></Input>
      </FormItem>

      <FormItem label="旅行类型" prop="types">
        <Select v-model="formValidate.typename" placeholder="请选择旅行类型">
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
          sdate: '',
          stime: '',
          edate: '',
          etime: '',
          tdestination: '',
          typename:''
        },
        types:"",
        ruleValidate: {
          tname: [
            { required: true, message: '旅行名不能为空', trigger: 'blur' }
          ],
          tprice: [
            { required: true, message: '价格不能为空', trigger: 'blur' }
          ],
          sdate: [
            { required: true, type: 'date', message: '日期不能为空', trigger: 'change' }
          ],
          stime: [
            { required: true, type: 'string', message: '时间不能为空', trigger: 'change' }
          ],
          edate: [
            { required: true, type: 'date', message: '日期不能为空', trigger: 'change' }
          ],
          etime: [
            { required: true, type: 'string', message: '时间不能为空', trigger: 'change' }
          ],
          tdestination: [
            { required: true, message: '旅行详情不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    mounted(){
      this.getType()
    },
    methods: {
      handleSubmit (name) {
        this.axios({
          headers:{
            'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
          },
          method:'post',
          url:"http://localhost:8080/pansidongadmin/travel/addTravel",
          data:this.qs.stringify({
            tname:this.formValidate.tname,
            tprice:this.formValidate.tprice,
            startTime:this.formValidate.sdate+" "+this.formValidate.stime,
            endTime:this.formValidate.edate+" "+this.formValidate.etime,
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
      }
    }
  }
</script>
