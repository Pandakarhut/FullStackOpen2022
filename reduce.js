// higher-order functions

var orders = [
	{ amount: 100 },
	{ amount: 200 },
	{ amount: 150 },
	{ amount: 400 },
]

var totalAmount = orders.reduce((sum, order) => sum + order.amount, 0)

console.log(totalAmount)