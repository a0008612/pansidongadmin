<template>
  <div>
    <div style="width: 15%;float: left;text-align: center">
      <h1>旅行类型</h1>
      <hr style="width: 80%;margin: auto">
      <span style="font-size: 20px" @click="getData()">全部</span>
      <div v-for="ty in types">
        <span style="font-size: 20px" @click="listTravelByType(ty.ttid)">{{ty.typename}}</span>
      </div>
      <span style="font-size: 20px" @click="toGo()">旅行首页</span>
    </div>
    <div style="width: 85%;float:right">
      <div style="float: left;text-align: center">
        <Button type="info" style="width: 100px;height: 50px;font-size: 20px" @click="toAddTravel()">添加</Button>
        <Button type="error" style="width: 100px;height: 50px;font-size: 15px;" @click="deleteTravels()">批量删除</Button>
      </div>

      <div style="float: right;margin-right: 30px" >
        <Input id="search" search enter-button="搜索" placeholder="请输入旅行项目名" style="height: 30px;width: 300px" @on-search="searchTravel"  v-model="searchContext"/>
      </div>

      <div style="clear: both"></div>
      <Table stripe :columns="columns1" :data="travelList" ref="selection"></Table>
    </div>
    <div style="clear: both"></div>

    <div style="text-align: center">
      <Page :total="totalNum" :page-size="pageSize" show-total @on-change="pageChange"></Page>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  export default {
    data () {
      return {
        columns1: [
          {
            type:'selection',
            width:60,
            align:'center'
          },
          {
            title: '旅行编号',
            width:120,
            align:'center',
            key: 'travalid'
          },
          {
            title: '旅行项目名',
            align:'center',
            key: 'tname'
          },
          {
            title: '旅行费用',
            width:120,
            align:'center',
            key: 'tprice'
          },
          {
            title: '旅行图片',
            align:'center',
            key: 'timage',
            render: (h, params) => {
              return h("img", {
                attrs: {
                  src: "../../../static/" + params.row.timage,
                  style: "width: 160px;border-radius: 15px;margin:10px"
                }
              });
            }
          },
          {
            title: '启程时间',
            align:'center',
            key: 'startTime'
          },
          {
            title: '回程时间',
            align:'center',
            key: 'endTime'
          },
          {
            title: '旅行详情',
            align:'center',
            key: 'tdestination'
          },
          {
            title: '旅行类型',
            width:120,
            align:'center',
            key: 'typename'
          },
          {
            title:'操作',
            key:'action',
            title: "操作",
            render: (h, params) => {
              return h("div", [
                h("Button",
                  {
                    props: {
                      type: "info"
                    },
                    style:{
                      width:'60px',
                      height:'40px'
                    },
                    on: {
                      click: () => {
                        this.$router.push({path: '/updateTravel',query:{travalid:this.travelList[params.index].travalid}});
                      }
                    }
                  }, "编辑"),
                h("Button",
                  {
                    style: {
                      width:'60px',
                      height:'40px',
                      marginLeft: "20px"
                    },
                    props: {
                      type: "error"
                    },
                    on: {
                      click: () => {
                        this.axios({
                          headers:{
                            'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
                          },
                          method:'post',
                          url:"http://localhost:8080/pansidongadmin/travel/deleteTravel",
                          data:this.qs.stringify({
                            _method:"delete",
                            travalid:this.travelList[params.index].travalid,
                            currentPage:this.currentPage
                          })
                        })
                          .then((response) => {          //这里使用了ES6的语法
                            console.log(response)       //请求成功返回的数据
                            this.travelList=response.data.listData
                            this.pageSize=response.data.pageSize
                            this.totalNum=response.data.totalNum
                          }).catch((error) => {
                          console.log(error)       //请求失败返回的数据
                        })
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ],
        travelList:[],
        pageSize:'',
        totalNum:'',
        currentPage:1,
        types:'',
        searchContext:'请输入旅行名',
        ttid:0
      }
    },
    mounted(){
      this.getData();
      this.getType()
    },
    methods:{
      searchTravel(){
        alert(this.searchContext)
      },
      pageChange(index) {
        this.currentPage = index;
        if(this.ttid==0){
          this.getData();
        }else{
          this.listTravelByType(this.ttid)
        }
      },
      getData(){
        this.ttid=0;
        this.axios.get(
          'http://localhost:8080/pansidongadmin/travel/ListTrip', {
            params: {
              currentPage:this.currentPage
            }
          })
          .then((response) => {          //这里使用了ES6的语法
            console.log(response)       //请求成功返回的数据
            this.travelList=response.data.listData
            this.pageSize=response.data.pageSize
            this.totalNum=response.data.totalNum
          }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
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
      listTravelByType(ttid) {
        this.ttid=ttid;
        this.axios.get(
          'http://localhost:8080/pansidongadmin/travel/ListTripByType', {
            params: {
              ttid: ttid,
              currentPage:this.currentPage
            }
          })
          .then((response) => {          //这里使用了ES6的语法
            console.log(response)       //请求成功返回的数据
            this.travelList=response.data.listData
            this.pageSize=response.data.pageSize
            this.totalNum=response.data.totalNum

          }).catch((error) => {
            console.log(error)
          })
      },
      toAddTravel(){
        this.$router.push({path: '/appTravel'});
      },
      searchTravel(){
        this.axios.get(
          'http://localhost:8080/pansidongadmin/travel/searchTravel',{
              params:{
                currentPage:this.currentPage,
                name:this.searchContext
              }
          })
          .then((response) => {          //这里使用了ES6的语法
            console.log(response)       //请求成功返回的数据
            this.travelList=response.data.listData
            this.pageSize=response.data.pageSize
            this.totalNum=response.data.totalNum
          }).catch((error) => {
          console.log(error)
        })
      },
      deleteTravels(){
        var ici = $(".ivu-checkbox-input")
        var str=''
        for(var i=1;i<ici.length;i++){
          console.log(ici[i].checked)
          if(ici[i].checked==true){
            str+=this.travelList[i-1].travalid+"::"
          }
        }
        this.axios({
          headers:{
            'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
          },
          method:'post',
          url:"http://localhost:8080/pansidongadmin/travel/deleteTravels",
          data:this.qs.stringify({
            _method:"delete",
            currentPage:this.currentPage,
            ids:str
          })
        })
          .then((response) => {          //这里使用了ES6的语法
            console.log(response)       //请求成功返回的数据
            this.travelList=response.data.listData
            this.pageSize=response.data.pageSize
            this.totalNum=response.data.totalNum
          }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      },
      toGo(){
        window.location.href='../../../static/indexHe.html'
      }
    }
  }
</script>
