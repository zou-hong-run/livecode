<script setup lang='ts'>
// 只读不能修改
const props = defineProps<{
    active?:number
}>();
let active = props.active
</script>

<template>
    <van-tabbar id="tabbar" v-model="active">
        <van-tabbar-item to="/addcode" icon="new-o">新建活码</van-tabbar-item>
        <van-tabbar-item to="/mycode" icon="hot-o">我的活码</van-tabbar-item>
        <van-tabbar-item to="/statistics" icon="label-o">数据统计</van-tabbar-item>
        <van-tabbar-item to="/person" icon="smile-o">个人中心</van-tabbar-item>
    </van-tabbar>
</template>


<style scoped lang='scss'></style>