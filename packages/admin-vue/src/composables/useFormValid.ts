export function useFormValid<T extends Array = any>(formRef: Ref<any>) {
  async function validForm() {
    const form = unref(formRef)
    if (!form)
      return
    const data = await form.validate() as T
    if (data.length >= 0)
      return false
    return true
  }

  return { validForm }
}
