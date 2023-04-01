import { Controller } from '@hotwired/stimulus'
import { Octokit } from 'octokit'

// Connects to data-controller="project--form"
export default class extends Controller {
  static targets = ['repositoryFields', 'repositoryToggle', 'submitButton']

  connect() {
    this.#toggleRepositoryFields()
  }

  validateRepositories(e) {
    e.preventDefault()
    const urlField = e.target
    const urlLabel = urlField.previousElementSibling

    this.#getRepoData(urlLabel)
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

  #addLoader() {
    const loader = document.createElement('span')
    loader.classList.add('loader')
    return loader
  }

  async #getRepoData(urlLabel) {
    const octokit = new Octokit({})
    const loader = this.#addLoader()

    urlLabel.appendChild(loader)
    this.#toggleSubmitButton()

    const repoData = await octokit.request('GET /repos/oostach/floki')

    urlLabel.removeChild(loader)
    this.#toggleSubmitButton()
  }
}
