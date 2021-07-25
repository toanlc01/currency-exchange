document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('form').onsubmit = () => {
        const converting_currency = document.querySelector('#converting_currency').value.toUpperCase();
        const base_currency = document.querySelector('#base_currency').value.toUpperCase();
        convert(converting_currency, base_currency);
        return false;
    }
})

function convert(converting_currency, base_currency) {
    fetch('http://api.exchangeratesapi.io/v1/latest?access_key=fe24b7b5f370c1f5c71d2371401c272a')
    .then(response => response.json())
    .then(data => {
        base = data.rates[base_currency];
        converting = data.rates[converting_currency];
        const rate = (converting/base).toFixed(6);
        if (base === undefined || converting === undefined) {
            document.querySelector('p').innerHTML = "Invalid Currency."
            return false;
        }

        document.querySelector('p').innerHTML = `1 ${base_currency} is equal to ${rate} ${converting_currency}`;
        clear_input('#converting_currency');
        clear_input('#base_currency')
    })
}

function clear_input(input_id) {
    document.querySelector(input_id).value = '';
}

