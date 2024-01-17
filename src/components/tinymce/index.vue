<template>
  <div>
    <editor v-model="content" :init="init" :disabled="disabled" @onClick="onClick"> </editor>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
import "tinymce/icons/default";

// 更多插件参考：https://www.tiny.cloud/docs/plugins/
//import "tinymce/plugins/autoresize";//自动调整大小
//import "tinymce/plugins/autosave"//自动保存
//import "tinymce/plugins/formatpainter"    //格式刷
//import "tinymce/plugins/advlist"
import "tinymce/plugins/visualchars"; //查看不可见字符
import "tinymce/plugins/toc"; //目录
import "tinymce/plugins/pagebreak"; //分页符
//import 'tinymce/plugins/pageembed'        //嵌入页面
import "tinymce/plugins/print"; //打印
import "tinymce/plugins/searchreplace"; //搜索和替换
import "tinymce/plugins/insertdatetime"; //插入日期/时间
import "tinymce/plugins/hr"; //插入一条水平线
import "tinymce/plugins/fullpage"; //全页插件
import "tinymce/plugins/charmap"; //特殊字符
import "tinymce/plugins/anchor"; //锚或标签
import "tinymce/plugins/emoticons"; //表情插件
import "tinymce/plugins/autolink"; //自动创建超链接
import "tinymce/plugins/fullscreen"; //全屏
import "tinymce/plugins/link"; //插入链接
import "tinymce/plugins/code"; //源代码查看
import "tinymce/plugins/codesample";
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/table"; // 插入表格插件
//import 'tinymce/plugins/advtable'//高级表格
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/wordcount"; // 字数统计插件
import "tinymce/plugins/preview"; //预览
//import 'tinymce/plugins/template'         //模版
import "tinymce/plugins/directionality"; //方向
import "tinymce/plugins/textcolor";
import { upload } from "@/api/file/upload";
export default {
  name: "index",
  components: {
    Editor,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    height: {
      type: Number,
      default: 400,
    },
    // 基本路径，默认为空根目录，如果你的项目发布后的地址为目录形式，
    // 即abc.com/tinymce，baseUrl需要配置成tinymce，不然发布后资源会找不到
    baseUrl: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    toolbar_sticky: {
      type: Boolean,
      default: false,
    },
    plugins: {
      type: [String, Array],
      default:
        " directionality preview visualchars toc pagebreak print searchreplace insertdatetime hr fullpage charmap anchor emoticons autolink fullscreen link code image media table lists wordcount",
    },
    toolbar: {
      type: [String, Array],
      default:
        "undo redo | cut copy paste | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect searchreplace " +
        "| bullist numlist | outdent indent blockquote | link unlink anchor image media code codesample | inserttime  | forecolor backcolor table | hr removeformat | subscript superscript | charmap emoticons " +
        "| ltr rtl | spellchecker | visualchars visualblocks nonbreaking template pagebreak restoredraft | preview print fullscreen ",
    },
  },
  data() {
    return {
      init: {
        language_url: `${this.baseUrl}/tinymce/langs/zh_CN.js`,
        language: "zh_CN",
        skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide`,
        content_css: `${this.baseUrl}/tinymce/skins/content/default/content.css`,
        // skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide-dark`, // 暗色系
        // content_css: `${this.baseUrl}/tinymce/skins/content/dark/content.css`, // 暗色系
        emoticons_database_url: `${this.baseUrl}/tinymce/plugins/emoticons/emojis.js`,
        height: this.height,
        plugins: this.plugins,
        toolbar: this.toolbar,
        toolbar_sticky: this.toolbar_sticky,
        branding: false,
        menubar: false,
        paste_data_images: true,
        toolbar_drawer: "sliding", //sliding 或者 floating 使用多个工具栏或工具栏（n）选项时，工具栏抽屉不可用。
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          // const img = "data:image/jpeg;base64," + blobInfo.base64();
          // success(img);
          const formData = new FormData();
          formData.append("file", blobInfo.blob());
          upload(formData)
            .then((res) => {
              if (res.code === 200) {
                success(res.data);
                return;
              }
              failure("上传失败");
            })
            .catch(() => {
              failure("上传出错");
            });
        },
        file_picker_types: "file image media", //分别对应三个类型文件的上传：link插件，image和axupimgs插件，media插件。想屏蔽某个插件的上传就去掉对应的参数
        file_picker_callback: (callback, value, meta) => {
          let filetype = ".pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4, .jpg"; //限制文件的上传类型
          let inputElem = document.createElement("input"); //创建文件选择
          inputElem.setAttribute("type", "file");
          inputElem.setAttribute("accept", filetype);
          inputElem.click();
          inputElem.onchange = () => {
            let upurl = "";
            let file = inputElem.files[0]; //获取文件信息
            if (file.type.slice(0, 5) === "video") {
              //判断文件类型
              upurl = `${this.baseUrl}/api-upload/uploadTxVideo`;
            } else {
              upurl = `${this.baseUrl}/api-upload/upload`;
            }
            if (file.type.slice(0, 5) === "image" && file.size / 1024 / 1024 > 20) {
              alert("上传失败，图片大小请控制在20M以内");
            } else if (file.type.slice(0, 5) === "video" && file.size / 1024 / 1024 > 500) {
              alert("上传失败，视频大小请控制在 1000M 以内");
            } else if (file.size / 1024 / 1024 > 500) {
              alert("上传失败，文件大小请控制在 200M 以内");
            } else {
              let params = new FormData();
              params.append("file", file);
              let config = {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              };
              upload(params)
                .then((res) => {
                  if (res.code === 200) {
                    callback(res.data, { title: file.name });
                    return;
                  }
                  this.$baseAlert("上传失败");
                })
                .catch(() => {
                  this.$baseAlert("上传出错，服务器开小差了呢");
                });
            }
          };
        },
      },
      content: this.value,
    };
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    onClick(e) {
      this.$emit("onClick", e, tinymce);
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.content = "";
    },
  },
  watch: {
    value(newValue) {
      this.content = newValue;
    },
    content(newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>

<style scoped></style>
