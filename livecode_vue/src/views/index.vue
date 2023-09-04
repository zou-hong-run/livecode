<script setup lang='ts'>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import tabbar from '../components/tabbar.vue';
import { addCode, uploadImg, addChildCode } from '../api/index';
import { UploaderFileListItem } from 'vant';
import { toRaw } from 'vue';

const router = useRouter();
const isLoading = ref(false);

export type forData = {
  codeTitle: string,
  codeDescription: string,
  childrenIds: string[],
  changeValue: number,
  logoUrl: string,
}
const childImgList = ref<UploaderFileListItem[]>();
const logoImg = ref<UploaderFileListItem[]>();

const formData = reactive<forData>({
  codeTitle: "",
  codeDescription: "",
  childrenIds: [],
  changeValue: 1,
  logoUrl: "",
});
// 上传子码图片
const addChildImg = async (items: UploaderFileListItem | UploaderFileListItem[]) => {
  let newItems = toRaw(items);
  const upFileAndAddCode = async (file: File) => {
    let url = await uploadImg(file);
    if (url) {
      let id = await addChildCode(url);
      if (id) {
        formData.childrenIds.push(id);
      }
    }
  }
  if (typeof newItems === 'object' && newItems !== null && "objectUrl" in newItems) {
    let file = newItems.file;
    if (file) {
      await upFileAndAddCode(file);
    }
  }
  if (Array.isArray(newItems)) {
    newItems.forEach(async item => {
      let file = item.file;
      if (file) {
        await upFileAndAddCode(file);
      }
    })
  }
}
// 上传logo图片
const addLogoImg = async (items: UploaderFileListItem | UploaderFileListItem[]) => {
  let newItems = toRaw(items);
  const upFileAndAddCode = async (file: File) => {
    let url = await uploadImg(file);
    formData.logoUrl = url;
  }
  if (typeof newItems === 'object' && newItems !== null && "objectUrl" in newItems) {
    let file = newItems.file;
    if (file) {
      await upFileAndAddCode(file);
    }
  }
}
// 表单提交
const onSubmit = async () => {
  let { codeTitle, codeDescription, childrenIds, logoUrl, changeValue } = formData;
  // proxy转原始数据，然后转换为字符串格式
  let children = JSON.stringify(toRaw(childrenIds));
  // 添加活码
  await addCode(codeTitle, codeDescription, children, logoUrl, changeValue);
  router.push("/mycode")
};
</script>

<template>
  <van-form @submit="onSubmit" class="form">
    <van-cell-group inset>
      <van-field v-model="formData.codeTitle" name="codeTitle" placeholder="请输入活码标题"
        :rules="[{ required: true, message: '请填写活码标题!!!!' }]" />

      <van-field v-model="formData.codeDescription" name="description" placeholder="请简单描写活码，防止忘记用途"
        :rules="[{ required: true, message: '请描写活码用途'!!!! }]" />

      <van-field name="uploader" label="添加子码二维码" :rules="[{ required: true, message: '请上传活码!!!!' }]">
        <template #input>
          <van-uploader :after-read="addChildImg" multiple v-model="childImgList" />
        </template>
      </van-field>

      <van-field name="stepper" label="子码切换阈值">
        <template #input>
          <van-stepper v-model="formData.changeValue" />
        </template>
      </van-field>

      <van-field name="uploader" label="上传logo" :rules="[{ required: true, message: '请上传logo' }]">
        <template #input>
          <van-uploader :after-read="addLogoImg" multiple :max-count="1" v-model="logoImg" />
        </template>
      </van-field>

      <van-field>
        <template #input>
          <van-button loading-text="活码生成中..." :loading="isLoading" round block type="primary"
            native-type="submit">生成二维码活码</van-button>
        </template>
      </van-field>
    </van-cell-group>
  </van-form>
  <tabbar :active="0" />
</template>


<style scoped lang='scss'>
.form {
  height: calc(100% - 44px);
  padding-top: 5px;
  overflow: scroll;
}
</style>