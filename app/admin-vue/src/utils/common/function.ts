/**
 * @return {tree: array}
 */
export function treeToList(tree: any[]) {
  let queen: any[] = []
  const out = []
  queen = queen.concat(tree)
  while (queen.length) {
    const first = queen.shift()
    if (first.children) {
      queen = queen.concat(first.children)
      delete first.children
    }

    out.push(first)
  }
  return out
}
