const alphabet = ['a', 'b', 'c', 'd', 'e', 'f']
const numbers = ['1', '2', '3', '4', '5', '6']

// const a = alphabet[0]
// const b = alphabet[1]

const [a, , c, ...rest] = alphabet
console.log(a)
// a
console.log(c)
// c
console.log(rest)
// ['d', 'e', 'f']

const newArray = [...alphabet, ...numbers]
console.log(newArray)
// ['a', 'b', 'c', 'd', 'e', 'f', '1', '2', '3', '4', '5', '6']


//dar
const sumAndMultiply = () => {

}

function sumAndMultiply(a, b) {
	return [a + b, a * b, a / b]
}

const [sum, mult, division = 'No division'] = sumAndMultiply(2, 3)
console.log(sum)
console.log(mult)
console.log(division)

//dob
const personOne = {
	name: 'Peter',
	age: 32,
	address: {
		city: Helsinki,
		country: Finland,
	}
}

const personTwo = {
	name: 'Lu',
	age: 23,
	favFood: Watermelon,
	address: {
		city: Chengdu,
		country: China,
	}
}

const { name: firstName, age, favFood = 'Rice' } = personTwo

console.log(firstName)
console.log(age)
console.log(favFood)

//...rest
const { name: firstName, ...rest } = personTwo

//street undefined
const { name: firstName, address: { street } } = personTwo
//city
const { name: firstName, address: { city } } = personTwo

//overwrite p1 with p2
const personThree = { ...personOne, ...personTwo }

//dob2
function printUser({ name, age }) {
	console.log(`Name is: ${name}. Age is: ${age}`)
}

printUser(personOne)
