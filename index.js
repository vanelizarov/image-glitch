const canvas = document.querySelector('canvas')
const slider = document.querySelector('input')

const context = canvas.getContext('2d')

const image = new Image()
image.addEventListener('load', render)
image.crossOrigin = 'anonymous'
image.src = 'buddha.jpg'

let amount = 0

function sortPixels(pixels) {

  function getMedium(r, g, b) {
    return 0.299 * r + 0.587 * g + 0.114 * b
  }

  for (let i = 0; i < pixels.length; i += 4) {
    for (let j = 0; j < pixels.length; j += 4) {
      const pixelA = [pixels[i], pixels[i + 1], pixels[i + 2]]
      const pixelB = [pixels[j], pixels[j + 1], pixels[j + 2]]
      if (getMedium(...pixelA) > getMedium(...pixelB)) {
        pixels.splice(i, 3, ...pixelB)
        pixels.splice(j, 3, ...pixelA)
      }
    }
  }
}

function update() {
  context.drawImage(image, 0, 0, canvas.width, canvas.height)
  const { data, width, height } = context.getImageData(0, 0, canvas.width, canvas.height)
  const glitched = [...data]
  const bias = width * 4

  for (let y = 0; y < height; ++y) {
    let choice = []
    let start
    let offset = 0

    for (let x = y * bias + offset; x < y * bias + bias; x += 4) {
      const r = data[x]
      const g = data[x + 1]
      const b = data[x + 2]
      // if (r !== 0 && g !== 0 && b !== 0) {

      const amt = Math.sin(amount) * slider.value

      if (r < amt && g < amt && b < amt) {
        if (!start) {
          start = x
        }
        choice.push(r, g, b, data[x + 3])
      } else {
        sortPixels(choice)
        glitched.splice(start, choice.length, ...choice)
        offset = start + choice.length
        start = undefined
        choice = []
      }
    }
  }

  const glitchedData = Uint8ClampedArray.from(glitched)
  context.putImageData(new ImageData(glitchedData, width, height), 0, 0)

  amount += Math.random() / 2
}

function render() {
  update()
  window.requestAnimationFrame(render)
}