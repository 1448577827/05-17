<template>
      <el-container class="home_container">
        <!--头部区域-->
        <el-header>
          <div>
            <img src="../assets/logo.png" alt="">
            <span>电商后台管理系统</span>
          </div>
          <el-button type="info" @click="qwe">退出</el-button>
        </el-header>
        <!--页面主题区域-->
        <el-container>
          <!--左侧栏-->
          <el-aside :width="isCollapse ? '64px':'200px'">
            <div class="toggle_btn" @click="toggleColl">|||</div>
            <!--unique-opened : 只保持显示一个子菜单-->
            <el-menu
              ref="menuRef"
              @open="getSubmenuIndex"
              :collapse-transition="false"
              :collapse="isCollapse"
              router
              :default-active="activeIndex"
              unique-opened
              background-color="#373D41"
              text-color="#fff"
              active-text-color="#409EFF">
              <!--一级菜单-->
              <!-- index属性用来绑定唯一的标识, 点击展开对应的子菜单-->
              <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
                <template slot="title">
                  <i :class="iconsObj[item.id]"></i>
                  <span>{{item.authName }}</span>
                </template>
                <!--二级菜单-->
                <!--设置router属性, 启用vueRouter模式会在激活导航时以 index 作为 path 进行路由跳转-->
                  <el-menu-item :index="'/'+ subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveIndexStatus('/'+ subItem.path,item.authName, subItem.authName )">
                    <i class="el-icon-menu"></i>
                    <span>{{ subItem.authName }}</span>
                  </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-aside>
          <!--内容主体区域-->
          <el-main>
            <Breadcrumb v-if="activeIndex" :authname="authname"></Breadcrumb>
            <!--占位-->
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
</template>

<script>
// 1. 导入公共子组件
import Breadcrumb from './subComponents/breadcrumb.vue'
export default {
  name: 'Home',
  data() {
    return {
      authname:{
        itemAuthname:'',
        subItemAuthname: ''
      },
      submenuIndex:0,
      activeIndex: '',
      isCollapse: false,
      menuList:[],
      // 由于一级菜单图标不一样, 通过id作为key值, 图标类作为value
      iconsObj: {
        125:'iconfont icon-user',
        103:'iconfont icon-tijikongjian',
        101:'iconfont icon-shangpin',
        102:'iconfont icon-danju',
        145:'iconfont icon-baobiao'
      }
    }
  },
  components:{
    Breadcrumb
  },
  created() {
    this.getMenuList()
    // 页面刷新时, 让对应的二级菜单高亮显示
    this.activeIndex = window.sessionStorage.getItem('activeIndex')
    this.authname = JSON.parse(window.sessionStorage.getItem('authnameObj')) || {}
    console.log(this.authname)
  },
  watch:{
    $route(newPath, oldPath) {
      if (newPath.path === '/welcome') {
        this.$refs.menuRef.close(this.submenuIndex)
        this.activeIndex = ''
        window.sessionStorage.setItem('activeIndex', this.activeIndex)
      }
    }
  },
  methods:{
    getSubmenuIndex(index) {
      this.submenuIndex = index
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      // 成功则保存到data
      this.menuList = res.data
    },
    toggleColl() {
      this.isCollapse = !this.isCollapse
    },
    saveIndexStatus(activeIndex, itemauth, subItemauth) {
      this.authname.itemAuthname = itemauth
      this.authname.subItemAuthname = subItemauth
      window.sessionStorage.setItem('authnameObj', JSON.stringify(this.authname))
      this.activeIndex = activeIndex
      window.sessionStorage.setItem('activeIndex', activeIndex)
    },
    qwe() {
      console.log('ok')
    }

  }
}
</script>

<style scoped lang="less">
.home_container{
  height: 100%;
  .el-header{
    background-color:#373D41;
    display: flex;
    justify-content: space-between;
    color: white;
    font-size: 20px;
    align-items: center;
    > div{
      display: flex;
      align-items: center;
      img {
        width: 50px;
        margin-right: 20px;
      }
    }
  }
  .toggle_btn{
    background-color: #4A5064;
    font-size: 12px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    cursor: pointer;

  }
}
</style>
