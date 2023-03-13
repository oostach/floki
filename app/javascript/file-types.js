const pngIconPath = function() {
  const path = document.querySelector('body').dataset.iconPath
  return JSON.parse(path)
}

const fileExt = function(file) {
  return file.name.split('.').pop()
}

export const pngImageIcon = function(file, width = 16) {
  const ext = fileExt(file)
  const img = new Image()

  img.src = pngIconPath()[ext]
  img.width = width
  return img
}

export const pngCssIcon = function(file) {
  const ext = fileExt(file)
  const icon = document.createElement('i')

  icon.classList.add('icon-image')
  icon.classList.add(`bg-icon-${ext}`)
  return icon
}

// export { pngImageIcon, pngCssIcon }
