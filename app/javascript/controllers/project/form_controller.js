import { Controller } from '@hotwired/stimulus'
import { Octokit } from '@octokit/core'
import { wrapWithError, clearErrors } from '../../lib/error-wrapper'

// Connects to data-controller="project--form"
export default class extends Controller {
  static targets = ['repositoryFields', 'repositoryToggle', 'submitButton', 'repoName']

  #repoPattern = /(?<=^https:\/\/github\.com\/)(?<owner>[a-zA-Z-]+)(?:\/)(?<name>[a-zA-Z-]+)$/gm
  #previousRepoUrl = null

  connect() {
    this.#toggleRepositoryFields()
  }

  validateRepositories(e) {
    e.preventDefault()
    const urlField = e.target
    const fieldValue = urlField.value.trim()

    if (fieldValue === '' || fieldValue === this.#previousRepoUrl) return

    this.#previousRepoUrl = fieldValue
    const repoParams = fieldValue.matchAll(this.#repoPattern).next().value
    if (repoParams?.groups.owner && repoParams.groups.name) {
      this.#getRepoData(urlField, repoParams.groups.owner, repoParams.groups.name)
    } else {
      wrapWithError(urlField, 'Invalid repository url')
    }
  }

  clearErrors(e) {
    e.preventDefault()

    clearErrors(e.target)
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

  #toggleSubmitButton(force = false) {
    this.submitButtonTarget.hasAttribute('disabled') || force
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
    const label = urlField.closest('.form-group').querySelector('label')
    const loader = this.#createLoader()
    let repoData = null

    label.appendChild(loader)
    this.#toggleSubmitButton()
    this.repoNameTarget.value = ''

    try {
      repoData = await octokit.request(`GET /repos/${owner}/${repo}`)
      this.repoNameTarget.value = repoData.data.name
      this.#toggleSubmitButton(true)
    } catch (e) {
      wrapWithError(urlField, 'Repository Not Found')
    } finally {
      label.removeChild(loader)
    }
  }
}
