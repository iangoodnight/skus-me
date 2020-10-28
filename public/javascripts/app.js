(function main() {
	var form = document.querySelector('#input form');
	form.addEventListener('submit', function(e) {
		e.preventDefault();
		var sku = document.getElementById('sku').value;
		var code = document.getElementById('code').value;
		var target = sku.length > 4 ? 'ProductSKU' : 'ProductCode';
		var value = target == 'ProductSKU' ? sku : code;
		postData(target, value)
			.then(response => write(response)) 
			.catch(error => write({ Errors: [,,,] }));
	});

	async function postData(target = 'codes', value = '') {
		const response = await fetch('/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				target: target,
				value: value
			})
		});
		return response.json();
	}

	function write(obj = {}) {
		var output = '';
		if (obj.Errors.length >= 1) {
			document.getElementById('display').innerHTML = '<div>Whoopsie!</div>';
			return;
		}
		for (const [key, value] of Object.entries(obj.Product)) {
			if (key == "SupplierInfo") continue;
			output += `<div><span class="key">${key} : </span><span>${value}</span></div>`;
		}
		document.getElementById('display').innerHTML = output;
	}
})();