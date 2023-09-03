import request from '../utils/request'
export type CodeResultType = {
  codeTitle: string,
  codeDescription: string,
  childrenIds: string[],
  changeValue: number,
  logoUrl: string,
  id:string,
  count:number
}
export type ChildCodeResultType = {
  id:string,
  codeUrl:string,
  count:number
}

// 添加所有活码
export function addCode(codeTitle: string, codeDiscription: string, childrenIds: string, logoUrl: string, changeValue: number) {
  const data = { codeTitle, codeDiscription, childrenIds, logoUrl, changeValue }
  // console.log(data);
  return request({
    url: '/addCode',
    method: 'post',
    data: data
  })
}
// 获取单个活码
export function getCodeById(id:string):Promise<CodeResultType[]> {
  return request({
    url: '/getCodeById',
    method: 'post',
    data: {id}
  })
}
// 获取单个子码
export function getChildCodeById(id:string):Promise<ChildCodeResultType[]> {
  return request({
    url: '/getChildCodeById',
    method: 'post',
    data: {id}
  })
}
// 获取活码列表
export function getCodeList():Promise<CodeResultType[]> {
  return request({
    url: '/getCodeList',
    method: 'get',
  })
}
// 获取子码列表
export function getChildCodeList():Promise<ChildCodeResultType[]> {
  return request({
    url: '/getChildCodeList',
    method: 'get',
  })
}
// 添加子码
export function addChildCode(codeUrl: string): Promise<string> {
  return request({
    url: '/addChildCode',
    method: 'post',
    data: {
      codeUrl
    }
  })
}
// 删除子码
export function deleteLiveCode(id: string): Promise<string> {
  return request({
    url: '/deleteLiveCode',
    method: 'post',
    data: {
      id
    }
  })
}
// 修改活码
export function updateLiveCodeCount(id:string,count:number):Promise<string>{
  return request({
    url:"/updateLiveCodeCount",
    method:'post',
    data:{
      id,
      count
    }
  })
}
// 修改子码
export function updateChildCodeCount(id:string,count:number):Promise<string>{
  return request({
    url:"/updateChildCodeCount",
    method:'post',
    data:{
      id,
      count
    }
  })
}


// 上传图片
export function uploadImg(file: File): Promise<string> {
  return request({
    url: "/uploadImg",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: {
      file
    }
  })
}
