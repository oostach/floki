import { Controller } from '@hotwired/stimulus'
import { Octokit } from 'octokit'

// Connects to data-controller="project--form"
export default class extends Controller {
  static targets = ['repositoryFields', 'repositoryToggle', 'submitButton']
  #repoPattern = /(?<=^https:\/\/github\.com\/)(?<owner>[a-zA-Z-]+)(?:\/)(?<name>[a-zA-Z-]+)$/gm

  connect() {
    this.#toggleRepositoryFields()
  }

  validateRepositories(e) {
    e.preventDefault()
    const urlField = e.target
    const repoParams = this.#repoPattern.exec(urlField.value)

    if (urlField.value.trim() === '') return

    if (repoParams?.groups.owner && repoParams.groups.name) {
      this.#getRepoData(urlField, repoParams.groups.owner, repoParams.groups.name)
    } else {
      const errorBlock = this.#showErrorMessage('Invalid repository url')
      const wrapper = this.#wrapInput(urlField)
      wrapper.appendChild(errorBlock)
    }
  }

  toggleRepository(e) {
    e.preventDefault()

    this.#toggleRepositoryFields()
  }

  #toggleRepositoryFields() {
    this.repositoryToggleTarget.checked ? this.#showRepositoryFields() : this.#hideRepositoryFields()
  }

  #hideRepositoryFields() {
    this.repositoryFieldsTarget.style.display = 'none'
  }

  #showRepositoryFields() {
    this.repositoryFieldsTarget.style.display = 'block'
  }

  #toggleSubmitButton() {
    this.submitButtonTarget.hasAttribute('disabled')
      ? this.submitButtonTarget.removeAttribute('disabled')
      : this.submitButtonTarget.setAttribute('disabled', 'disabled')
  }

  #createLoader() {
    const loader = document.createElement('span')
    loader.classList.add('loader')
    return loader
  }

  async #getRepoData(urlField, owner, repo) {
    const octokit = new Octokit({})
    const label = urlField.previousElementSibling
    const loader = this.#createLoader()
    let repoData = null

    label.appendChild(loader)
    this.#toggleSubmitButton()

    try {
      repoData = await octokit.request(`GET /repos/${owner}/${repo}`)
      this.#toggleSubmitButton()
    } catch (e) {
      const errorBlock = this.#showErrorMessage('Repository Not Found')
      const wrapper = this.#wrapInput(urlField)
      wrapper.appendChild(errorBlock)
    } finally {
      label.removeChild(loader)
    }
  }

  #showErrorMessage(message) {
    const errorContainer = document.createElement('span')
    errorContainer.classList.add('field-errors')
    errorContainer.textContent = message
    return errorContainer
  }

  #wrapInput(el) {
    const wrapper = document.createElement('div')

    wrapper.classList.add('field-with-errors')
    el.parentNode.insertBefore(wrapper, el)
    wrapper.appendChild(el)
    return wrapper
  }
}
