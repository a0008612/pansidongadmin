<template>
    <div>
        <Menu mode="horizontal" :theme="theme1" active-name="2">
        <MenuItem name="1" >
            <div @click="toIndex()">
                <Icon type="ios-paper"></Icon>
                <span>首页</span>
            </div>
        </MenuItem>
        <MenuItem name="2" >
        <div @click="toHe()">
            <Icon type="ios-people"></Icon>
            Luis He
        </div>
        </MenuItem>
        <MenuItem name="3" >
        <div @click="toYu()">
            <Icon type="ios-people"></Icon>
            Ajax Yu
        </div>
        </MenuItem>
        
        <MenuItem name="4">
        <div  @click="toCao()">
            <Icon type="ios-people"></Icon>
            Fatter Cao
        </div>
        </MenuItem>
        
        
        <MenuItem name="5">
        <div @click="toSun()">
            <Icon type="ios-people"></Icon>
            Noddle Sun
        </div>
        </MenuItem>
        
        <MenuItem name="6">
        <div @click="toSong()">
            <Icon type="ios-people"></Icon>
            Beauty Song
        </div>
        </MenuItem>

        <MenuItem name="7">
        <div @click="toRuan()">
            <Icon type="ios-people"></Icon>
            Water Ruan
        </div>
        </MenuItem>
       
    </Menu>
    <br>
    
    
    </div>
</template>

<script>
    // this.$router.push('/addbeauties'); 
    export default {
        data () {
            return {
                theme1: 'light'
            }
        },
        methods:{
            toIndex(){
                this.$router.push('/'); 
            },
            toHe(){
                this.$router.push('/appHe'); 
            },
            toYu(){
                this.$router.push('/appYu'); 
            },
            toCao(){
                this.$router.push('/appCao');
            },
            toSun(){
                this.$router.push('/appSun');
            },
            toSong(){
                this.$router.push('/appSong');
            },
            toRuan(){
                this.$router.push('/appRuan');
            }
        }
    }
</script>