// import { Contextmenu } from 'vexip-ui'
import { useAppStore, useTabStore } from '@/store'
const tabStore = useTabStore()
const appStore = useAppStore()
/**
 * 创建右键菜单
 */
export const contextmenu = async (event: MouseEvent, path: string) => {
  // 未选择是则返回 null
  const selectedKeys = await Contextmenu.open({
    clientX: event.clientX,
    clientY: event.clientY,
    appear: true,
    configs: [
      {
        label: '重新加载',
        key: 'reload',
        disabled: path !== tabStore.activeTab,
        icon: useIcon('mdi:refresh', { size: 1 }),
      },
      {
        label: '关闭',
        key: 'close',
        disabled: tabStore.tabs.length <= 1,
        icon: useIcon('mdi:close', { size: 1 }),
      },
      {
        label: '关闭其他',
        key: 'close-other',
        disabled: tabStore.tabs.length <= 1,
        icon: useIcon('mdi:arrow-expand-horizontal', { size: 1 }),
      },
      {
        label: '关闭左侧',
        key: 'close-left',
        disabled: tabStore.tabs.length <= 1 || path === tabStore.tabs[0].path,
        icon: useIcon('mdi:arrow-expand-left', { size: 1 }),
      },
      {
        label: '关闭右侧',
        key: 'close-right',
        disabled: tabStore.tabs.length <= 1 || path === tabStore.tabs[tabStore.tabs.length - 1].path,
        icon: useIcon('mdi:arrow-expand-right', { size: 1 }),
      }],
  })
  if (!selectedKeys)
    return
  handleSelect(selectedKeys![0] as string, path)
}

const actionMap = new Map([
  [
    'reload',
    () => {
      appStore.reloadPage()
    },
  ],
  [
    'close',
    (path: string) => {
      tabStore.removeTab(path)
    },
  ],
  [
    'close-other',
    (path: string) => {
      tabStore.removeOther(path)
    },
  ],
  [
    'close-left',
    (path: string) => {
      tabStore.removeLeft(path)
    },
  ],
  [
    'close-right',
    (path: string) => {
      tabStore.removeRight(path)
    },
  ],
])
function handleSelect(key: string, path: string) {
  const actionFn = actionMap.get(key)
  actionFn && actionFn(path)
}
