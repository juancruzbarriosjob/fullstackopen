const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (totalLikes, blog) => {
    return blog.likes + totalLikes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favoriteBlog, blog) => {
    return blog.likes > favoriteBlog.likes ? blog : favoriteBlog
  }

  const favoriteBlog = blogs.reduce(reducer)

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes
  }
}

const mostBlogs  = (blogs) => {
  const blogsGroupedByAuthor = _.groupBy(blogs, 'author')
  const initBlog = { author: '', blogs: 0 }

  const mostBlog = _.reduce(blogsGroupedByAuthor, (result, value, key) => {
    return value.length > result.blogs
      ? { author: key, blogs: value.length }
      : result
  }, initBlog)

  return mostBlog
}

const mostLikes = (blogs) => {
  const blogsGroupedByAuthor = _.groupBy(blogs, 'author')
  const initBlog = { author: '', likes: 0 }

  const mostLikes = _.reduce(blogsGroupedByAuthor, (result, blogsByAuthor, key) => {
    const likes = _.sumBy(blogsByAuthor, b => b.likes)
    return likes > result.likes
      ? { author: key, likes: likes }
      : result
  }, initBlog)

  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}