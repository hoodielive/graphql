const message = 'Some Message from myModule.js'
const name = 'Larry'
const location = 'Philly'

const getGreeting = (name) => {
  return `Welcome to GraphQL ${name}`
}

export { message, name, getGreeting, location as default }