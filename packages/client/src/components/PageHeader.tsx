import React from 'react'

export default function PageHeader(props: {
  title: string
  description: string
}) {
  const { title, description } = props
  return (
    <>
      <h2
        className='text-2xl
        md-text-3xl
        mb4
        mt-0'
      >
        { title }
      </h2>
      <p className='font-mono text-xs md-text-sm italic'>
        { description }
      </p>
    </>
  )
}
