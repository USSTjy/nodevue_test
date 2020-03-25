<template>
  <el-container class="ht100 homeStyle LoginPage">
    <el-main class="bg-color">
      <el-row class="loginStyle">
        <el-row class="login-head">
          登录系统
        </el-row>
        <el-card class="box-card">
          <div slot="header" class="clearfix textL">
            <span>用户{{isShow===true?'登录':'注册'}}</span>
            <el-button style="float: right; padding: 3px 0"
            type="text" @click="handleSelect">{{isShow===false?'登录':'注册'}}</el-button>
          </div>
          <el-row class="loginStyle">
            <el-form label-width="80px"
            :model="ruleForm" :rules="rules" ref="ruleForm" class="wd100">
              <el-form-item label="用户名" prop="loginName">
                <el-input v-model="ruleForm.loginName"
                placeholder="请输入用户名"
                size="mini"
                class="inputStyle"
                prefix-icon="el-icon-user"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="loginPsd">
                <el-input v-model="ruleForm.loginPsd" type="password"
                placeholder="请输入密码"
                size="mini"
                class="inputStyle"
                prefix-icon="el-icon-lock"></el-input>
              </el-form-item>
              <el-row style="padding-left: 80px">
                  <el-button v-if="isShow===true"
                  @click="handleLogin" size="mini" type="primary" round>登录</el-button>
                  <el-button v-else
                  @click="handleregister" size="mini" type="primary" round>注册</el-button>
              </el-row>
            </el-form>
          </el-row>
        </el-card>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
    import loginAPI from '@/serverAPI/index';

    export default {
        data() {
            return {
                activeIndex: 'login',
                isShow: true,
                ruleForm: {
                    loginName: '',
                    loginPsd: '',
                },
                rules: {
                    loginName: [
                        {
                            required: true,
                            message: '请输入用户名',
                            trigger: 'blur',
                        },
                        {
                            min: 2,
                            max: 20,
                            message: '长度在 2 到 20 个字符',
                            trigger: 'blur',
                        },
                    ],
                    loginPsd: [
                        {
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur',
                        },
                        {
                            min: 6,
                            max: 50,
                            message: '长度在 6 到 50 个字符',
                            trigger: 'blur',
                        },
                    ],
                },
            };
        },
        methods: {
            handleregister() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        loginAPI.registerIn({
                            username: this.ruleForm.loginName,
                            password: this.ruleForm.loginPsd,
                        }).then((res) => {
                            console.log('res', res);
                            if (res.code === '0') {
                                this.$message.success(res.message);
                                this.isShow = !this.isShow;
                            } else {
                                this.$message.error(res.message);
                            }
                        });
                    } else {
                        console.log('error');
                    }
                });
            }, 
            handleLogin() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        loginAPI.loginIn({
                            username: this.ruleForm.loginName,
                            password: this.ruleForm.loginPsd,
                        }).then((res) => {
                            console.log('res', res);
                            if (res.message === '登录成功') {
                                sessionStorage.setItem('user', JSON.stringify(res.data));
                                this.$router.push({
                                    name: 'Bigapp',
                                });
                            } else {
                                this.$message.error(res.message);
                            }
                        });
                    } else {
                        console.log('error');
                    }
                });
            },
            handleSelect() {
                this.isShow = !this.isShow;
                this.$refs.ruleForm.resetFields();
            },
        },
    };
</script>
<style scoped>
  .bg-color {
    background: url('../assets/images/login_bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .loginStyle {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }
  .login-head{
    font-size: 2rem;
    color: white;
  }
  .formStyle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 40rem;
    /*background: rgba(68, 122, 127, 1);*/
    /* 浏览器不支持的时候显示 */
    background-image: linear-gradient(to right,
      transparent,
      rgba(68, 122, 127, 0.2),
      rgba(68, 122, 127, 0.4),
      rgba(68, 122, 127, 0.6),
      rgba(68, 122, 127, 0.8),
      rgba(68, 122, 127, 0.1),
      rgba(68, 122, 127, 0.8),
      rgba(68, 122, 127, 0.6),
      rgba(68, 122, 127, 0.4),
      rgba(68, 122, 127, 0.2),
      transparent); /* 标准的语法（必须放在最后） */
  }

  .box-card{
    width: 300px;
  }

</style>
