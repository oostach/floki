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
    const urlLabel = urlField.previousElementSibling
    const repoParams = this.#repoPattern.exec(urlField.value)

    if (repoParams?.groups.owner && repoParams.groups.name) {
      this.#getRepoData(urlLabel, repoParams.groups.owner, repoParams.groups.name)
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

  async #getRepoData(label, owner, repo) {
    const octokit = new Octokit({})
    const loader = this.#createLoader()

    label.appendChild(loader)
    this.#toggleSubmitButton()

    const repoData = await octokit.request(`GET /repos/${owner}/${repo}`)

    label.removeChild(loader)
    this.#toggleSubmitButton()
  }
}
