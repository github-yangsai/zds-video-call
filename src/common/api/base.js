/**
  * 接口域名的管理
  */
const domain = "";
 const base = {
    nvrs: `${domain}/warehouse/nvrs`,
    nvr: `${domain}/warehouse/nvr`,
    cameras:`${domain}/warehouse/cameras`,
    camera:`${domain}/warehouse/camera`,
    capture:`${domain}/warehouse/capture`,
    restart:`${domain}/warehouse/restart`,
    nvr_config:`${domain}/warehouse/nvr_config`,
    camera_suggest:`${domain}/warehouse/nvr`,
    login:`${domain}/warehouse/token/obtain`,
    refresh:`${domain}/warehouse/token/refresh`
}

export default base;