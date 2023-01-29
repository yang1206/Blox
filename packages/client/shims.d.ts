import * as React from 'react'
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // 在这里写入你使用的属性，例如:
    grid?: string
  }
}