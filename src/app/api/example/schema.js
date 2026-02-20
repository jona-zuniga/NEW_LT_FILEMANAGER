import {z} from 'zod'

import {zDate} from '@/helpers/utils/zod'

export const exampleSchema = z.object({
	code: z
		.string({
			required_error: 'code_is_required',
			invalid_type_error: 'code_must_be_a_string',
		})
		.min(1, {
			error: 'code_is_required',
		}),
	animal: z.enum(['cat', 'dog', 'bird', 'fish', 'squirrel', 'raccoon'], {
		errorMap: () => ({error: 'invalid_animal'}),
	}),
	quantity: z.coerce
		.number({
			required_error: 'quantity_is_required',
			invalid_type_error: 'quantity_must_be_a_number',
		})
		.int({
			error: 'quantity_must_be_number',
		})
		.positive({
			error: 'quantity_must_be_positive',
		}),
	date: zDate(),
	user: z.object(
		{
			id: z.number({
				required_error: 'user_id_is_required',
				invalid_type_error: 'user_id_must_be_a_number',
			}),
			name: z.enum(
				[
					'user1',
					'user2',
					'user3',
					'user4',
					'user5',
					'user6',
					'user7',
					'user8',
					'user9',
					'user10',
					'user11',
					'user12',
					'user13',
					'user14',
					'user15',
					'user16',
					'user17',
					'user18',
				],
				{
					errorMap: () => ({error: 'invalid_user'}),
				},
			),
		},
		{
			required_error: 'user_is_required',
			invalid_type_error: 'user_is_required',
		},
	),
})

export const defExampleSchema = {
	code: '',
	animal: '',
	quantity: 0,
	date: new Date(),
	user: '',
}
