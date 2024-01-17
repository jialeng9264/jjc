const addQuery = function (queryDate) {
  const query = {};
  Object.assign(query, this.$route.query, queryDate);
  this.$router.push({
    path: this.$route.path,
    query: query,
  });
};

const delQuery = function () {
  const query = {};
  const arg = Array.prototype.slice.call(arguments);
  Object.assign(query, this.$route.query);
  arg.forEach((item) => {
    delete query[item]; //删除参数
  });
  this.$router.push({
    path: this.$route.path,
    query: query,
  });
};
const install = {
  install(Vue) {
    Vue.mixin({
      beforeCreate() {
        const self = this;
        this.$routePlugin = {
          addQuery: addQuery.bind(self),
          delQuery: delQuery.bind(self),
        };
      },
    });
  },
};
export default install;
