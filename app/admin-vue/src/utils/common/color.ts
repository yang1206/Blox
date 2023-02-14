// 标签颜色
export const TAG_COLORS = [
  'lime',
  'pink',
  'magenta',
  'tomato',
  'orange',
  'cyan',
  'navy',
  'gold',
  'purple',
]
export const getRandomColor = (() => {
  const cache: { [key: string]: string } = {}
  return (key: string) => {
    if (!cache[key]) {
      const color = TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)]
      cache[key] = color
      return color
    }
    return cache[key]
  }
})()
