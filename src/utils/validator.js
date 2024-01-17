import { isPhone, isUSCC, isEmail, isIdCard, isPassword } from "@/utils/validate";

//是否是统一社会信用代码
export const validatorUSCC = (rule, value, callback) => {
  if (rule.required && !isUSCC(value)) {
    callback(new Error("请输入正确统一社会信用代码"));
  } else {
    callback();
  }
};
//是否是手机号
export const validatorPhone = (rule, value, callback) => {
  if (rule.required && !isPhone(value)) {
    callback(new Error("请输入正确的手机号码"));
  } else {
    callback();
  }
};
//是否是正确的密码
export const validatorPWD = (rule, value, callback) => {
  if (rule.required && !isPassword(value)) {
    callback(new Error("请输入6-20位字母和数字组合的密码"));
  } else {
    callback();
  }
};

export const validatorEmail = (rule, value, callback) => {
  if (rule.required && !isEmail(value)) {
    callback(new Error("请输入正确的邮箱"));
  } else {
    callback();
  }
};

export const validatorIdCard = (rule, value, callback) => {
  if (rule.required && !isIdCard(value)) {
    callback(new Error("请输入正确的身份证号"));
  } else {
    callback();
  }
};

export const validatorBoolean = (rule, value, callback) => {
  if (rule.required && !value) {
    callback(new Error(rule.message));
  } else {
    callback();
  }
};