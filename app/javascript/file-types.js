const pngIconPath = function() {
  const path = document.querySelector('body').dataset.iconPath
  return JSON.parse(path)
}

const pngIcon = function(file, width = 16) {
  const fileExt = file.name.split('.').pop()
  const img     = new Image()

  img.src = pngIconPath()[fileExt]
  img.width = width
  return img
}

export default pngIcon
