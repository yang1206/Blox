import type { Rule } from 'vexip-ui'
import type { RegisterForm } from '@/api/interface/user'

export const loginRules: { [key: string]: Rule } = {
  username: {
    required: true,
    message: '请输入账号',
  },
  password: {
    required: true,
    message: '请输入密码',
  },

}

export const registerForm = reactive<RegisterForm>({
  username: '',
  password: '',
  confirm_password: '',
})
export const registerRules: { [key: string]: Rule } = {
  username: {
    required: true,
    message: '请输入账号',
  },
  password: {
    required: true,
    message: '请输入密码',
  },
  confirm_password: [
    {
      required: true,
      message: '请确认密码',
    },
    {
      validator: (val: string) => {
        if (val !== registerForm.password)
          return false
        return true
      },
      message: '两次密码不一致',
    },
  ],

}
