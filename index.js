const axios = require('axios')
const inquirer = require('inquirer')

const basicInputValidation = value => {
  if (value === '') return 'cant be blank'

  return true
}

const buildSearchParams = values =>
  Object.keys(values).reduce(
    (accumulator, key, currentIndex) => (currentIndex === 0 ? values[key] : `${accumulator}+${values[key]}`),
    '',
  )

inquirer
  .prompt([
    {
      type: 'input',
      name: 'brand',
      message: 'Laptop brand?',
      validate: basicInputValidation,
    },
    {
      type: 'input',
      name: 'model',
      message: 'Laptop model?',
      validate: basicInputValidation,
    },
  ])
  .then(answers =>
    axios
      .get(`http://api.duckduckgo.com/?q=${buildSearchParams(answers)}&format=json`)
      .then(response =>
        console.log(response.data.AbstractURL === '' ? 'Sorry nothing was found' : response.data.AbstractURL),
      ),
  )
