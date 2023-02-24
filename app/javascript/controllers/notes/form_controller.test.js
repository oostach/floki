'use strict'

/**
 * @jest-environment jsdom
 */

import { Application as StimulusApp } from '@hotwired/stimulus'
import FormController from './form_controller'

describe('FormController', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="notes-form" data-controller="notes--form">
        <form action="/notes" accept-charset="UTF-8" method="post">
          <input type="hidden" name="authenticity_token"
            value="GlBfPm4l44y6ck0k3N6nLKt-mlUH929IVf6ilTTSp6Q-e9x2KKREd4jnm5wbpYMb7K_dRfC5d6IGMOSz7tfYMQ" autocomplete="off">
          <div class="form-group mb-2">
            <label for="note_title">Title</label>
            <input class="form-input px-2 py-1 rounded w-full" type="text" name="note[title]" id="note_title">
          </div>
          <div class="form-group mb-2">
            <label for="note_body">Content</label>
            <input type="hidden" name="note[body]" id="note_body_trix_input_note" autocomplete="off">
          </div>
          <div class="form-group">
            <input type="submit" name="commit" value="Create Note" class="button-primary" data-disable-with="Create Note">
            <a class="button-secondary button-cancel" data-action="click->notes--form#cancel" href="#">Cancel</a>
          </div>
        </form>
        <hr class="my-3 -mx-4 border-gray-300">
      </div>
    `
    StimulusApp.start().register('notes--form', FormController)
  })

  test('it should remove form on click cancel', () => {
    const form = document.querySelector('.notes-form')
    const cancelButton = form.querySelector('.button-cancel')
    cancelButton.click()

    expect(document.body.innerHTML.trim()).toEqual('')
  })
})
