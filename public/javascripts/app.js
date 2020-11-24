/* eslint-env browser */

(function main() {
  const form = document.querySelector('#input form');

  async function postData(target = 'codes', value = '') {
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target,
        value,
      }),
    });
    return response.json();
  }

  function write(obj = {}) {
    let output = '';
    const products = obj.Product || {};
    if (obj.Errors.length >= 1) {
      document.getElementById('display').innerHTML = '<div>Whoopsie!</div>';
      return;
    }
    Object.keys(products).forEach((key) => {
      if (key !== 'SupplierInfo') {
        output += `<div><span class="key">${key} : \
          </span><span>${products[key]}</span></div>`;
      }
    });
    document.getElementById('display').innerHTML = output;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const sku = document.getElementById('sku').value;
    const code = document.getElementById('code').value;
    const target = sku.length > 4 ? 'ProductSKU' : 'ProductCode';
    const value = target === 'ProductSKU' ? sku : code;
    postData(target, value)
      .then((response) => write(response))
      .catch(() => write({ Errors: ['', '', '', ''] }));
  });
}());
