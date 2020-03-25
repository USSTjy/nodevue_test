<template>
    <el-row class="ht100">
        question
    </el-row>
</template>
<script>
    export default {
        name: 'Home',
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
