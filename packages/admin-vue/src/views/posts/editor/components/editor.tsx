import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { toolbars } from '../config'
import { postsForm } from '../composable'
const isDark = useDark()

export default defineComponent({
  name: 'MdEditor',
  setup() {
    return () => (
      <MdEditor
      class='h-full'
      theme={isDark.value ? 'dark' : undefined}
      toolbars={toolbars.value}
      modelValue={postsForm.value.content}
      onHtmlChanged={(h: string) => postsForm.value.contentHtml = h }
      onChange={(v: string) => (postsForm.value.content = v)} 
      onGetCatalog={(list)=>(postsForm.value.toc = list)}
      />
    )
  },
})
