import request from "@/utils/request";

// 获取路由
export const getRouters = () => {
  return request({
    url: "/getRouters",
    method: "get",
    baseURL:
      "https://www.fastmock.site/mock/f158f9b54b21f51afde2c4c77bd71482/api",
  });
};
