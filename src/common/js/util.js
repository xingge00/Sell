/**
 * 解析url参数
 * @example ?id123&b=321
 * @return Object {id:123,b:321}
 */
export function urlParse(){
	let url = window.location.search
	let obj = {}
	let arr = url.split('&')
	for(let i=0;i<arr.length;i++){
		if(i===0){
			arr[i]=arr[i].substr(1)
		}
		let temp = arr[i].split('=')
		if(temp.length===1){
			return {}
		}
		let key = decodeURIComponent(temp[0])
		let val = decodeURIComponent(temp[1])
		obj[key] = val
	}
	return obj
}