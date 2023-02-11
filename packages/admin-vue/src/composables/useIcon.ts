import { Icon } from '@iconify/vue'
import { Icon as VIcon } from 'vexip-ui'
interface Props {
  size?: number
  color?: string
}

export function useIcon(icon: string, props: Props = { size: 1 }) {
  return () => h(VIcon, { scale: props.size }, { default: () => h(Icon, { icon }) })
}
