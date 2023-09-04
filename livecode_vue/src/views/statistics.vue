<script setup lang='ts'>
import { ref, reactive } from 'vue';
import tabbar from '../components/tabbar.vue';
import { ChildCodeResultType, CodeResultType, getCodeList, getChildCodeList } from '../api';

const currentRate = ref(0);

const liveCodeAllCount = reactive({
  text: "扫活码总数",
  count: 0
});
const childrenCodeAllCount = reactive({
  text: "扫子码总数",
  count: 0
});

// 所有的活码
const allLiveCodes = ref<CodeResultType[]>([]);
// 所有的子码
const allChildCodes = ref<ChildCodeResultType[]>([]);

const active = ref("");

/* 获取所有活码 */
const getAllLiveCode = async () => {
  let result = await getCodeList();
  active.value = result[0].codeTitle
  liveCodeAllCount.count = result.reduce((total, item) => total + item.count, 0);
  allLiveCodes.value = result;
}
getAllLiveCode()

/* 获取所有子码 */
const getAllChildCode = async () => {
  let result = await getChildCodeList();
  allChildCodes.value = result;
  childrenCodeAllCount.count = result.reduce((total, item) => total + item.count, 0)
}
getAllChildCode()
/* 根据活码获取子码 */
const getChildCodeById = (id: string) => allChildCodes.value.find((item) => item.id === id);

</script>

<template>
  <van-row>
    <van-col span="24">
      <van-divider>活码总信息</van-divider></van-col>
  </van-row>
  <van-row gutter="20">
    <van-col span="8">
      <van-circle v-model:current-rate="currentRate" :rate="liveCodeAllCount.count" :speed="100"
        :text="liveCodeAllCount.text + ':' + liveCodeAllCount.count" />
      <van-circle v-model:current-rate="currentRate" :rate="childrenCodeAllCount.count" :speed="100"
        :text="childrenCodeAllCount.text + ':' + childrenCodeAllCount.count" />
    </van-col>
  </van-row>
  <van-row>
    <van-col span="24">
      <van-divider>活码详细信息</van-divider>
    </van-col>
  </van-row>

  <van-tabs style="text-align: center;height:100%;" v-model:active="active">
    <van-tab v-for="item in allLiveCodes" :key="item.logoUrl + item.changeValue" :title="item.codeTitle"
      :name="item.codeTitle">
      <van-row>
        <van-col span="24" style="background-color: beige;">
          <van-divider>当前活码扫码人数：{{ item.count }}</van-divider>
        </van-col>
      </van-row>
      <van-row gutter="20">
        <van-col span="8">子码</van-col>
        <van-col span="8">子码URL</van-col>
        <van-col span="8">子码扫码人数</van-col>
      </van-row>

      <van-list style="background-color: skyblue;" finished-text="没有更多了">
        <template v-for="id in JSON.parse(item.childrenIds as any)">
          <van-row>
            <van-col span="24">
              <van-divider></van-divider></van-col>
          </van-row>
          <van-row gutter="20">
            <van-col span="8">{{ getChildCodeById(id)?.id }}</van-col>
            <van-col span="8">{{ getChildCodeById(id)?.codeUrl }}</van-col>
            <van-col span="8">{{ getChildCodeById(id)?.count }}</van-col>
          </van-row>
        </template>
      </van-list>
    </van-tab>
  </van-tabs>


  <tabbar :active="2" />
</template>


<style scoped lang='scss'></style>