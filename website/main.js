import data from './data.js'

window.onload = () => {
  new App(data)
  const goTopButton = document.querySelector('.go-top-button')
  window.onscroll = () => {
    const scrollHeight = window.pageYOffset
    if (scrollHeight >= 456) {
      goTopButton.classList.add('visible')
    } else if (scrollHeight < 456) {
      goTopButton.classList.remove('visible')
    }
    var d = document.documentElement
    var offset = d.scrollTop + window.innerHeight
    var height = d.offsetHeight
    if (offset >= height - 100) {
      goTopButton.classList.remove('visible')
    }
  }
}

class App {
  constructor(data) {
    this.data = data
    this.letters = data.map((el) => el.letter)
    this.addLettersToLetterList()
    this.generateBlogLists()
  }
  addLettersToLetterList() {
    const letterListElement = document.querySelector('.header .letter-list')
    const createLetterButton = (letter) => {
      const letterButton = document.createElement('button')
      letterButton.onclick = () => {
        document.getElementById(letter).scrollIntoView({ behavior: 'smooth' })
      }
      letterButton.innerText = letter.toUpperCase()
      letterListElement.appendChild(letterButton)
    }
    this.letters.forEach((letter) => {
      createLetterButton(letter)
    })
  }
  generateBlogLists() {
    const blogsBodyElement = document.querySelector('.body')
    const addBlogsByLetter = (data) => {
      const blogListElement = document.createElement('div')
      blogListElement.id = data.letter
      blogListElement.classList.add('list')
      const blogListLetterElement = document.createElement('span')
      blogListLetterElement.classList.add('letter')
      blogListLetterElement.innerText = data.letter.toUpperCase()
      blogListElement.appendChild(blogListLetterElement)
      const ulElement = document.createElement('ul')
      data.blogs.forEach((blog) => {
        const liElement = document.createElement('li')
        liElement.innerHTML = `${blog.name} - <a target="_blank" href="${
          blog.link
        }">${blog.link.split('//')[1]}</a>`
        ulElement.appendChild(liElement)
      })
      blogListElement.appendChild(ulElement)
      blogsBodyElement.appendChild(blogListElement)
    }
    this.data.forEach((item) => {
      addBlogsByLetter(item)
    })
  }
}
