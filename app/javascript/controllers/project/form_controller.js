import { Controller } from '@hotwired/stimulus'
import { Octokit } from 'octokit'
import { wrapWithError } from '../../lib/error-wrapper'

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
      wrapWithError(urlField, 'Invalid repository url')
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
      wrapWithError(urlField, 'Repository Not Found')
    } finally {
      label.removeChild(loader)
    }
  }
}
