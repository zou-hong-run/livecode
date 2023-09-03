/**
 * 
 * @param {string} val 
 * @returns 
 */
export const getEle = (val)=>{
    return document.querySelector(val);
}
/**
 * 
 * @param {HTMLDivElement} ele 
 */ 
export const hiddenEle = (ele)=>{
    ele.classList.add("hidden");
}
/**
 * 
 * @param {HTMLDivElement} ele 
 */ 
export const showEle = (ele)=>{
    ele.classList.remove("hidden");
}
