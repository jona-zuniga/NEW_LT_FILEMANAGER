import {exampleSchema as schemaExample} from './schema'

import {ERR500, OK200} from '@/constants/responses'

//Querys

//eslint-disable-next-line no-unused-vars
const queries = {
	orace: {
		get: `SELECT * FROM table WHERE id = :id`,
		post: `INSERT INTO table (id, name) VALUES (:id, :name)`,
		put: `UPDATE table SET name = :name WHERE id = :id`,
		delete: `DELETE FROM table WHERE id = :id`,
	},
	mysql: {
		get: `SELECT * FROM table WHERE id = ?`,
		post: `INSERT INTO table (id, name) VALUES (?, ?)`,
		put: `UPDATE table SET name = :name WHERE id = ?`,
		delete: `DELETE FROM table WHERE id = :id`,
	},
	sqlserver: {
		get: `SELECT * FROM table WHERE id = :id`,
		post: `INSERT INTO table (id, name) VALUES (:id, :name)`,
		put: `UPDATE table SET name = :name WHERE id = :id`,
		delete: `DELETE FROM table WHERE id = :id`,
	},
}

let ExampleAnimalsData = [
	{
		code: 'a1b2c3',
		animal: 'cat',
		quantity: 150,
		date: '2020-01-05',
		user: 'user1',
	},
	{
		code: 'd4e5f6',
		animal: 'dog',
		quantity: 180,
		date: '2020-02-10',
		user: 'user2',
	},
	{
		code: 'g7h8i9',
		animal: 'bird',
		quantity: 120,
		date: '2020-03-15',
		user: 'user3',
	},
	{
		code: 'j1k2l3',
		animal: 'fish',
		quantity: 190,
		date: '2020-04-20',
		user: 'user4',
	},
	{
		code: 'm4n5o6',
		animal: 'rabbit',
		quantity: 110,
		date: '2020-05-25',
		user: 'user5',
	},
	{
		code: 'p7q8r9',
		animal: 'turtle',
		quantity: 130,
		date: '2020-06-30',
		user: 'user6',
	},
	{
		code: 's1t2u3',
		animal: 'snake',
		quantity: 170,
		date: '2020-07-05',
		user: 'user7',
	},
	{
		code: 'v4w5x6',
		animal: 'lion',
		quantity: 150,
		date: '2020-08-10',
		user: 'user8',
	},
	{
		code: 'y7z8a9',
		animal: 'tiger',
		quantity: 180,
		date: '2020-09-15',
		user: 'user9',
	},
	{
		code: 'b1c2d3',
		animal: 'elephant',
		quantity: 120,
		date: '2020-10-20',
		user: 'user10',
	},
	{
		code: 'e4f5g6',
		animal: 'monkey',
		quantity: 190,
		date: '2020-11-25',
		user: 'user11',
	},
	{
		code: 'h7i8j9',
		animal: 'giraffe',
		quantity: 110,
		date: '2020-12-30',
		user: 'user12',
	},
	{
		code: 'k1l2m3',
		animal: 'zebra',
		quantity: 130,
		date: '2021-01-05',
		user: 'user13',
	},
	{
		code: 'n4o5p6',
		animal: 'penguin',
		quantity: 170,
		date: '2021-02-10',
		user: 'user14',
	},
	{
		code: 'q7r8s9',
		animal: 'koala',
		quantity: 150,
		date: '2021-03-15',
		user: 'user15',
	},
	{
		code: 't1u2v3',
		animal: 'dolphin',
		quantity: 180,
		date: '2021-04-20',
		user: 'user16',
	},
	{
		code: 'w4x5y6',
		animal: 'shark',
		quantity: 120,
		date: '2021-05-25',
		user: 'user17',
	},
	{
		code: 'z7a8b9',
		animal: 'horse',
		quantity: 190,
		date: '2021-06-30',
		user: 'user18',
	},
	{
		code: 'c1d2e3',
		animal: 'cow',
		quantity: 110,
		date: '2021-07-05',
		user: 'user19',
	},
	{
		code: 'f4g5h6',
		animal: 'sheep',
		quantity: 130,
		date: '2021-08-10',
		user: 'user20',
	},
	{
		code: 'i7j8k9',
		animal: 'goat',
		quantity: 170,
		date: '2021-09-15',
		user: 'user21',
	},
	{
		code: 'l1m2n3',
		animal: 'chicken',
		quantity: 150,
		date: '2021-10-20',
		user: 'user22',
	},
	{
		code: 'o4p5q6',
		animal: 'duck',
		quantity: 180,
		date: '2021-11-25',
		user: 'user23',
	},
	{
		code: 'r7s8t9',
		animal: 'panda',
		quantity: 120,
		date: '2021-12-30',
		user: 'user24',
	},
	{
		code: 'u1v2w3',
		animal: 'bear',
		quantity: 190,
		date: '2022-01-05',
		user: 'user25',
	},
	{
		code: 'x4y5z6',
		animal: 'fox',
		quantity: 110,
		date: '2022-02-10',
		user: 'user26',
	},
	{
		code: 'a7b8c9',
		animal: 'wolf',
		quantity: 130,
		date: '2022-03-15',
		user: 'user27',
	},
	{
		code: 'd1e2f3',
		animal: 'deer',
		quantity: 170,
		date: '2022-04-20',
		user: 'user28',
	},
	{
		code: 'g4h5i6',
		animal: 'squirrel',
		quantity: 150,
		date: '2022-05-25',
		user: 'user29',
	},
	{
		code: 'j7k8l9',
		animal: 'raccoon',
		quantity: 180,
		date: '2022-06-30',
		user: 'user30',
	},
]

//Requests

/**
 * @param {*} req NextRequest object
 * @param {*} params contains the dynamic route parameters
 * @returns
 */
//eslint-disable-next-line no-unused-vars
export async function GET(req, {params}) {
	try {
		return Response.json(ExampleAnimalsData, {
			...OK200,
		})
	} catch (error) {
		return Response.json(error.message, ERR500)
	}
}

/**
 * @param {*} req NextRequest object
 * @param {*} params contains the dynamic route parameters
 * @returns
 */
//eslint-disable-next-line no-unused-vars
export async function POST(req, {params}) {
	try {
		const {code, animal, quantity, date, user} = schemaExample.parse(await req.json())

		ExampleAnimalsData.push({code, animal, quantity, date, user})

		return Response.json('ok', OK200)
	} catch (error) {
		return Response.json(error.message, ERR500)
	}
}
