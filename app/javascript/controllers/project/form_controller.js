import { Controller } from '@hotwired/stimulus'

// Connects to data-controller="project--form"
export default class extends Controller {
  static targets = ['repositoryFields', 'repositoryToggle']

  connect() {
    this.#toggleRepositoryFields()
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
}
