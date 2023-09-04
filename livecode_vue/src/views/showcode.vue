<script setup lang='ts'>
import { ref, toRaw, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { CodeResultType, ChildCodeResultType, getCodeById, getChildCodeById, updateLiveCodeCount, updateChildCodeCount } from "../api/index";
const router = useRouter();
const route = useRoute();

let codeObj = ref<CodeResultType>({
    codeTitle: "什么都没有",
    codeDescription: "什么都没有",
    childrenIds: [],
    changeValue: 0,
    logoUrl: "string",
    id: "什么都没有",
    count: 0
});
let childrenObjs = ref<ChildCodeResultType[]>([]);
let childrenObj = ref<ChildCodeResultType>({
    id: "string",
    codeUrl: "uploads/404.png",
    count: 0
});
let pageId = route.query.id as string;
let isShow = route.query.show as string;
if (!pageId) {
    alert("参数错误！！！");
    router.push("/")
}
/* 更新活码计数 */
const changeLiveCodeCount = async (id: string, count: number) => {

    if (isShow) {
        // 后台管理人员操作
        return
    }
    // 用户正在扫码
    await updateLiveCodeCount(id, count);
}
/* 更新子码计数 */
const changeChildCodeCount = async (id: string, count: number) => {
    // 用户正在扫码
    await updateChildCodeCount(id, count);
}
/* 渲染活码信息 */
const getCode = async (id: string) => {
    // 活码
    let result = await getCodeById(id);
    if (result.length !== 0) {

        // 获取子码ids数组
        let childrenIds: string[] = JSON.parse(result[0].childrenIds as any)
        // 获取到的活码对象
        codeObj.value = { ...result[0] };
        // 更新数据库信息
        await changeLiveCodeCount(id, codeObj.value.count);
        // 获取子列表id
        childrenIds.forEach(async (childId) => {
            // 获取每个子码对象
            let childrenCode = await getChildCodeById(childId);
            if (childrenCode.length !== 0) {
                childrenObjs.value.push(childrenCode[0]);
                setShowChildCode();
            }
        })
    }
}
getCode(pageId);
/* 过滤满足条件的子码 */
const setShowChildCode = () => {
    // 满足条件的一项
    let rowChilrenObjs = toRaw(childrenObjs.value);
    let item = rowChilrenObjs.find(children => {
        return children.count !== codeObj.value.changeValue;
    });
    if (item) {
        childrenObj.value = item;
    } else {
        childrenObj.value = rowChilrenObjs[0];
    }
};
/* 计算最新的图片地址 */
const imgUrl = computed(() => {
    let origin = window.location.origin;
    return origin + "/" + childrenObj.value.codeUrl
});
/* 返回 */
const onClickLeft = () => history.back();
// 记录时间
let timer:string | number | NodeJS.Timeout | undefined = undefined;
// touchstart
const goTouchStart = ()=>{
    timer = setTimeout(async()=>{
        // 用户长按 更新 子码计数
        let {id,count} = childrenObj.value;
        await changeChildCodeCount(id,count)
    },600)
}
const goTouchEnd = ()=>{
    clearTimeout(timer)
}
</script>

<template>
    <van-nav-bar v-if="isShow" title="秀活码" left-text="返回" left-arrow @click-left="onClickLeft" />
    <h3 style="text-align: center;color: white;">长按图片扫码</h3>
    <div @touchstart.prevent="goTouchStart" @touchend.prevent="goTouchEnd" class="image">
        <van-image :src="imgUrl" />
    </div>
</template>


<style scoped lang='scss'>
.image {
    width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>