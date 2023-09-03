<script setup lang='ts'>
import tabbar from '../components/tabbar.vue';

import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';

import { getCodeList, deleteLiveCode } from '../api/index';
import QRCode from 'qrcode';
import { CodeResultType } from '../api/index';
import { BaseURL, ServeURL } from '../utils/config'

interface NewCodeResultType extends CodeResultType {
  url: string
};
let router = useRouter();
let cardList = reactive<NewCodeResultType[]>([]);
let previewImageUrl = reactive<string[]>([]);
let isShowPreviewImage = ref(false);
let showLogoUrl = ref("")
/**
 * 获取活码列表
 */
const getList = async () => {
  let list = await getCodeList();
  list.map(async item => {
    let url = await genLiveCodeImg(item.id);
    let newItem = { ...item, logoUrl: ServeURL + "/" + item.logoUrl, url };
    cardList.push(newItem);
    // 降序
    cardList.sort((a, b) => {
      return (b.id as any) - (a.id as any);
    })
  });
}
getList();

/**
 * 生成活码图片
 */
const genLiveCodeImg = async (id: string) => {
  let url = `${BaseURL}/#/showcode?id=${id}`;
  let newUrl = await QRCode.toDataURL(url);
  return newUrl;
}
/**
 * 跳转到showcode页面
 */
const goShowCode = (id:string) => {
  router.push({
    path: '/showcode',
    query: {
      id,
      show:"true"
    }
  })
}
/* 预览图片 */
const showPreviewImage = (url: string, logoUrl: string) => {
  isShowPreviewImage.value = true;
  previewImageUrl.push(url);
  showLogoUrl.value = logoUrl;
}
/* 删除活码 */
const clickDeleteLiveCode = async (id: string) => {
  let result = await deleteLiveCode(id);
  if (result) {
    alert(result);
    cardList.length = 0;
    getList()
  }
}

</script>

<template>
  <div v-if="cardList.length===0" style="text-align: center;">什么都没有喔!!!,快去新建活码吧</div>
  <van-swipe-cell v-for="item in cardList" :key="item.codeTitle + item.id">
    <van-card @click-thumb="goShowCode(item.id)" :num="JSON.parse(item.childrenIds as any).length" :desc="item.codeDescription"
      :title="item.codeTitle" class="goods-card" :thumb="item.url">
      <template #thumb>
        <van-image class="logo" width="88" height="88" :src="item.url">
          <img :src="item.logoUrl" class="logoimg" />
        </van-image>
      </template>
    </van-card>
    <template #left>
      <van-button square type="default" @click="showPreviewImage(item.url, item.logoUrl)" class="delete-button"
        text="预览活码图片" />
    </template>

    <template #right>
      <van-button @click="clickDeleteLiveCode(item.id)" square text="删除" type="danger" class="delete-button" />
    </template>
  </van-swipe-cell>


  <van-image-preview v-model:show="isShowPreviewImage" :images="previewImageUrl">
    <template #image="{ src }">
      <van-image class="preview" :src="src">
        <van-image class="previewImg" :src="showLogoUrl"></van-image>
      </van-image>
    </template>
  </van-image-preview>

  <tabbar :active="1" />
</template>


<style scoped lang='scss'>
.logo {
  background-color: skyblue;
  position: relative;
}

.logoimg {
  position: absolute;
  left: 44px;
  top: 44px;
  margin-top: -10px;
  margin-left: -10px;
  content: "";
  width: 20px;
  height: 20px;
}

.preview {
  position: relative;
  background-color: skyblue;
  width: 100%;
  height: 100%;
}

.previewImg {
  position: absolute;
  width: 20%;
  height: 20%;
  top: 50%;
  left: 50%;
  margin-left: -10%;
  margin-top: -10%;
}

.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
</style>