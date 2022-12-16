import { validPassowrd } from '@/utils/validate'

export const validatePassword = (rule, value, callback) => {
  if (value) {
    validPassowrd(value) ? callback() : callback(new Error('6-20位字母与数字'))
  } else {
    callback()
  }
}

export const validateEmpty = {
  required: true,
  trigger: 'blur',
  message: '不能为空',
}
