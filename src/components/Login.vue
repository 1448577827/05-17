<template>
    <div class="login_container">
      <div class="login_box">
      <!--登录表单区域-->
        <!--:model="表单数据对象" :rules="表单验证规则"-->
        <el-form :model="loginFrom" :rules="loginRules" ref="loginRuleForm" label-width="100px" class="login_form">
          <el-form-item  prop="username">
            <el-input v-model="loginFrom.username" prefix-icon="iconfont icon-user"></el-input>
          </el-form-item>
          <el-form-item  prop="password">
            <el-input v-model="loginFrom.password" prefix-icon="iconfont icon-3702mima"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="loginForm">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginFrom:{
        username: 'admin',
        password: '123456'
      },
      loginRules: { // 验证规则
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    resetLoginForm() {
      this.$refs.loginRuleForm.resetFields()
    },
    loginForm() {
      this.$refs.loginRuleForm.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginFrom)
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg)
        }
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }

  }
}
</script>

<style scoped lang="less">
  .login_container {
    background-color: #2B4B6B;
    height: 100%;
    .login_box {
      width: 450px;
      height: 300px;
      background: #fff;
      border-radius: 3px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .login_form{
        position: absolute;
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        top: 20%;
      }

    }
    .btns{
      display: flex;
      justify-content: center;
    }
  }

  .el-form-item div{
    margin-left: 0 !important;
  }

</style>
