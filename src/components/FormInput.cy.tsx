import React from 'react'
import FormInput from './FormInput'

describe('<FormInput />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FormInput />)
  })
})