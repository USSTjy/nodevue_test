<template>
    <el-container class="ht100 homeStyle">
        <el-header class="headerStyle">
            <el-row type="flex" justify="space-between" align="middle">
                <el-col :span="18" class="textL">
                    <el-row type="flex" align="middle">
                        <el-row class="head-menu" >
                            <el-button type="text" class="head-menu-btnColor"
                            :class="[isActive === 'Home' ? 'head-menu-btn-active' : '']"
                            @click="handleMenu('Home')">首页</el-button>
                        </el-row>
                        <el-row class="head-menu">
                            <el-button type="text" class="head-menu-btnColor"
                            :class="[isActive === 'List' ? 'head-menu-btn-active' : '']"
                            @click="handleMenu('List')">新闻列表</el-button>
                        </el-row>
                        <el-row class="head-menu">
                            <el-button type="text" class="head-menu-btnColor"
                            :class="[isActive === 'Sub' ? 'head-menu-btn-active' : '']"
                            @click="handleMenu('Sub')">新闻发布</el-button>
                        </el-row>
                        <el-row class="head-menu">
                            <el-button type="text" class="head-menu-btnColor"
                            :class="[isActive === 'Question' ? 'head-menu-btn-active' : '']"
                            @click="handleMenu('Question')">问卷调查</el-button>
                        </el-row>
                    </el-row>
                </el-col>
                <el-col :span="6" class="textR">
                    <el-row type="flex" align="middle">
                        <el-col style="color: #f1bc27;">{{userInfo.username}}</el-col>
                        <el-col>设置</el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-header>
        <el-main class="mainStyle">
            <router-view />
        </el-main>
        <el-footer class="footerStyle">Footer</el-footer>
    </el-container>
</template>
<script>
    export default {
        name: 'Bigapp',
        components: {
        },
        data() {
            return {
                userInfo: {
                    username: '',
                },
                isActive: 'Home',
            };
        },
        mounted() {
            this.$router.push({
                name: this.isActive,
            });
            this.handlegetUser();
        },
        methods: {
            handlegetUser() {
                this.userInfo = JSON.parse(sessionStorage.getItem('user'));
            },
            handleMenu(e) {
                this.isActive = e;
                this.$router.push({
                    name: e,
                });
            },
        },
    };
</script>
<style scoped>
    .head-menu{
        display: inline-block;
        margin-right:5px;
        min-width: 70px;
        cursor: pointer;
    }
    .head-menu:first-child{
        min-width: 40px;
    }
    .head-menu-btnColor{
        color: #fff;
    }
    .head-menu-btnColor:hover{
        color: rgb(86, 230, 62);
    }
    .head-menu-btn-active{
        color: rgb(255, 230, 62);
    }
</style>
