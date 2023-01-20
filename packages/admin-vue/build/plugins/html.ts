import { createHtmlPlugin } from 'vite-plugin-html'

export function setupHtmlPlugin(viteEnv: ViteEnv) {
  const { VITE_APP_TITLE_VUE } = viteEnv

  const htmlPlugin = createHtmlPlugin({
    minify: true,
    inject: {
      data: {
        title: VITE_APP_TITLE_VUE,
      },
    },
  })
  return htmlPlugin
}
