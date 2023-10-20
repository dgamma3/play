let baseUrl = "";
const env = process.env;

if (env.NODE_ENV === "development") {
  // baseUrl = `http://box.naiba.work`; //生产环境地址

} else if (env.NODE_ENV === "production") {
  baseUrl = `http://box.naiba.work`; //生产环境地址
  // baseUrl = `https://www.clskins.com`; // 生产环境地址
} else if (env.NODE_ENV === "test") {
  // baseUrl = `http://box.naiba.work`; //生产环境地址
}
export {
  baseUrl,
  env
};