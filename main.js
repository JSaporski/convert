// Cotação de moedas do dia.
const USD = 5.76
const EUR = 5.98
const GBP = 7.17
const KRW = 0.004

// Obtendo os elementos.
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const currency = document.getElementById('currency')
const currencyDescription = document.querySelector('#description')
const currencyResult = document.querySelector('#result')
const footer = document.querySelector('main footer')

// Manipulando o input amount para receber somente números.
amount.addEventListener('input', () => {
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, '')
})

// Formata a moeda em Real Brasileiro (BRL).
function formatCurrencyBRL(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 3
  })
}

// Função para converter a moeda.
function convertCurrency(amount, price, symbol) {
  try {
    // Calcula o total.
    let total = amount * price

    // Formatar o valor total.
    total = formatCurrencyBRL(total).replace('R$', '')

    currencyDescription.innerText = `${symbol} 1 = ${formatCurrencyBRL(price)}`
    currencyResult.innerText = `${total} Reais`

    // Aplica a classe que exibe o footer para mostrar o resultado.
    footer.classList.add('show-result')
  } catch (error) {
    // Remove a classe do footer ocultado o mesmo.
    footer.classList.remove('show-result')

    console.log(error)
    alert('Não foi possível converter. Tente novamente mais tarde.')
  }
}

// Capturando o evento de submit (enviar) do formulário.
form.addEventListener('submit', event => {
  event.preventDefault()
  const selectedCurrency = currency.value

  switch (selectedCurrency) {
    case 'USD':
      convertCurrency(amount.value, USD, 'US$')
      break
    case 'EUR':
      convertCurrency(amount.value, EUR, '€')
      break
    case 'GBP':
      convertCurrency(amount.value, GBP, '£')
      break
    case 'KRW':
      convertCurrency(amount.value, KRW, '₩')
  }
})
