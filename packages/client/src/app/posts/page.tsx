import React from 'react'
import type { postsData } from '@/types/posts'

const fetchTodos = async () => {
  const res = await fetch('http://localhost:1206/api/posts')
  const todos: { data: postsData } = await res.json()
  return todos.data.list
}

const Posts = async () => {
  const todos = await fetchTodos()
  return (
    <>
      {todos.map(todo => (
        <p key={todo.id}>
          <p>{todo.title}</p>
        </p>
      ))}
    </>
  )
}

export default Posts
