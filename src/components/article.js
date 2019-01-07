import React form 'react'

function Article() {
  const body = <section>body<section>
  return (
    <div>
      <h2>title</h2>
      {body}
      <h3>creation date: {(new Date()).toDateString()}</h3>
    </div>
  )
}

export default Article
